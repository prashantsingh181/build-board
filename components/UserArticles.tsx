import React from "react";
import ArticleCard from "./ArticleCard";
import Image from "next/image";
import { getArticlesByUserId } from "@/lib/queries/articles";

async function UserArticles({ id }: { id: string }) {
  // const articles = await client.fetch(ARTICLES_BY_AUTHOR_QUERY, { id });
  const articles = await getArticlesByUserId(id);
  return (
    <>
      {articles.length > 0 ? (
        <ul className="card_grid-sm">
          {articles.map((article) => (
            <ArticleCard key={article._id} post={article} />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col gap-2 items-center mt-4">
          <Image
            src="/no-result.svg"
            alt="No result Image"
            width={200}
            height={200}
          />
          <p className="no-results">No articles Yet</p>
        </div>
      )}
    </>
  );
}

export default UserArticles;
