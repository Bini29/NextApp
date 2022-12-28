import { NextResponse, NextRequest } from "next/server";
export async function middleware(req, ev) {
  const { pathname } = req.nextUrl;
  console.log(pathname);
  if (pathname == "/install") {
    return NextResponse.redirect("/install");
  }
  return NextResponse.next();
}
