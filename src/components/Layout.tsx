import type { ReactNode } from 'react'
import { ThemeToggle } from './ThemeToggle'

type LayoutProps = {
  children: ReactNode
  headerActions?: ReactNode
}

export function Layout({ children, headerActions }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between gap-2 border-b border-border px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
        <h1 className="shrink-0 whitespace-nowrap text-xl font-bold">md-viewer</h1>
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          {headerActions}
          <div className="shrink-0">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col p-6">{children}</main>
    </div>
  )
}
