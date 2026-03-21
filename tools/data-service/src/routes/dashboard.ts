import { Hono } from "hono";
import { html } from "hono/html";
import type { Env } from "../types";
import { dashboardHtml } from "../dashboard/html";

const dashboard = new Hono<{ Bindings: Env }>();

dashboard.get("/", (c) => {
  return c.html(dashboardHtml);
});

export default dashboard;
