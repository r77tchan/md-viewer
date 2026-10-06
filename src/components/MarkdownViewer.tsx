import { Prose } from '@heroui/react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type MarkdownViewerProps = {
  content: string
}

export function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <Prose>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </Prose>
  )
}
