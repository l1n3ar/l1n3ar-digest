import { listDrafts } from "@/lib/digest";
import { publishAction, deleteAction } from "@/actions/admin";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { H1, P, Muted, InlineLink } from "@/components/ui/typography";

export default async function AdminPage() {
  const drafts = await listDrafts();

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8">
      <H1>Drafts</H1>

      {drafts.length === 0 ? (
        <Muted className="mt-6">No drafts.</Muted>
      ) : (
        <div className="mt-6 flex flex-col gap-6">
          {drafts.map((entry) => (
            <Card key={entry.id}>
              <CardHeader>
                <CardTitle>{entry.title}</CardTitle>
                <CardDescription>{entry.topic}</CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col gap-3">
                <P>{entry.summary}</P>

                {entry.buildIdea && (
                  <Muted>
                    <span className="font-medium text-foreground">Build idea — </span>
                    {entry.buildIdea}
                  </Muted>
                )}

                {entry.links.length > 0 && (
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {entry.links.map((link) => (
                      <InlineLink key={link.url} href={link.url}>
                        {link.label}
                      </InlineLink>
                    ))}
                  </div>
                )}
              </CardContent>

              <CardFooter className="gap-2">
                <form action={publishAction.bind(null, entry.id)}>
                  <Button type="submit" size="sm">
                    Publish
                  </Button>
                </form>
                <form action={deleteAction.bind(null, entry.id)}>
                  <Button type="submit" size="sm" variant="destructive">
                    Delete
                  </Button>
                </form>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
