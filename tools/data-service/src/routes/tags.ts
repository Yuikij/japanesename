import { Hono } from "hono";
import type { Env } from "../types";

const tags = new Hono<{ Bindings: Env }>();

// GET /api/tags — 查询所有 tag 枚举（按维度分组）
tags.get("/", async (c) => {
  const dimension = c.req.query("dimension");

  let result;
  if (dimension) {
    result = await c.env.DB.prepare(
      "SELECT * FROM tag_dimensions WHERE dimension = ? ORDER BY sort_order"
    )
      .bind(dimension)
      .all();
  } else {
    result = await c.env.DB.prepare(
      "SELECT * FROM tag_dimensions ORDER BY dimension, sort_order"
    ).all();
  }

  // 按维度分组
  const grouped: Record<string, unknown[]> = {};
  for (const row of result.results) {
    const dim = row.dimension as string;
    if (!grouped[dim]) grouped[dim] = [];
    grouped[dim].push(row);
  }

  return c.json({ data: grouped, total: result.results.length });
});

// POST /api/tags — 新增 tag 枚举值
tags.post("/", async (c) => {
  const body = await c.req.json<{
    dimension: string;
    value: string;
    label_en?: string;
    label_zh?: string;
    sort_order?: number;
  }>();

  if (!body.dimension || !body.value) {
    return c.json({ error: "dimension and value are required" }, 400);
  }

  const result = await c.env.DB.prepare(
    `INSERT INTO tag_dimensions (dimension, value, label_en, label_zh, sort_order)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(dimension, value) DO UPDATE SET
       label_en = excluded.label_en,
       label_zh = excluded.label_zh,
       sort_order = excluded.sort_order`
  )
    .bind(
      body.dimension,
      body.value,
      body.label_en ?? null,
      body.label_zh ?? null,
      body.sort_order ?? 0
    )
    .run();

  return c.json({ success: result.success });
});

// POST /api/tags/batch — 批量新增
tags.post("/batch", async (c) => {
  const body = await c.req.json<{
    items: {
      dimension: string;
      value: string;
      label_en?: string;
      label_zh?: string;
      sort_order?: number;
    }[];
  }>();

  const stmt = c.env.DB.prepare(
    `INSERT INTO tag_dimensions (dimension, value, label_en, label_zh, sort_order)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(dimension, value) DO UPDATE SET
       label_en = excluded.label_en,
       label_zh = excluded.label_zh,
       sort_order = excluded.sort_order`
  );

  const batch = body.items.map((item) =>
    stmt.bind(
      item.dimension,
      item.value,
      item.label_en ?? null,
      item.label_zh ?? null,
      item.sort_order ?? 0
    )
  );

  const results = await c.env.DB.batch(batch);
  return c.json({ success: true, count: results.length });
});

// DELETE /api/tags/:dimension/:value — 删除枚举值
tags.delete("/:dimension/:value", async (c) => {
  const { dimension, value } = c.req.param();
  const result = await c.env.DB.prepare(
    "DELETE FROM tag_dimensions WHERE dimension = ? AND value = ?"
  )
    .bind(dimension, value)
    .run();

  return c.json({ success: result.success, deleted: result.meta.changes });
});

export default tags;
