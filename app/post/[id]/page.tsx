import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: { id: string };
}
const Post = async ({ params }: PostPageProps) => {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: {
      user: true, // to show author email
      tags: true, // if using Tag model
    },
  });
  if (!post) {
    notFound();
  }

  return (
    <article>
      {post.featuredImage && <img src={post.featuredImage} alt={post.title} />}
      <h1>{post.title}</h1>
      <div>
        <span>By {post.user.email}</span>
        <time>{new Date(post.createdAt).toLocaleDateString()}</time>
      </div>
      <div>
        {post.tags.map((tag) => (
          <span key={tag.id}>#{tag.name}</span>
        ))}
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
};

export default Post;
