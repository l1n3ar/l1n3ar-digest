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
      <AlertDialogTrigger render={<Button type="button" size="xs" variant={variant} />}>
        {label}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel size="xs">Cancel</AlertDialogCancel>
          <form action={action}>
            <AlertDialogAction type="submit" size="xs" variant={variant}>
              {label}
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
