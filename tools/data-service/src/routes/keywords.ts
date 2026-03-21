import { Hono } from "hono";
import type { Env, FilterRule } from "../types";
import { parseKeywordRow, toJsonString } from "../lib/helpers";
import { buildCountQuery } from "../lib/filter";

const keywords = new Hono<{ Bindings: Env }>();

// GET /api/keywords — 列表查询
keywords.get("/", async (c) => {
  const limit = Math.min(Number(c.req.query("limit") ?? 50), 500);
  const offset = Number(c.req.query("offset") ?? 0);
  const status = c.req.query("status");
  const strategy = c.req.query("strategy");
  const priority = c.req.query("priority");

  const conditions: string[] = [];
  const params: unknown[] = [];

  if (status) {
    conditions.push("status = ?");
    params.push(status);
  }
  if (strategy) {
    conditions.push("strategy = ?");
    params.push(strategy);
  }
  if (priority) {
    conditions.push("priority = ?");
    params.push(Number(priority));
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  params.push(limit, offset);

  const [countResult, dataResult] = await c.env.DB.batch([
    c.env.DB.prepare(`SELECT COUNT(*) AS total FROM keywords ${where}`).bind(
      ...params.slice(0, -2)
    ),
    c.env.DB.prepare(
      `SELECT * FROM keywords ${where} ORDER BY priority ASC, search_volume DESC LIMIT ? OFFSET ?`
    ).bind(...params),
  ]);

  const total = (countResult.results[0] as { total: number }).total;
  const data = dataResult.results.map((r) =>
    parseKeywordRow(r as Record<string, unknown>)
  );

  return c.json({ data, total, limit, offset });
});

// GET /api/keywords/:id
keywords.get("/:id", async (c) => {
  const id = c.req.param("id");
  const result = await c.env.DB.prepare("SELECT * FROM keywords WHERE id = ?")
    .bind(id)
    .first();

  if (!result) return c.json({ error: "Not found" }, 404);
  return c.json({ data: parseKeywordRow(result as Record<string, unknown>) });
});

// POST /api/keywords — 新增（单条或批量）
keywords.post("/", async (c) => {
  const body = await c.req.json<Record<string, unknown> | { items: Record<string, unknown>[] }>();
  const items = "items" in body ? (body.items as Record<string, unknown>[]) : [body];

  const stmt = c.env.DB.prepare(
    `INSERT INTO keywords (
      id, keyword, search_volume, search_volume_total, kd, cpc, intent,
      strategy, path, priority, status,
      keyword_aliases, tags_hint, dimensions, seo, seo_guidance,
      filter_rule, quiz, related_keywords,
      page_template_type, relevance_score, source
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?
    )`
  );

  const jsonFields = new Set([
    "keyword_aliases", "tags_hint", "seo", "filter_rule",
    "quiz", "related_keywords",
  ]);

  const batch = items.map((item) => {
    return stmt.bind(
      item.id as string,
      item.keyword as string,
      (item.search_volume as number) ?? null,
      (item.search_volume_total as number) ?? null,
      (item.kd as number) ?? null,
      (item.cpc as number) ?? null,
      (item.intent as string) ?? null,
      (item.strategy as string) ?? null,
      (item.path as string) ?? null,
      (item.priority as number) ?? 5,
      (item.status as string) ?? "draft",
      toJsonString(item.keyword_aliases ?? []),
      item.tags_hint ? toJsonString(item.tags_hint) : null,
      (item.dimensions as string) ?? null,
      item.seo ? toJsonString(item.seo) : null,
      (item.seo_guidance as string) ?? null,
      item.filter_rule ? toJsonString(item.filter_rule) : null,
      item.quiz ? toJsonString(item.quiz) : null,
      toJsonString(item.related_keywords ?? []),
      (item.page_template_type as string) ?? null,
      (item.relevance_score as number) ?? null,
      (item.source as string) ?? null
    );
  });

  const results = await c.env.DB.batch(batch);
  return c.json({ success: true, count: results.length });
});

// PUT /api/keywords/:id — 更新
keywords.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json<Record<string, unknown>>();

  const jsonFields = new Set([
    "keyword_aliases", "tags_hint", "seo", "filter_rule",
    "quiz", "related_keywords",
  ]);

  const fields: string[] = [];
  const params: unknown[] = [];

  for (const [key, value] of Object.entries(body)) {
    if (key === "id") continue;
    fields.push(`${key} = ?`);
    params.push(jsonFields.has(key) ? toJsonString(value) : value);
  }

  if (fields.length === 0) {
    return c.json({ error: "No fields to update" }, 400);
  }

  params.push(id);
  const result = await c.env.DB.prepare(
    `UPDATE keywords SET ${fields.join(", ")} WHERE id = ?`
  )
    .bind(...params)
    .run();

  return c.json({ success: result.success, changes: result.meta.changes });
});

// DELETE /api/keywords/:id
keywords.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const result = await c.env.DB.prepare("DELETE FROM keywords WHERE id = ?")
    .bind(id)
    .run();

  return c.json({ success: result.success, deleted: result.meta.changes });
});

// POST /api/keywords/coverage — 批量覆盖率检查
keywords.post("/coverage", async (c) => {
  const body = await c.req.json<{ keyword_ids?: string[] }>();

  let kwQuery = "SELECT id, keyword, filter_rule, strategy FROM keywords WHERE filter_rule IS NOT NULL";
  const kwParams: unknown[] = [];

  if (body.keyword_ids && body.keyword_ids.length > 0) {
    const placeholders = body.keyword_ids.map(() => "?").join(", ");
    kwQuery += ` AND id IN (${placeholders})`;
    kwParams.push(...body.keyword_ids);
  }

  const kwResult = await c.env.DB.prepare(kwQuery).bind(...kwParams).all();
  const results: {
    id: string;
    keyword: string;
    match_count: number;
    strategy: string | null;
    recommendation: string;
  }[] = [];

  for (const kw of kwResult.results) {
    const row = kw as Record<string, unknown>;
    let filterRule: FilterRule;

    try {
      filterRule =
        typeof row.filter_rule === "string"
          ? JSON.parse(row.filter_rule)
          : row.filter_rule as FilterRule;
    } catch {
      results.push({
        id: row.id as string,
        keyword: row.keyword as string,
        match_count: 0,
        strategy: row.strategy as string | null,
        recommendation: "error: invalid filter_rule JSON",
      });
      continue;
    }

    if (!filterRule?.must) {
      results.push({
        id: row.id as string,
        keyword: row.keyword as string,
        match_count: 0,
        strategy: row.strategy as string | null,
        recommendation: "error: filter_rule.must is missing",
      });
      continue;
    }

    const countQuery = buildCountQuery(filterRule);
    const countResult = await c.env.DB.prepare(countQuery.sql)
      .bind(...countQuery.params)
      .first<{ match_count: number }>();

    const count = countResult?.match_count ?? 0;
    let recommendation: string;

    if (count >= 50) {
      recommendation = "ok: category_page";
    } else if (count >= 20) {
      recommendation = "warning: thin_risk, consider expanding filter or adding data";
    } else if (count >= 5) {
      recommendation = "downgrade: suggest blog_post instead";
    } else {
      recommendation = "block: needs_data, do not publish";
    }

    results.push({
      id: row.id as string,
      keyword: row.keyword as string,
      match_count: count,
      strategy: row.strategy as string | null,
      recommendation,
    });
  }

  return c.json({ data: results, total: results.length });
});

export default keywords;
