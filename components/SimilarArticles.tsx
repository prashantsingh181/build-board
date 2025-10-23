import { getArticlesByUserId } from "@/lib/queries/articles";
import ArticleCard from "./ArticleCard";

interface SimilarArticlesProps {
  authorId: string;
  authorName: string;
  exclude: string[];
}
export default async function SimilarArticles({
  authorId,
  authorName,
  exclude,
}: Readonly<SimilarArticlesProps>) {
  const articles = await getArticlesByUserId(authorId, { exclude });
  return (
    articles.length > 0 && (
      <div className="max-w-4xl mx-auto">
        <p className="text-30-semibold">More Articles by {authorName}</p>
        <ul className="mt-7 card_grid-sm">
          {articles.map((post) => (
            <ArticleCard key={post._id} post={post} />
          ))}
        </ul>
      </div>
    )
  );
}
