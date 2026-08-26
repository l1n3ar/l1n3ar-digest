"use client";

import { useFormStatus } from "react-dom";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/ui/components/ui/alert-dialog";
import { Button } from "@/ui/components/ui/button";

function SubmitButton({ label, variant }: { label: string; variant: "default" | "destructive" | "outline" }) {
  const { pending } = useFormStatus();
  return (
    <AlertDialogAction type="submit" size="xs" variant={variant} loading={pending}>
      {label}
    </AlertDialogAction>
  );
}

export function ConfirmActionButton({
  label,
  title,
  description,
  action,
  variant = "default",
}: {
  label: string;
  title: string;
  description: string;
  action: () => Promise<void>;
  variant?: "default" | "destructive" | "outline";
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button type="button" size="2xs" variant={variant} />}>
        {label}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-sm">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-xs">{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center">
          <AlertDialogCancel size="xs">Cancel</AlertDialogCancel>
          <form action={action}>
            <SubmitButton label={label} variant={variant} />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
