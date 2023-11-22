"use client";

import { ElementRef, forwardRef, useRef } from "react";
import { createCard } from "@/actions/card";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface FormCardProps {
  listId: string;
  isEditing: boolean;
  enbleEditing: () => void;
  disableEditing: () => void;
}

export const FormCard = forwardRef<HTMLTextAreaElement, FormCardProps>(
  ({ disableEditing, enbleEditing, isEditing, listId }, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);
    const [parent] = useAutoAnimate();

    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: (data) => {
        disableEditing();
        formRef.current?.reset();
      },
      onError: (error) => toast.error(error),
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };

    const onTextAreaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      const listId = formData.get("listId") as string;
      const boardId = formData.get("boardId") as string;

      execute({ title, listId, boardId });
    };

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing);

    return (
      <div className="pt-2 px-2" ref={parent}>
        {!isEditing && (
          <Button
            onClick={enbleEditing}
            className="w-full text-foreground/60 hover:text-foreground bg-transparent hover:bg-foreground/5"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add card
          </Button>
        )}

        {isEditing && (
          <form action={onSubmit} ref={formRef} className="w-full space-y-3">
            <FormTextarea
              ref={ref}
              errors={fieldErrors}
              onKeyDown={onTextAreaKeyDown}
              name="title"
              className="bg-black/10 border-none"
              placeholder="Title card here..."
            />

            <input type="hidden" name="listId" value={listId} />
            <input type="hidden" name="boardId" value={params.boardId} />

            <FormSubmit className="w-full h-10" spinner>
              <Plus className="h-5 w-5 mr-2" />
              Add card
            </FormSubmit>
          </form>
        )}
      </div>
    );
  }
);

FormCard.displayName = "FormCard";
