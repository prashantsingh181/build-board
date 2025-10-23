"use server";

import { Document, ObjectId, WithoutId } from "mongodb";
import { getDb } from "../dbHelper";
import { ArticleWithAuthor, Article } from "../types";

export async function getArticles(searchTerm?: string) {
  const db = await getDb();
  const articlesCollection = db.collection("articles");

  const pipeline: Document[] = [];
  if (searchTerm) {
    pipeline.push({
      $match: {
        $or: [
          { title: { $regex: searchTerm, $options: "i" } }, // case-insensitive
          { summary: { $regex: searchTerm, $options: "i" } },
          { content: { $regex: searchTerm, $options: "i" } },
        ],
      },
    });
  }

  // Lookup author details
  pipeline.push(
    {
      $lookup: {
        from: "authors",
        localField: "authorId",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: "$author",
    },
    {
      $sort: { createdAt: -1 },
    }
  );

  const articles = articlesCollection
    .aggregate<ArticleWithAuthor>(pipeline)
    .toArray();

  return articles;
}

export async function getArticleById(id: string) {
  const db = await getDb();
  const articleCollection = db.collection("articles");
  const article = await articleCollection
    .aggregate<ArticleWithAuthor>([
      { $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: "authors",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },
      { $unwind: "$author" },
    ])
    .next();
  return article;
}

export async function getArticlesByUserId(
  authorId: string,
  options?: { exclude: string[] }
) {
  const db = await getDb();
  const articleCollection = db.collection("articles");

  const matchStage: Document = {
    authorId: new ObjectId(authorId),
  };

  if (options && options.exclude.length > 0) {
    matchStage._id = {
      $nin: options.exclude.map((id) => new ObjectId(id)),
    };
  }

  const articles = articleCollection
    .aggregate<ArticleWithAuthor>([
      {
        $match: matchStage,
      },
      {
        $lookup: {
          from: "authors",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },
      { $unwind: "$author" },
      {
        $sort: { createdAt: -1 },
      },
    ])
    .toArray();
  return articles;
}

export async function createArticle(article: WithoutId<Article>) {
  const db = await getDb();
  const articleCollection = db.collection<WithoutId<Article>>("articles");
  const response = await articleCollection.insertOne(article);
  return response.insertedId;
}
