import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Author, Article } from "@/sanity/types";
import { Skeleton } from "./ui/skeleton";

export type ArticleTypeCard = Omit<Article, "author"> & { author?: Author };

function ArticleCard({ post }: { post: ArticleTypeCard }) {
  return (
    <li className="article-card group">
      <div className="flex-between">
        <p className="article_card_date">{formatDate(post._createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{post.views}</span>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${post.author?._id}`}>
            <p className="text-16-medium line-clamp-1">{post.author?.name}</p>
          </Link>
          <Link href={`/article/${post._id}`}>
            <h3 className="text-26-semibold line-clamp-1">{post.title}</h3>
          </Link>
        </div>
        <Link href={`/user/${post.author?._id}`}>
          <Image
            src={post.author?.image ?? ""}
            alt="placeholder"
            width="48"
            height="48"
            className="rounded-full"
          />
        </Link>
      </div>
      <Link href={`/article/${post._id}`}>
        <p className="article-card_desc">{post.description}</p>
        <img src={post.image} alt="placeholder" className="article-card_img" />
      </Link>
      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${post.category?.toLowerCase()}`}>
          <p className="text-16-medium">{post.category}</p>
        </Link>
        <Button className="article-card_btn" asChild>
          <Link href={`/article/${post._id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
}

export const ArticleCardSkeleton = () => (
  <>
    {Array.from({ length: 5 }, (_, i) => i + 1).map((i: number) => (
      <li key={cn("skeleton", i)}>
        <Skeleton className="article-card_skeleton" />
      </li>
    ))}
  </>
);

export default ArticleCard;
