import { db } from "@/db";
import { posts, projects, skills, tags, guestbookEntries } from "@/db/schema";
import { count, sum, eq } from "drizzle-orm";
import { StatsCard, DataCard } from "@/components/admin/stats-card";
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
      posts: postsCount?.count || 0,
      projects: projectsCount?.count || 0,
      tags: tagsCount?.count || 0,
      skills: skillsCount?.count || 0,
      guestbook: guestbookCount?.count || 0,
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
      },
    });
  } catch (error) {
    console.error("Failed to get recent posts:", error);
    return [];
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();
  const recentPosts = await getRecentPosts();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">仪表盘</h1>
        <p className="text-zinc-400">欢迎回来！这是您博客的数据概览。</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="文章数量"
          value={stats.posts}
          icon="📝"
        />
        <StatsCard
          title="总访问量"
          value={stats.views.toLocaleString()}
          icon="👁️"
        />
        <StatsCard
          title="总点赞数"
          value={stats.likes.toLocaleString()}
          icon="❤️"
        />
        <StatsCard
          title="留言数量"
          value={stats.guestbook}
          icon="💬"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="项目数量"
          value={stats.projects}
          icon="🚀"
        />
        <StatsCard
          title="标签数量"
          value={stats.tags}
          icon="🏷️"
        />
        <StatsCard
          title="技能数量"
          value={stats.skills}
          icon="💡"
        />
      </div>

      {/* Quick Actions & Recent Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <DataCard title="快捷操作">
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/admin/posts/new"
              className="flex items-center gap-3 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-colors"
            >
              <span className="text-2xl">✏️</span>
              <div>
                <p className="font-medium text-white">写文章</p>
                <p className="text-xs text-zinc-500">创建新博客文章</p>
              </div>
            </Link>
            <Link
              href="/admin/projects"
              className="flex items-center gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
            >
              <span className="text-2xl">🚀</span>
              <div>
                <p className="font-medium text-white">添加项目</p>
                <p className="text-xs text-zinc-500">展示新作品</p>
              </div>
            </Link>
            <Link
              href="/admin/tags"
              className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition-colors"
            >
              <span className="text-2xl">🏷️</span>
              <div>
                <p className="font-medium text-white">管理标签</p>
                <p className="text-xs text-zinc-500">整理分类标签</p>
              </div>
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500/20 transition-colors"
            >
              <span className="text-2xl">⚙️</span>
              <div>
                <p className="font-medium text-white">站点设置</p>
                <p className="text-xs text-zinc-500">配置博客信息</p>
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
            <ul className="space-y-3">
              {recentPosts.map((post) => (
                <li
                  key={post.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        post.published ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium text-white truncate max-w-[200px]">
                        {post.title}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {post.createdAt?.toLocaleDateString("zh-CN")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-zinc-500">
                      👁️ {post.viewCount}
                    </span>
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
