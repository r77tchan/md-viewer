import type { ReactNode } from 'react'
import { ThemeToggle } from './ThemeToggle'

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b border-separator px-6 py-4">
        <h1 className="text-xl font-bold">md-viewer</h1>
        <ThemeToggle />
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
