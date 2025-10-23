"use server";

import { auth } from "@/auth";
import slugify from "slugify";
import { parseServerActionResponse } from "./utils";
import { createArticle } from "./queries/articles";
import { ObjectId } from "mongodb";

interface ErrorResponse {
  error: string;
  status: "ERROR";
}

interface SuccessResponse {
  error: "";
  status: "SUCCESS";
  id: string;
}

type ActionResponse = SuccessResponse | ErrorResponse;

export async function createPitch(
  formData: FormData,
  pitch: string
): Promise<ActionResponse> {
  const session = await auth();
  if (!session)
    return parseServerActionResponse({
      error: "Not Signed in",
      status: "ERROR",
    });

  const title = formData.get("title");
  const description = formData.get("description");
  const category = formData.get("category");
  const image = formData.get("link");
  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const article = {
      title: title ? String(title) : null,
      description: description ? String(description) : null,
      category: category ? String(category) : null,
      image: image ? String(image) : null,
      slug: slug,
      authorId: new ObjectId(session?.id),
      pitch,
      createdAt: new Date()
    };

    const result = await createArticle(article);

    return parseServerActionResponse({
      id: result.toString(),
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.error(error);
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
}
