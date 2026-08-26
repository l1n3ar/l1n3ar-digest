import { cn } from "@/ui/lib/utils";
import type { ComponentProps } from "react";

function H1({ className, ...props }: ComponentProps<"h1">) {
  return <h1 className={cn("text-sm font-semibold tracking-tight", className)} {...props} />;
}

function H3({ className, ...props }: ComponentProps<"h2">) {
  return <h2 className={cn("text-xs font-medium leading-snug", className)} {...props} />;
}

function P({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("text-xs leading-relaxed text-muted-foreground", className)} {...props} />;
}

function Muted({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("text-[11px] text-muted-foreground", className)} {...props} />;
}

function InlineLink({ className, ...props }: ComponentProps<"a">) {
  return (
    <a
      className={cn("text-[11px] text-primary underline-offset-4 hover:underline", className)}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  );
}

export { H1, H3, InlineLink, Muted, P };
