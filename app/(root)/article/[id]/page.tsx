import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
// import { Suspense } from "react";
// import { Skeleton } from "@/components/ui/skeleton";
// import View from "@/components/View";
import { getArticleById } from "@/lib/queries/articles";
import SimilarArticles from "@/components/SimilarArticles";

const md = markdownit();

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = await getArticleById(id);

  if (!post) return notFound();
  const parsedContent = md.render(post?.pitch || "");
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?.createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-5xl">{post.description}</p>
      </section>
      <section className="section_container">
        {post.image && (
          <Image
            src={post.image}
            alt="thumbnail"
            className="w-full aspect-video rounded-xl object-cover"
            height={900}
            width={1600}
          />
        )}
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author?.image ?? "/placeholderUser.jpg"}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <p className="text-20-medium">{post.author?.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post.author?.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            ></article>
          ) : (
            <p className="no-result">No Details Provided</p>
          )}
        </div>
        <hr className="divider" />

        <SimilarArticles
          authorId={post.author._id.toString()}
          authorName={post.author.name ?? "author"}
          exclude={[id]}
        />

        {/* <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense> */}
      </section>
    </>
  );
}
