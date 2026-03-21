import type { FilterCondition, FilterRule } from "../types";

const JSON_ARRAY_FIELDS = new Set([
  "script",
  "use_case",
  "vibe",
  "element",
  "kanji_meaning_tags",
]);

const VALID_FIELDS = new Set([
  "gender",
  "name_part",
  "era",
  "popularity",
  "origin_region",
  "syllable_count",
  "estimated_population",
  "romaji",
  "romaji_initial",
  "status",
  ...JSON_ARRAY_FIELDS,
]);

function assertValidField(field: string) {
  if (!VALID_FIELDS.has(field)) {
    throw new Error(`Invalid filter field: ${field}`);
  }
}

/**
 * 将单个 FilterCondition 转为 SQL 片段 + 参数
 */
function conditionToSql(
  c: FilterCondition,
  paramIdx: number
): { sql: string; params: unknown[]; nextIdx: number } {
  assertValidField(c.field);
  const isJson = JSON_ARRAY_FIELDS.has(c.field);

  switch (c.op) {
    case "eq": {
      return {
        sql: `n.${c.field} = ?${paramIdx}`,
        params: [c.value],
        nextIdx: paramIdx + 1,
      };
    }

    case "any_of": {
      const values = Array.isArray(c.value) ? c.value : [c.value];
      if (isJson) {
        const placeholders = values.map((_, i) => `?${paramIdx + i}`).join(", ");
        return {
          sql: `EXISTS (SELECT 1 FROM json_each(n.${c.field}) j WHERE j.value IN (${placeholders}))`,
          params: values,
          nextIdx: paramIdx + values.length,
        };
      }
      const placeholders = values.map((_, i) => `?${paramIdx + i}`).join(", ");
      return {
        sql: `n.${c.field} IN (${placeholders})`,
        params: values,
        nextIdx: paramIdx + values.length,
      };
    }

    case "all_of": {
      const values = Array.isArray(c.value) ? c.value : [c.value];
      const placeholders = values.map((_, i) => `?${paramIdx + i}`).join(", ");
      return {
        sql: `(SELECT COUNT(DISTINCT j.value) FROM json_each(n.${c.field}) j WHERE j.value IN (${placeholders})) = ${values.length}`,
        params: values,
        nextIdx: paramIdx + values.length,
      };
    }

    case "gte":
      return { sql: `n.${c.field} >= ?${paramIdx}`, params: [c.value], nextIdx: paramIdx + 1 };
    case "lte":
      return { sql: `n.${c.field} <= ?${paramIdx}`, params: [c.value], nextIdx: paramIdx + 1 };
    case "gt":
      return { sql: `n.${c.field} > ?${paramIdx}`, params: [c.value], nextIdx: paramIdx + 1 };
    case "lt":
      return { sql: `n.${c.field} < ?${paramIdx}`, params: [c.value], nextIdx: paramIdx + 1 };

    case "starts_with": {
      if (c.field === "romaji" && typeof c.value === "string" && c.value.length === 1) {
        return {
          sql: `n.romaji_initial = ?${paramIdx}`,
          params: [c.value.toUpperCase()],
          nextIdx: paramIdx + 1,
        };
      }
      return {
        sql: `n.${c.field} LIKE ?${paramIdx}`,
        params: [`${c.value}%`],
        nextIdx: paramIdx + 1,
      };
    }

    case "contains": {
      if (isJson) {
        return {
          sql: `EXISTS (SELECT 1 FROM json_each(n.${c.field}) j WHERE j.value = ?${paramIdx})`,
          params: [c.value],
          nextIdx: paramIdx + 1,
        };
      }
      return {
        sql: `n.${c.field} LIKE ?${paramIdx}`,
        params: [`%${c.value}%`],
        nextIdx: paramIdx + 1,
      };
    }

    default:
      throw new Error(`Unknown filter op: ${c.op}`);
  }
}

/**
 * 将 should 条件转为 ORDER BY 排序得分表达式
 */
function shouldToScoreSql(
  conditions: FilterCondition[],
  paramIdx: number
): { scoreExpressions: string[]; params: unknown[]; nextIdx: number } {
  const scoreExpressions: string[] = [];
  const allParams: unknown[] = [];
  let idx = paramIdx;

  for (const c of conditions) {
    assertValidField(c.field);
    const isJson = JSON_ARRAY_FIELDS.has(c.field);

    if (c.op === "any_of") {
      const values = Array.isArray(c.value) ? c.value : [c.value];
      if (isJson) {
        const placeholders = values.map((_, i) => `?${idx + i}`).join(", ");
        scoreExpressions.push(
          `(SELECT COUNT(1) FROM json_each(n.${c.field}) j WHERE j.value IN (${placeholders}))`
        );
      } else {
        const placeholders = values.map((_, i) => `?${idx + i}`).join(", ");
        scoreExpressions.push(
          `CASE WHEN n.${c.field} IN (${placeholders}) THEN 1 ELSE 0 END`
        );
      }
      allParams.push(...values);
      idx += values.length;
    } else if (c.op === "eq") {
      scoreExpressions.push(
        `CASE WHEN n.${c.field} = ?${idx} THEN 1 ELSE 0 END`
      );
      allParams.push(c.value);
      idx += 1;
    }
  }

  return { scoreExpressions, params: allParams, nextIdx: idx };
}

export interface BuildQueryResult {
  sql: string;
  params: unknown[];
}

/**
 * 根据 FilterRule 构建完整的 names 查询 SQL
 */
export function buildFilterQuery(
  rule: FilterRule,
  limit = 200,
  offset = 0
): BuildQueryResult {
  const whereClauses: string[] = [];
  const allParams: unknown[] = [];
  let paramIdx = 1;

  for (const c of rule.must) {
    const result = conditionToSql(c, paramIdx);
    whereClauses.push(result.sql);
    allParams.push(...result.params);
    paramIdx = result.nextIdx;
  }

  const whereStr = whereClauses.length > 0
    ? `WHERE ${whereClauses.join(" AND ")}`
    : "";

  let orderStr = "ORDER BY RANDOM()";

  if (rule.should.length > 0) {
    const scoreResult = shouldToScoreSql(rule.should, paramIdx);
    allParams.push(...scoreResult.params);
    paramIdx = scoreResult.nextIdx;

    if (scoreResult.scoreExpressions.length > 0) {
      const totalScore = scoreResult.scoreExpressions.join(" + ");
      orderStr = `ORDER BY (${totalScore}) DESC, RANDOM()`;
    }
  }

  allParams.push(limit, offset);

  const sql = `SELECT n.* FROM names n ${whereStr} ${orderStr} LIMIT ?${paramIdx} OFFSET ?${paramIdx + 1}`;

  return { sql, params: allParams };
}

/**
 * 根据 FilterRule 构建 COUNT 查询（用于覆盖率检查）
 */
export function buildCountQuery(rule: FilterRule): BuildQueryResult {
  const whereClauses: string[] = [];
  const allParams: unknown[] = [];
  let paramIdx = 1;

  for (const c of rule.must) {
    const result = conditionToSql(c, paramIdx);
    whereClauses.push(result.sql);
    allParams.push(...result.params);
    paramIdx = result.nextIdx;
  }

  const whereStr = whereClauses.length > 0
    ? `WHERE ${whereClauses.join(" AND ")}`
    : "";

  return {
    sql: `SELECT COUNT(*) AS match_count FROM names n ${whereStr}`,
    params: allParams,
  };
}
