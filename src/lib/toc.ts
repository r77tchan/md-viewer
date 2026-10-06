import type { Nodes, Root } from 'mdast'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'

export type TocItem = {
  id: string
  level: 1 | 2 | 3
  text: string
}

const MAX_TOC_DEPTH = 3

export function headingId(offset: number): string {
  return `md-heading-${offset}`
}

function textOf(node: Nodes): string {
  if (node.type === 'text' || node.type === 'inlineCode') return node.value
  if (node.type === 'break') return ' '
  if ('children' in node) return node.children.map(textOf).join('')
  return ''
}

function collect(node: Nodes, items: TocItem[]) {
  if (node.type === 'heading') {
    const offset = node.position?.start.offset
    const text = textOf(node).trim()
    if (node.depth <= MAX_TOC_DEPTH && offset !== undefined && text !== '') {
      items.push({ id: headingId(offset), level: node.depth as TocItem['level'], text })
    }
    return
  }
  if ('children' in node) {
    for (const child of node.children) collect(child, items)
  }
}

const processor = unified().use(remarkParse).use(remarkGfm)

export function buildToc(markdown: string): TocItem[] {
  const tree = processor.parse(markdown) as Root
  const items: TocItem[] = []
  collect(tree, items)
  return items
}
