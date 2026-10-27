import { connection } from "next/server";

// Railway's deploy healthcheck. Only switches traffic to a new deployment once
// this returns 200. connection() keeps it from being prerendered at build time.
export async function GET() {
  await connection();
  return Response.json({ status: "ok" });
}
