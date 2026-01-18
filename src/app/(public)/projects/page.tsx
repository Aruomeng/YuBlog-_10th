import { BentoCard } from "@/components/bento/bento-card";
import Link from "next/link";
import { getAllProjects, parseTechStack } from "@/lib/projects";

export const metadata = {
  title: "项目 | YuBlog",
  description: "我的开源项目和作品集",
};

// 增量静态再生成，每60秒重新验证
export const revalidate = 60;

const statusLabels: Record<string, { label: string; className: string }> = {
  in_progress: { label: "进行中", className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  completed: { label: "已完成", className: "bg-green-500/10 text-green-400 border-green-500/20" },
  maintaining: { label: "维护中", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <main className="pt-32 pb-20 max-w-4xl mx-auto px-4">
      {/* 标题 */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
          项目 🚀
        </h1>
        <p className="text-zinc-400">
          我的开源项目、实验作品和个人工具
        </p>
      </div>

      {/* 项目列表 */}
      <div className="grid gap-6 md:grid-cols-2">
        {projects.length === 0 ? (
          <div className="text-center py-12 text-zinc-500 col-span-2">
            暂无项目
          </div>
        ) : (
          projects.map((project) => {
            const techStack = parseTechStack(project.techStack);
            const status = statusLabels[project.status || ""] || statusLabels.maintaining;

            return (
              <Link
                key={project.id}
                href={project.link || project.github || "#"}
                target="_blank"
              >
                <BentoCard className="h-full cursor-pointer">
                  <div className="flex flex-col h-full">
                    {/* 状态标签 */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-0.5 text-xs rounded-full border ${status.className}`}>
                        {status.label}
                      </span>
                      {project.featured && (
                        <span className="text-xs text-yellow-400">⭐ 精选</span>
                      )}
                    </div>

                    {/* 标题 */}
                    <h2 className="text-lg font-semibold text-white mb-2">
                      {project.title}
                    </h2>

                    {/* 描述 */}
                    <p className="text-zinc-400 text-sm mb-4 flex-1">
                      {project.description}
                    </p>

                    {/* 技术栈 */}
                    <div className="flex flex-wrap gap-1">
                      {techStack.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-xs bg-zinc-800 text-zinc-400 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </BentoCard>
              </Link>
            );
          })
        )}
      </div>
    </main>
  );
}
