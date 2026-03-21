import { Hono } from "hono";
import type { Env, NameInput, FilterRule } from "../types";
import { parseNameRow, generateId, toJsonString } from "../lib/helpers";
import { buildFilterQuery } from "../lib/filter";

const names = new Hono<{ Bindings: Env }>();

// GET /api/names — 列表查询（支持分页 & 基础过滤）
names.get("/", async (c) => {
  const limit = Math.min(Number(c.req.query("limit") ?? 50), 500);
  const offset = Number(c.req.query("offset") ?? 0);
  const status = c.req.query("status");
  const gender = c.req.query("gender");
  const namePart = c.req.query("name_part");

  const conditions: string[] = [];
  const params: unknown[] = [];

  if (status) {
    conditions.push("status = ?");
    params.push(status);
  }
  if (gender) {
    conditions.push("gender = ?");
    params.push(gender);
  }
  if (namePart) {
    conditions.push("name_part = ?");
    params.push(namePart);
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  params.push(limit, offset);

  const [countResult, dataResult] = await c.env.DB.batch([
    c.env.DB.prepare(`SELECT COUNT(*) AS total FROM names ${where}`).bind(
      ...params.slice(0, -2)
    ),
    c.env.DB.prepare(
      `SELECT * FROM names ${where} ORDER BY updated_at DESC LIMIT ? OFFSET ?`
    ).bind(...params),
  ]);

  const total = (countResult.results[0] as { total: number }).total;
  const data = dataResult.results.map((r) =>
    parseNameRow(r as Record<string, unknown>)
  );

  return c.json({ data, total, limit, offset });
});

// GET /api/names/:id — 单条查询
names.get("/:id", async (c) => {
  const id = c.req.param("id");
  const result = await c.env.DB.prepare("SELECT * FROM names WHERE id = ?")
    .bind(id)
    .first();

  if (!result) return c.json({ error: "Not found" }, 404);
  return c.json({ data: parseNameRow(result as Record<string, unknown>) });
});

// POST /api/names — 新增（单条或批量）
names.post("/", async (c) => {
  const body = await c.req.json<NameInput | { items: NameInput[] }>();

  const items = "items" in body ? body.items : [body];
  const stmt = c.env.DB.prepare(
    `INSERT INTO names (
      id, romaji, kanji, reading, gender, name_part, syllable_count,
      script, era, popularity, origin_region,
      use_case, vibe, element, kanji_meaning_tags,
      meaning_en, meaning_zh, description_en, description_zh,
      famous_bearers, related_names, reading_romaji_variants,
      estimated_population, status, source
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?
    )`
  );

  const batch = items.map((item) => {
    const prefix = item.name_part === "family_name" ? "fn" : "gn";
    const id = item.id ?? generateId(prefix, item.romaji);
    return stmt.bind(
      id,
      item.romaji,
      item.kanji,
      item.reading,
      item.gender,
      item.name_part,
      item.syllable_count,
      toJsonString(item.script ?? []),
      item.era ?? null,
      item.popularity ?? null,
      item.origin_region ?? "japan_native",
      toJsonString(item.use_case ?? []),
      toJsonString(item.vibe ?? []),
      toJsonString(item.element ?? []),
      toJsonString(item.kanji_meaning_tags ?? []),
      item.meaning_en ?? null,
      item.meaning_zh ?? null,
      item.description_en ?? null,
      item.description_zh ?? null,
      toJsonString(item.famous_bearers ?? []),
      toJsonString(item.related_names ?? []),
      toJsonString(item.reading_romaji_variants ?? []),
      item.estimated_population ?? null,
      item.status ?? "raw",
      item.source ?? null
    );
  });

  const results = await c.env.DB.batch(batch);
  return c.json({
    success: true,
    count: results.length,
    ids: items.map((item) => {
      const prefix = item.name_part === "family_name" ? "fn" : "gn";
      return item.id ?? generateId(prefix, item.romaji);
    }),
  });
});

// PUT /api/names/:id — 更新
names.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json<Partial<NameInput>>();

  const fields: string[] = [];
  const params: unknown[] = [];

  const jsonFields = new Set([
    "script", "use_case", "vibe", "element", "kanji_meaning_tags",
    "famous_bearers", "related_names", "reading_romaji_variants",
  ]);

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
    `UPDATE names SET ${fields.join(", ")} WHERE id = ?`
  )
    .bind(...params)
    .run();

  return c.json({ success: result.success, changes: result.meta.changes });
});

// DELETE /api/names/:id — 删除
names.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const result = await c.env.DB.prepare("DELETE FROM names WHERE id = ?")
    .bind(id)
    .run();

  return c.json({ success: result.success, deleted: result.meta.changes });
});

// POST /api/names/query — filter_rule DSL 查询
names.post("/query", async (c) => {
  const body = await c.req.json<{
    filter_rule: FilterRule;
    limit?: number;
    offset?: number;
  }>();

  const limit = Math.min(body.limit ?? 200, 500);
  const offset = body.offset ?? 0;

  const { sql, params } = buildFilterQuery(body.filter_rule, limit, offset);
  const result = await c.env.DB.prepare(sql).bind(...params).all();

  const data = result.results.map((r) =>
    parseNameRow(r as Record<string, unknown>)
  );

  return c.json({ data, count: data.length, limit, offset });
});

// GET /api/names/stats/summary — 统计总览
names.get("/stats/summary", async (c) => {
  const results = await c.env.DB.batch([
    c.env.DB.prepare("SELECT COUNT(*) AS total FROM names"),
    c.env.DB.prepare(
      "SELECT status, COUNT(*) AS count FROM names GROUP BY status"
    ),
    c.env.DB.prepare(
      "SELECT gender, COUNT(*) AS count FROM names GROUP BY gender"
    ),
    c.env.DB.prepare(
      "SELECT name_part, COUNT(*) AS count FROM names GROUP BY name_part"
    ),
  ]);

  return c.json({
    total: (results[0].results[0] as { total: number }).total,
    by_status: results[1].results,
    by_gender: results[2].results,
    by_name_part: results[3].results,
  });
});

export default names;
