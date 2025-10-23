import { ObjectId } from "mongodb";
import { getDb } from "../dbHelper";
import { Author } from "../types";

export async function getAuthorById(id: string) {
  const db = await getDb();
  const authorCollection = db.collection("authors");
  const author = authorCollection
    .aggregate<Author>([
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
    ])
    .next();
  return author;
}
