import Image from "next/image";
import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: { id: string };
}
const Post = async ({ params }: PostPageProps) => {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      user: true, // to show author email
      tags: true, // if using Tag model
    },
  });
  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-[800px] mx-auto p-4">
      {post.featuredImage && (
        <Image
          src={post.featuredImage}
          alt={post.title}
          width={400}
          height={200}
          className="rounded-lg"
        />
      )}
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <div className="text-gray-600">
        <span>By {post.user.email}</span>
        <time>{new Date(post.createdAt).toLocaleDateString()}</time>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <div className="flex gap-2">
        {post.tags.map((tag) => (
          <span key={tag.id}>#{tag.name}</span>
        ))}
      </div>
    </article>
  );
};

export default Post;
