import { getDemo } from "@/lib/demo-store";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ demoId: string }> },
): Promise<Response> {
  const { demoId } = await ctx.params;
  const rec = getDemo(demoId);
  if (!rec) {
    return new Response(
      JSON.stringify({ error: "not_found_or_expired" }),
      {
        status: 404,
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      },
    );
  }
  // Don't ship the full system prompt to the client.
  return new Response(
    JSON.stringify({
      demoId: rec.demoId,
      profile: rec.profile,
      createdAt: rec.createdAt,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    },
  );
}
