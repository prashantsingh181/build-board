import { auth } from "@/auth";
import ArticleForm from "@/components/ArticleForm";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Submit Your Article</h1>
      </section>

      <ArticleForm />
    </>
  );
}

export default page;
