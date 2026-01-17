"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "@/components/admin/data-table";
import { deletePost } from "@/actions/admin";

interface Post {
  id: number;
  title: string;
  slug: string;
  published: boolean | null;
  viewCount: number | null;
  likeCount: number | null;
  createdAt: Date | null;
  postTags: { tag: { id: number; name: string } }[];
}

interface PostsActionsProps {
  posts: Post[];
}

export function PostsActions({ posts }: PostsActionsProps) {
  const router = useRouter();

  const handleEdit = (post: Post) => {
    router.push(`/admin/posts/${post.id}/edit`);
  };

  const handleDelete = async (post: Post) => {
    if (!confirm(`确定要删除文章 "${post.title}" 吗？此操作不可撤销。`)) {
      return;
    }
    
    const result = await deletePost(post.id);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error);
    }
  };

  const columns = [
    {
      key: "title",
      title: "标题",
      render: (post: Post) => (
        <div>
          <p className="font-medium text-white">{post.title}</p>
          <p className="text-xs text-zinc-500 mt-1">/{post.slug}</p>
        </div>
      ),
    },
    {
      key: "tags",
      title: "标签",
      render: (post: Post) => (
        <div className="flex flex-wrap gap-1">
          {post.postTags.map((pt) => (
            <span
              key={pt.tag.id}
              className="px-2 py-0.5 text-xs rounded-full bg-purple-500/10 text-purple-400"
            >
              {pt.tag.name}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "status",
      title: "状态",
      render: (post: Post) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            post.published
              ? "bg-green-500/10 text-green-400"
              : "bg-yellow-500/10 text-yellow-400"
          }`}
        >
          {post.published ? "已发布" : "草稿"}
        </span>
      ),
    },
    {
      key: "stats",
      title: "统计",
      render: (post: Post) => (
        <div className="text-xs text-zinc-500">
          <p>👁️ {post.viewCount || 0} 次浏览</p>
          <p>❤️ {post.likeCount || 0} 次点赞</p>
        </div>
      ),
    },
    {
      key: "createdAt",
      title: "创建时间",
      render: (post: Post) => (
        <span className="text-zinc-500">
          {post.createdAt?.toLocaleDateString("zh-CN")}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={posts}
      keyField="id"
      onEdit={handleEdit}
      onDelete={handleDelete}
      emptyMessage="暂无文章，点击右上角创建您的第一篇文章"
    />
  );
}

