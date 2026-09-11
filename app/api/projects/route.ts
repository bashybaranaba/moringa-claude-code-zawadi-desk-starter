import { NextResponse } from "next/server";
import { listProjects } from "@/lib/projects";

export function GET() {
  return NextResponse.json(listProjects());
}
