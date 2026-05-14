"use client";

import { type SyntheticEvent, useState } from "react";
import toast from "react-hot-toast";
import type { Reference } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { ArrowUp } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { DURATION } from "@/shared/constants/toast.constants";

import { CreateNewCommentDocument, type GetRecipeBySlugQuery } from "@/__generated__/graphql";

interface Props {
  recipeId?: GetRecipeBySlugQuery["recipeBySlug"]["id"];
}

export function RecipeAddComment({ recipeId }: Props) {
  const [comment, setComment] = useState("");

  const [addComment, { loading }] = useMutation(CreateNewCommentDocument, {
    onCompleted: () => {
      toast.success("Comment added successfully", {
        id: "add-comment-success",
        duration: DURATION
      });
      setComment("");
    },
    onError: () => {
      toast.error("Error creating comment", {
        id: "add-comment-error",
        duration: DURATION
      });
    },
    update(cache, { data }) {
      const newComment = data?.createComment;

      if (!newComment || !recipeId) return;

      cache.modify({
        id: cache.identify({ __typename: "RecipeModel", id: recipeId }),
        fields: {
          comments(existingComments: ReadonlyArray<Reference> = [], { readField, toReference }) {
            const newCommentRef = toReference(newComment);

            if (!newCommentRef) return existingComments;

            const isAlreadyAdded = existingComments.some((commentRef) => readField("id", commentRef) === newComment.id);

            if (isAlreadyAdded) {
              return existingComments;
            }

            return [...existingComments, newCommentRef];
          }
        }
      });
    }
  });

  const onSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    if (recipeId) {
      addComment({
        variables: {
          data: { recipeId, content: comment }
        }
      });
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="border-primary mt-6 flex justify-between overflow-hidden rounded-3xl border-2 p-2"
    >
      <Input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add new comment"
        className="h-full border-none"
      />
      <Button
        type="submit"
        variant="default"
        size="icon"
        className="w-8 rounded-full bg-black"
        disabled={loading || !comment.trim()}
      >
        <ArrowUp />
      </Button>
    </form>
  );
}
