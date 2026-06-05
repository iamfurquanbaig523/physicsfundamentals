import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const DEFAULT_PATHS = ["/", "/blog", "/series", "/authors", "/sitemap.xml"];

function normalizePath(path: unknown): string | null {
  if (typeof path !== "string") return null;
  const trimmed = path.trim();
  if (!trimmed || /^https?:\/\//i.test(trimmed)) return null;
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

export async function POST(request: Request) {
  const expectedSecret = process.env.REVALIDATE_SECRET;

  if (!expectedSecret) {
    return NextResponse.json({ error: "Revalidation is not configured." }, { status: 503 });
  }

  let body: { secret?: string; paths?: unknown[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (body.secret !== expectedSecret) {
    return NextResponse.json({ error: "Invalid revalidation secret." }, { status: 401 });
  }

  const requestedPaths = Array.isArray(body.paths)
    ? body.paths.map(normalizePath).filter((path): path is string => Boolean(path))
    : [];
  const paths = requestedPaths.length > 0 ? requestedPaths : DEFAULT_PATHS;

  for (const path of Array.from(new Set(paths))) {
    revalidatePath(path);
  }

  return NextResponse.json({
    revalidated: true,
    paths,
    now: new Date().toISOString(),
  });
}
