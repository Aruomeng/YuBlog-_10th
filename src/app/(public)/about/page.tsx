import { BentoCard } from "@/components/bento/bento-card";
import { NewsletterForm } from "@/components/newsletter-form";
import { getAllSkills, getTimelineEvents } from "@/lib/skills";
import { getConfigValues, defaultConfig } from "@/lib/config";

export const metadata = {
  title: "关于 | YuBlog",
  description: "了解更多关于我的信息",
};

// 增量静态再生成，每60秒重新验证
export const revalidate = 60;

export default async function AboutPage() {
  const skills = await getAllSkills();
  const timeline = await getTimelineEvents();
  const config = await getConfigValues([
    "authorName",
    "authorTitle",
    "authorBio",
  ]);

  const authorName = config.authorName || defaultConfig.authorName;
  const authorTitle = config.authorTitle || defaultConfig.authorTitle;
  const authorBio = config.authorBio || defaultConfig.authorBio;

  // 如果技能为空，使用默认数据
  const skillCategories = Object.keys(skills).length > 0
    ? Object.entries(skills)
    : [
        ["前端", [{ id: 1, name: "React", category: "前端", icon: null, level: 0, sortOrder: 0 }]],
        ["后端", [{ id: 2, name: "Node.js", category: "后端", icon: null, level: 0, sortOrder: 0 }]],
      ];

  // 如果时间线为空，使用默认数据
  const timelineEvents = timeline.length > 0
    ? timeline
    : [
        { id: 1, year: "2024", title: "构建第十代个人博客", description: null, icon: null, sortOrder: 0 },
        { id: 2, year: "2023", title: "深入 AI/LLM 领域", description: null, icon: null, sortOrder: 1 },
      ];

  return (
    <main className="pt-32 pb-20 max-w-4xl mx-auto px-4">
      {/* 标题 */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
          关于我 👋
        </h1>
        <p className="text-zinc-400 text-lg">
          {authorTitle}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* 简介 */}
        <BentoCard className="md:col-span-2">
          <h2 className="text-xl font-semibold text-white mb-4">简介</h2>
          <div className="space-y-4 text-zinc-300">
            <p>你好！我是 {authorName}。</p>
            <p>{authorBio}</p>
            <p>
              这是我的第十代博客，融合了最新的 Web 技术（Next.js 15、React Server Components）
              和 AI 能力（RAG、LLM），旨在创造一个独特的数字空间。
            </p>
          </div>
        </BentoCard>

        {/* 技能 */}
        <BentoCard>
          <h2 className="text-xl font-semibold text-white mb-4">技能栈</h2>
          <div className="space-y-4">
            {skillCategories.map(([category, categorySkills]) => (
              <div key={String(category)}>
                <h3 className="text-sm font-medium text-zinc-400 mb-2">
                  {String(category)}
                </h3>
                <div className="flex flex-wrap gap-1">
                  {(categorySkills as any[]).map((skill) => (
                    <span
                      key={skill.id}
                      className="px-2 py-1 text-xs bg-purple-500/10 text-purple-400 rounded border border-purple-500/20"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* 时间线 */}
        <BentoCard>
          <h2 className="text-xl font-semibold text-white mb-4">时间线</h2>
          <div className="space-y-4">
            {timelineEvents.map((item, index) => (
              <div key={item.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  {index < timelineEvents.length - 1 && (
                    <div className="w-px h-full bg-zinc-700" />
                  )}
                </div>
                <div className="pb-4">
                  <span className="text-sm font-medium text-purple-400">
                    {item.year}
                  </span>
                  <p className="text-zinc-300">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* 联系方式 */}
        <BentoCard className="md:col-span-2">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">
                保持联系
              </h2>
              <p className="text-zinc-400">
                订阅我的更新，获取最新的技术文章和项目动态
              </p>
            </div>
            <NewsletterForm />
          </div>
        </BentoCard>
      </div>
    </main>
  );
}
