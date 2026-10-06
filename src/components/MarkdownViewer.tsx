import { Prose } from '@heroui/react'
import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { headingId } from '../lib/toc'

type MarkdownViewerProps = {
  content: string
}

function tocHeading(Tag: 'h1' | 'h2' | 'h3'): Components['h1'] {
  return ({ node, className, ...props }) => {
    const offset = node?.position?.start.offset
    return (
      <Tag
        id={offset === undefined ? undefined : headingId(offset)}
        className={['scroll-mt-4', className].filter(Boolean).join(' ')}
        {...props}
      />
    )
  }
}

const components: Components = {
  h1: tocHeading('h1'),
  h2: tocHeading('h2'),
  h3: tocHeading('h3'),
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
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </Prose>
  )
}
