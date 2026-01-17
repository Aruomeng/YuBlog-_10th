import { pgTable, serial, varchar, text, boolean, timestamp, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ============================================
// 博客文章相关
// ============================================

// 文章表
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  content: text("content").notNull(),
  coverImage: varchar("cover_image", { length: 500 }),
  published: boolean("published").default(false),
  publishedAt: timestamp("published_at"),
  readTime: varchar("read_time", { length: 50 }),
  viewCount: integer("view_count").default(0),
  likeCount: integer("like_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// 标签表
export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).unique().notNull(),
  slug: varchar("slug", { length: 100 }).unique().notNull(),
  color: varchar("color", { length: 50 }),
});

// 文章-标签关联表
export const postTags = pgTable("post_tags", {
  postId: integer("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  tagId: integer("tag_id").notNull().references(() => tags.id, { onDelete: "cascade" }),
});

// 文章关系
export const postsRelations = relations(posts, ({ many }) => ({
  postTags: many(postTags),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  postTags: many(postTags),
}));

export const postTagsRelations = relations(postTags, ({ one }) => ({
  post: one(posts, {
    fields: [postTags.postId],
    references: [posts.id],
  }),
  tag: one(tags, {
    fields: [postTags.tagId],
    references: [tags.id],
  }),
}));

// ============================================
// 项目展示
// ============================================

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  link: varchar("link", { length: 500 }),
  github: varchar("github", { length: 500 }),
  image: varchar("image", { length: 500 }),
  status: varchar("status", { length: 50 }), // 'in_progress', 'completed', 'maintaining'
  techStack: text("tech_stack"), // JSON 字符串
  featured: boolean("featured").default(false),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================
// 技能栈
// ============================================

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  category: varchar("category", { length: 100 }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  icon: varchar("icon", { length: 100 }),
  level: integer("level").default(0),
  sortOrder: integer("sort_order").default(0),
});

// ============================================
// 时间线
// ============================================

export const timelineEvents = pgTable("timeline_events", {
  id: serial("id").primaryKey(),
  year: varchar("year", { length: 10 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 100 }),
  sortOrder: integer("sort_order").default(0),
});

// ============================================
// 站点配置
// ============================================

export const siteConfig = pgTable("site_config", {
  key: varchar("key", { length: 100 }).primaryKey(),
  value: text("value").notNull(),
  description: varchar("description", { length: 255 }),
});

// ============================================
// 留言墙 (已存在，保留)
// ============================================

export const guestbookEntries = pgTable("guestbook_entries", {
  id: serial("id").primaryKey(),
  userName: varchar("user_name", { length: 255 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  createdByEmail: varchar("created_by_email", { length: 255 }),
  userImage: varchar("user_image", { length: 500 }),
});

// ============================================
// 订阅者 (已存在，保留)
// ============================================

export const subscribers = pgTable("subscribers", {
  email: varchar("email", { length: 255 }).primaryKey(),
  subscribedAt: timestamp("subscribed_at").defaultNow(),
});

// ============================================
// 点赞会话 (已存在，保留)
// ============================================

export const likeSessions = pgTable("like_sessions", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull(),
  sessionHash: varchar("session_hash", { length: 64 }).notNull(),
  likeCount: integer("like_count").default(0),
  lastLikedAt: timestamp("last_liked_at").defaultNow(),
});

// ============================================
// 类型导出
// ============================================

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type Tag = typeof tags.$inferSelect;
export type NewTag = typeof tags.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Skill = typeof skills.$inferSelect;
export type NewSkill = typeof skills.$inferInsert;
export type TimelineEvent = typeof timelineEvents.$inferSelect;
export type NewTimelineEvent = typeof timelineEvents.$inferInsert;
export type SiteConfig = typeof siteConfig.$inferSelect;
export type GuestbookEntry = typeof guestbookEntries.$inferSelect;
export type Subscriber = typeof subscribers.$inferSelect;
export type LikeSession = typeof likeSessions.$inferSelect;
