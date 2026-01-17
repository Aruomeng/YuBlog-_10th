import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AdminLayoutClient } from "@/components/admin/admin-layout-client";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 验证登录状态
  const session = await auth();
  
  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}

