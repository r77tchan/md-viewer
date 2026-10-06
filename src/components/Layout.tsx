import type { ReactNode } from 'react'
import { ThemeToggle } from './ThemeToggle'

type LayoutProps = {
  children: ReactNode
  headerActions?: ReactNode
}

export function Layout({ children, headerActions }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
        <h1 className="text-xl font-bold">md-viewer</h1>
        <div className="flex items-center gap-4">
          {headerActions}
          <ThemeToggle />
        </div>
      </header>
      <main className="flex flex-1 flex-col p-6">{children}</main>
    </div>
  )
}
