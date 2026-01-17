import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// 检查数据库连接字符串
const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.warn("DATABASE_URL is not set. Database operations will fail.");
    return "postgresql://placeholder:placeholder@localhost:5432/placeholder";
  }
  return url;
};

// 创建 Neon HTTP 连接 (支持 Edge Runtime 和 Serverless)
const sql = neon(getDatabaseUrl());

// 导出带有 schema 的 drizzle 实例
export const db = drizzle(sql, { schema });

// 导出所有 schema
export * from "./schema";
