import { db } from "@/db";
import { posts, projects, skills, tags, guestbookEntries } from "@/db/schema";
import { count, sum, desc } from "drizzle-orm";
import { StatsCard, DataCard } from "@/components/admin/stats-card";
import { DashboardCharts } from "./dashboard-charts-client";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getStats() {
  try {
    const [postsCount] = await db.select({ count: count() }).from(posts);
    const [projectsCount] = await db.select({ count: count() }).from(projects);
    const [tagsCount] = await db.select({ count: count() }).from(tags);
    const [skillsCount] = await db.select({ count: count() }).from(skills);
    const [guestbookCount] = await db.select({ count: count() }).from(guestbookEntries);
    
    const [viewsSum] = await db
      .select({ total: sum(posts.viewCount) })
      .from(posts);
    const [likesSum] = await db
      .select({ total: sum(posts.likeCount) })
      .from(posts);

    return {
      posts: Number(postsCount?.count) || 0,
      projects: Number(projectsCount?.count) || 0,
      tags: Number(tagsCount?.count) || 0,
      skills: Number(skillsCount?.count) || 0,
      guestbook: Number(guestbookCount?.count) || 0,
      views: Number(viewsSum?.total) || 0,
      likes: Number(likesSum?.total) || 0,
    };
  } catch (error) {
    console.error("Failed to get stats:", error);
    return {
      posts: 0,
      projects: 0,
      tags: 0,
      skills: 0,
      guestbook: 0,
      views: 0,
      likes: 0,
    };
  }
}

async function getRecentPosts() {
  try {
    return await db.query.posts.findMany({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
      limit: 5,
      columns: {
        id: true,
        title: true,
        slug: true,
        published: true,
        createdAt: true,
        viewCount: true,
        likeCount: true,
      },
    });
  } catch (error) {
    console.error("Failed to get recent posts:", error);
    return [];
  }
}

async function getTopPosts() {
  try {
    return await db.query.posts.findMany({
      orderBy: (posts, { desc }) => [desc(posts.viewCount)],
      limit: 5,
      columns: {
        id: true,
        title: true,
        viewCount: true,
        likeCount: true,
      },
    });
  } catch (error) {
    console.error("Failed to get top posts:", error);
    return [];
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();
  const recentPosts = await getRecentPosts();
  const topPosts = await getTopPosts();

  // 准备图表数据
  const contentDistribution = [
    { name: "文章", value: stats.posts, color: "#8B5CF6" },
    { name: "项目", value: stats.projects, color: "#3B82F6" },
    { name: "标签", value: stats.tags, color: "#10B981" },
    { name: "技能", value: stats.skills, color: "#F59E0B" },
  ];

  const topPostsData = topPosts.map((post) => ({
    label: post.title.length > 15 ? post.title.slice(0, 15) + "..." : post.title,
    value: post.viewCount || 0,
    max: Math.max(...topPosts.map((p) => p.viewCount || 0)),
    color: "#8B5CF6",
  }));

  // 模拟最近7天趋势数据（实际项目中应从数据库获取）
  const trendData = [
    { name: "周一", views: Math.floor(stats.views * 0.12), likes: Math.floor(stats.likes * 0.1) },
    { name: "周二", views: Math.floor(stats.views * 0.15), likes: Math.floor(stats.likes * 0.12) },
    { name: "周三", views: Math.floor(stats.views * 0.18), likes: Math.floor(stats.likes * 0.15) },
    { name: "周四", views: Math.floor(stats.views * 0.14), likes: Math.floor(stats.likes * 0.18) },
    { name: "周五", views: Math.floor(stats.views * 0.16), likes: Math.floor(stats.likes * 0.2) },
    { name: "周六", views: Math.floor(stats.views * 0.13), likes: Math.floor(stats.likes * 0.15) },
    { name: "周日", views: Math.floor(stats.views * 0.12), likes: Math.floor(stats.likes * 0.1) },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">仪表盘</h1>
        <p className="text-zinc-400">欢迎回来！这是您博客的数据概览。</p>
      </div>

      {/* Stats Grid - 主要统计 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="文章数量"
          value={stats.posts}
          icon="📝"
          trend={{ value: 12, isUp: true }}
        />
        <StatsCard
          title="总访问量"
          value={stats.views.toLocaleString()}
          icon="👁️"
          trend={{ value: 8, isUp: true }}
        />
        <StatsCard
          title="总点赞数"
          value={stats.likes.toLocaleString()}
          icon="❤️"
          trend={{ value: 15, isUp: true }}
        />
        <StatsCard
          title="留言数量"
          value={stats.guestbook}
          icon="💬"
          trend={{ value: 5, isUp: true }}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 流量趋势图 */}
        <DataCard title="本周流量趋势" className="lg:col-span-2">
          <DashboardCharts type="trend" data={trendData} />
        </DataCard>

        {/* 内容分布饼图 */}
        <DataCard title="内容分布">
          <DashboardCharts type="pie" data={contentDistribution} />
        </DataCard>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard title="项目数量" value={stats.projects} icon="🚀" />
        <StatsCard title="标签数量" value={stats.tags} icon="🏷️" />
        <StatsCard title="技能数量" value={stats.skills} icon="💡" />
        <StatsCard
          title="互动率"
          value={stats.views > 0 ? ((stats.likes / stats.views) * 100).toFixed(1) + "%" : "0%"}
          icon="📊"
        />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 热门文章 */}
        <DataCard title="热门文章排行" className="lg:col-span-1">
          <DashboardCharts type="heatbar" data={topPostsData} />
        </DataCard>

        {/* Quick Actions */}
        <DataCard title="快捷操作">
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/admin/posts/new"
              className="flex items-center gap-2 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-colors"
            >
              <span className="text-xl">✏️</span>
              <div>
                <p className="text-sm font-medium text-white">写文章</p>
                <p className="text-xs text-zinc-500">创建新博客</p>
              </div>
            </Link>
            <Link
              href="/admin/projects"
              className="flex items-center gap-2 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
            >
              <span className="text-xl">🚀</span>
              <div>
                <p className="text-sm font-medium text-white">添加项目</p>
                <p className="text-xs text-zinc-500">展示作品</p>
              </div>
            </Link>
            <Link
              href="/admin/tags"
              className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition-colors"
            >
              <span className="text-xl">🏷️</span>
              <div>
                <p className="text-sm font-medium text-white">管理标签</p>
                <p className="text-xs text-zinc-500">整理分类</p>
              </div>
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-2 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500/20 transition-colors"
            >
              <span className="text-xl">⚙️</span>
              <div>
                <p className="text-sm font-medium text-white">站点设置</p>
                <p className="text-xs text-zinc-500">配置信息</p>
              </div>
            </Link>
          </div>
        </DataCard>

        {/* Recent Posts */}
        <DataCard
          title="最近文章"
          action={
            <Link
              href="/admin/posts"
              className="text-sm text-purple-400 hover:text-purple-300"
            >
              查看全部 →
            </Link>
          }
        >
          {recentPosts.length === 0 ? (
            <p className="text-zinc-500 text-center py-8">暂无文章</p>
          ) : (
            <ul className="space-y-2">
              {recentPosts.slice(0, 4).map((post) => (
                <li
                  key={post.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        post.published ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    />
                    <p className="text-sm text-white truncate">{post.title}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-zinc-500">👁️ {post.viewCount}</span>
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="text-xs text-purple-400 hover:text-purple-300"
                    >
                      编辑
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </DataCard>
      </div>
    </div>
  );
}
