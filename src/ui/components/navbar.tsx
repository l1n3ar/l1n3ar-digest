import Link from "next/link";
import { ThemeToggle } from "@/ui/components/theme-toggle";
import { Separator } from "@/ui/components/ui/separator";
import { SITE_NAME } from "@/ui/config/site";

export function Navbar() {
  return (
    <header >
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="text-xs font-semibold tracking-tight">
          {SITE_NAME}
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-xs text-muted-foreground hover:text-foreground">
            Admin
          </Link>
          <Separator orientation="vertical" className="h-4 self-center" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
