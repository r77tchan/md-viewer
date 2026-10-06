import { useId, useState } from 'react'
import type { MouseEvent } from 'react'
import type { TocItem } from '../lib/toc'

type TableOfContentsProps = {
  items: TocItem[]
}

const INDENT_CLASS = { 1: '', 2: 'ps-3', 3: 'ps-6' } as const

export function TableOfContents({ items }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const listId = useId()

  if (items.length === 0) return null

  function jumpTo(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault()
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
    setIsOpen(false)
  }

  return (
    <nav
      aria-label="目次"
      className="mb-6 xl:order-2 xl:mb-0 xl:sticky xl:top-6 xl:max-h-[calc(100vh-3rem)] xl:self-start xl:overflow-y-auto"
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={listId}
        onClick={() => setIsOpen((open) => !open)}
        className="rounded-lg border border-border px-3 py-2 text-sm font-medium xl:hidden"
      >
        目次
      </button>
      <p className="mb-2 hidden text-sm font-bold xl:block">目次</p>
      <ul
        id={listId}
        className={`${isOpen ? 'block' : 'hidden'} mt-2 space-y-1 text-sm xl:mt-0 xl:block`}
      >
        {items.map((item) => (
          <li key={item.id} className={INDENT_CLASS[item.level]}>
            <a
              href={`#${item.id}`}
              onClick={(event) => jumpTo(event, item.id)}
              className="block rounded px-2 py-1 text-muted hover:bg-surface-secondary hover:text-foreground"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
