import { listDrafts } from '@/lib/digest';
import { publishAction, deleteAction } from '@/actions/admin';

export default async function AdminPage() {
  const drafts = await listDrafts();

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8">
      <h1 className="text-lg font-semibold">Drafts</h1>

      {drafts.length === 0 ? (
        <p className="mt-6 text-sm text-foreground/60">No drafts.</p>
      ) : (
        <div className="mt-6 flex flex-col gap-6">
          {drafts.map((entry) => (
            <div key={entry.id} className="flex flex-col gap-2 border-b border-foreground/10 pb-6">
              <h2 className="text-[15px] font-medium leading-snug">{entry.title}</h2>
              <p className="text-xs text-foreground/45">{entry.topic}</p>
              <p className="text-[13px] leading-relaxed text-foreground/70">{entry.summary}</p>

              {entry.buildIdea && (
                <p className="text-xs leading-relaxed text-foreground/70">
                  <span className="font-medium text-foreground">Build idea — </span>
                  {entry.buildIdea}
                </p>
              )}

              {entry.links.length > 0 && (
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
                  {entry.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline decoration-foreground/20 underline-offset-4 hover:decoration-foreground"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}

              <div className="flex gap-4 pt-2">
                <form action={publishAction.bind(null, entry.id)}>
                  <button type="submit" className="text-xs font-medium text-foreground underline underline-offset-4">
                    Publish
                  </button>
                </form>
                <form action={deleteAction.bind(null, entry.id)}>
                  <button type="submit" className="text-xs font-medium text-foreground/60 underline underline-offset-4">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
