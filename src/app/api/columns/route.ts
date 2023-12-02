import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authUserId = req.headers.get("X-USER-ID");

  const user = await new GetColumnsController().handleRequest({
    id: authUserId,
  });

  return NextResponse.json(user);
}
