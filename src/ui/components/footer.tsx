import { Muted, InlineLink } from "@/ui/components/ui/typography";
import { SITE_OWNER_NAME, SITE_OWNER_URL, SITE_REPO_URL } from "@/ui/config/site";

export function Footer() {
  return (
    <footer>
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10 text-xs">
        <Muted>
          Built by{" "}
          <a
            href={SITE_OWNER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:underline "
          >
            {SITE_OWNER_NAME}
          </a>
        </Muted>

        <InlineLink href={SITE_REPO_URL} className="text-muted-foreground hover:text-foreground">
          Source on GitHub
        </InlineLink>
      </div>
    </footer>
  );
}
