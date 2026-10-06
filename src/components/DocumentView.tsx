import { useMemo } from 'react'
import { buildToc } from '../lib/toc'
import { MarkdownViewer } from './MarkdownViewer'
import { TableOfContents } from './TableOfContents'

type DocumentViewProps = {
  content: string
}

export function DocumentView({ content }: DocumentViewProps) {
  const tocItems = useMemo(() => buildToc(content), [content])

  return (
    <div className="xl:mx-auto xl:grid xl:w-full xl:grid-cols-[minmax(0,48rem)_16rem] xl:justify-center xl:gap-8">
      <TableOfContents items={tocItems} />
      <MarkdownViewer content={content} />
    </div>
  )
}
