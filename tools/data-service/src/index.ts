import { Hono } from "hono";
import { cors } from "hono/cors";
import type { Env } from "./types";
import tags from "./routes/tags";
import names from "./routes/names";
import keywords from "./routes/keywords";
import exportRoute from "./routes/export";
import dashboard from "./routes/dashboard";

const app = new Hono<{ Bindings: Env }>();

app.use("*", cors());

// 简易 API Key 鉴权（生产环境替换为更安全的方案）
app.use("/api/*", async (c, next) => {
  const secret = c.req.header("X-API-Secret");
  if (c.env.API_SECRET && c.env.API_SECRET !== "change-me-in-dashboard") {
    if (secret !== c.env.API_SECRET) {
      return c.json({ error: "Unauthorized" }, 401);
    }
  }
  await next();
});

app.route("/api/tags", tags);
app.route("/api/names", names);
app.route("/api/keywords", keywords);
app.route("/api/export", exportRoute);
app.route("/dashboard", dashboard);

// 根路径重定向到 Dashboard
app.get("/", (c) => c.redirect("/dashboard"));

// 健康检查
app.get("/health", (c) => {
  return c.json({ service: "japanesename-data-service", status: "ok" });
});

export default app;
