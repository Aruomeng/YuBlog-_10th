export { auth as middleware } from "@/auth";

export const config = {
  // 匹配需要保护的路由
  matcher: [
    // 跳过静态资源和 API 路由
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
