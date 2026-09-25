import { DocsSidebar } from "@/components/docs/docs-sidebar"
import { DocsPager } from "@/components/docs/docs-pager"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden border-r py-8 pr-4 md:block">
          <div className="sticky top-20">
            <DocsSidebar />
          </div>
        </aside>
        <main className="py-8">
          {children}
          <DocsPager />
        </main>
      </div>
    </div>
  )
}
