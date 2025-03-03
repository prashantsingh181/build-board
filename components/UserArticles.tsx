import { client } from "@/sanity/lib/client";
import { ARTICLES_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import React from "react";
import ArticleCard, { ArticleTypeCard } from "./ArticleCard";
import Image from "next/image";

async function UserArticles({ id }: { id: string }) {
  const articles = await client.fetch(ARTICLES_BY_AUTHOR_QUERY, { id });
  return (
    <>
      {articles.length > 0 ? (
        <ul className="card_grid-sm">
          {articles.map((article: ArticleTypeCard) => (
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
