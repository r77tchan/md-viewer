import { Prose } from '@heroui/react'
import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import { highlightAliases, highlightLanguages } from '../lib/highlightLanguages'

type MarkdownViewerProps = {
  content: string
}

const components: Components = {
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto">
      <table>{children}</table>
    </div>
  ),
  p: ({ node, className, ...props }) => {
    const meaningfulChildren = node?.children.filter(
      (child) => !(child.type === 'text' && child.value.trim() === ''),
    )
    const isImageOnly =
      meaningfulChildren?.length === 1 &&
      meaningfulChildren[0].type === 'element' &&
      meaningfulChildren[0].tagName === 'img'
    return <p className={isImageOnly ? 'image-only' : className} {...props} />
  },
}

export function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <Prose className="mx-auto w-full max-w-3xl">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          [rehypeHighlight, { languages: highlightLanguages, aliases: highlightAliases }],
        ]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </Prose>
  )
}
