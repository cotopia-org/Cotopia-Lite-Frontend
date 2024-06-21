import { NextResponse } from "next/server";

const items = require("./data.json");
export async function GET(req: Request) {
  return NextResponse.json(items);
}
