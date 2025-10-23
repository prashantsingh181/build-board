import { ObjectId, WithId } from "mongodb";

export interface Article {
  _id: string;
  title: string | null;
  description: string | null;
  category: string | null;
  image: string | null;
  slug: string;
  authorId: ObjectId;
  pitch: string;
  createdAt: Date;
}

export interface ArticleWithAuthor extends Omit<Article, "authorId"> {
  author: WithId<Author>;
}

export interface Author {
  githubId: string;
  name: string | null;
  username: string | null;
  email: string | null;
  image: string | null;
  bio: string | null;
  createdAt: string;
}
