import { Muted, InlineLink } from "@/ui/components/ui/typography";

export function Footer() {
  return (
    <footer>
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10 text-xs">
        <Muted>
          Built by{" "}
          <a
            href="https://github.com/l1n3ar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:underline "
          >
            l1n3ar
          </a>
        </Muted>

        <InlineLink href="https://github.com/l1n3ar/l1n3ar-digest" className="text-muted-foreground hover:text-foreground">
          Source on GitHub
        </InlineLink>
      </div>
    </footer>
  );
}
