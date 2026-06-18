import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://127.0.0.1:8080";

type ApiProxyRouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, context: ApiProxyRouteContext) {
  return proxyRequest(request, context);
}

export async function POST(request: NextRequest, context: ApiProxyRouteContext) {
  return proxyRequest(request, context);
}

export async function PATCH(request: NextRequest, context: ApiProxyRouteContext) {
  return proxyRequest(request, context);
}

export async function DELETE(request: NextRequest, context: ApiProxyRouteContext) {
  return proxyRequest(request, context);
}

async function proxyRequest(request: NextRequest, context: ApiProxyRouteContext) {
  const { path } = await context.params;
  const targetUrl = new URL(`/api/v1/${path.join("/")}${request.nextUrl.search}`, API_BASE_URL);
  const headers = new Headers(request.headers);

  headers.delete("host");

  const response = await fetch(targetUrl, {
    body: request.body,
    duplex: "half",
    headers,
    method: request.method,
    redirect: "manual",
  } as RequestInit & { duplex: "half" });

  return new NextResponse(response.body, {
    headers: response.headers,
    status: response.status,
    statusText: response.statusText,
  });
}
