import { Hono } from "hono";
import type { Env } from "../types";
import { parseNameRow, parseKeywordRow } from "../lib/helpers";

const exportRoute = new Hono<{ Bindings: Env }>();

// POST /api/export/names — 导出 names 数据
exportRoute.post("/names", async (c) => {
  const body = await c.req.json<{
    status?: string;
    gender?: string;
    name_part?: string;
    limit?: number;
  }>().catch(() => ({} as { status?: string; gender?: string; name_part?: string; limit?: number }));

  const conditions: string[] = [];
  const params: unknown[] = [];

  if (body.status) {
    conditions.push("status = ?");
    params.push(body.status);
  }
  if (body.gender) {
    conditions.push("gender = ?");
    params.push(body.gender);
  }
  if (body.name_part) {
    conditions.push("name_part = ?");
    params.push(body.name_part);
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const limit = body.limit ?? 10000;
  params.push(limit);

  const result = await c.env.DB.prepare(
    `SELECT * FROM names ${where} ORDER BY romaji LIMIT ?`
  )
    .bind(...params)
    .all();

  const data = result.results.map((r) =>
    parseNameRow(r as Record<string, unknown>)
  );

  return c.json({ data, count: data.length, exported_at: new Date().toISOString() });
});

// POST /api/export/keywords — 导出 keywords 数据
exportRoute.post("/keywords", async (c) => {
  const body = await c.req.json<{
    status?: string;
    strategy?: string;
    min_priority?: number;
  }>().catch(() => ({} as { status?: string; strategy?: string; min_priority?: number }));

  const conditions: string[] = [];
  const params: unknown[] = [];

  if (body.status) {
    conditions.push("status = ?");
    params.push(body.status);
  }
  if (body.strategy) {
    conditions.push("strategy = ?");
    params.push(body.strategy);
  }
  if (body.min_priority) {
    conditions.push("priority <= ?");
    params.push(body.min_priority);
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const result = await c.env.DB.prepare(
    `SELECT * FROM keywords ${where} ORDER BY priority ASC, search_volume DESC`
  )
    .bind(...params)
    .all();

  const data = result.results.map((r) =>
    parseKeywordRow(r as Record<string, unknown>)
  );

  return c.json({ data, count: data.length, exported_at: new Date().toISOString() });
});

// POST /api/export/tags — 导出 tag 枚举注册表（给 LLM prompt 用）
exportRoute.post("/tags", async (c) => {
  const result = await c.env.DB.prepare(
    "SELECT * FROM tag_dimensions ORDER BY dimension, sort_order"
  ).all();

  const registry: Record<string, { value: string; label_en: string | null; label_zh: string | null }[]> = {};
  for (const row of result.results) {
    const r = row as Record<string, unknown>;
    const dim = r.dimension as string;
    if (!registry[dim]) registry[dim] = [];
    registry[dim].push({
      value: r.value as string,
      label_en: r.label_en as string | null,
      label_zh: r.label_zh as string | null,
    });
  }

  return c.json({ data: registry, exported_at: new Date().toISOString() });
});

// POST /api/export/all — 全量导出（构建时用）
exportRoute.post("/all", async (c) => {
  const [namesResult, keywordsResult, tagsResult] = await c.env.DB.batch([
    c.env.DB.prepare("SELECT * FROM names WHERE status IN ('reviewed', 'complete') ORDER BY romaji"),
    c.env.DB.prepare("SELECT * FROM keywords WHERE status IN ('quiz_ready', 'published') ORDER BY priority ASC"),
    c.env.DB.prepare("SELECT * FROM tag_dimensions ORDER BY dimension, sort_order"),
  ]);

  const names = namesResult.results.map((r) =>
    parseNameRow(r as Record<string, unknown>)
  );
  const keywords = keywordsResult.results.map((r) =>
    parseKeywordRow(r as Record<string, unknown>)
  );

  const tagRegistry: Record<string, string[]> = {};
  for (const row of tagsResult.results) {
    const r = row as Record<string, unknown>;
    const dim = r.dimension as string;
    if (!tagRegistry[dim]) tagRegistry[dim] = [];
    tagRegistry[dim].push(r.value as string);
  }

  return c.json({
    names,
    keywords,
    tag_registry: tagRegistry,
    exported_at: new Date().toISOString(),
    counts: { names: names.length, keywords: keywords.length },
  });
});

export default exportRoute;
