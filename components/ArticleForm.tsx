"use client";
import React, { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/action";

function ArticleForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("**Hello World!!!**");
  const [, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });
  async function handleFormSubmit(formData: FormData) {
    try {
      const formValues = {
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        link: formData.get("link"),
        pitch,
      };

      await formSchema.parseAsync(formValues);

      const result = await createPitch(formData, pitch);

      if (result.status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Your article has been created successfully.",
        });
        router.push(`/article/${result._id}`);
      }
      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please check your input and try again.",
          variant: "destructive",
        });

        return { error: "Validation Failed", status: "Error" };
      }

      toast({
        title: "Error",
        description: "An unexpected error has occurred.",
        variant: "destructive",
      });

      return {
        error: "An unexpected error has occurred",
        status: "Error",
      };
    }
  }
  return (
    <form action={formAction} className="article-form">
      <div>
        <label htmlFor="title" className="article-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="article-form_input"
          required
          placeholder="Article Title"
        />
        {errors.title && <p className="article-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="article-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="article-form_textarea"
          required
          placeholder="Article Description"
        />
        {errors.description && (
          <p className="article-form_error">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="article-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="article-form_input"
          required
          placeholder="Article Category (Tech, Health, Education...)"
        />
        {errors.category && (
          <p className="article-form_error">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="article-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="article-form_input"
          required
          placeholder="Article Image URL"
        />
        {errors.link && <p className="article-form_error">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="article-form_label">
          Detail
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        {errors.pitch && <p className="article-form_error">{errors.pitch}</p>}
      </div>

      <Button
        type="submit"
        className="article-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
}

export default ArticleForm;
