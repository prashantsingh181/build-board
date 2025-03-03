import SearchForm from "@/components/SearchForm";
import ArticleCard, { ArticleTypeCard } from "@/components/ArticleCard";
import { client } from "@/sanity/lib/client";
// import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { ARTICLES_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;
  const params = { search: query || null };

  const posts = await client.fetch(ARTICLES_QUERY, params);
  // const { data: posts } = await sanityFetch({ query: ARTICLES_QUERY, params });
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Share Your Builds, <br /> Connect With Developers
        </h1>
        <p className="sub-heading !max-3xl">
          Share Ideas, Show Off Projects, and Get Noticed in Virtual
          Competitions
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Articles"}
        </p>
        {posts?.length > 0 ? (
          <ul className="mt-7 card_grid">
            {posts.map((post: ArticleTypeCard) => (
              <ArticleCard key={post?._id} post={post} />
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
            <p className="no-results">No Articles found</p>
          </div>
        )}
      </section>
      {/* <SanityLive /> */}
    </>
  );
}
