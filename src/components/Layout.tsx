import type { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-bold">md-viewer</h1>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
