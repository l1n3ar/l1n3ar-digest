import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Digest
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-xs text-muted-foreground hover:text-foreground">
            Admin
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
