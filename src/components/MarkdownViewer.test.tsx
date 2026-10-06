import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MarkdownViewer } from './MarkdownViewer'

const SAMPLE_MARKDOWN = `# 見出し

- リスト項目1
- リスト項目2

| 列A | 列B |
| --- | --- |
| 1 | 2 |

- [x] 完了したタスク
- [ ] 未完了のタスク

\`\`\`js
const x = 1
\`\`\`

> 引用文

[リンク](https://example.com)

![代替テキスト](https://example.com/image.png)

~~取り消し線~~
`

describe('MarkdownViewer', () => {
  it('見出しを表示する', () => {
    render(<MarkdownViewer content={SAMPLE_MARKDOWN} />)
    expect(screen.getByRole('heading', { name: '見出し' })).toBeInTheDocument()
  })

  it('リストを表示する', () => {
    render(<MarkdownViewer content={SAMPLE_MARKDOWN} />)
    expect(screen.getByText('リスト項目1')).toBeInTheDocument()
    expect(screen.getByText('リスト項目2')).toBeInTheDocument()
  })

  it('表を表示する', () => {
    render(<MarkdownViewer content={SAMPLE_MARKDOWN} />)
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByText('列A')).toBeInTheDocument()
  })

  it('チェックリストを表示する', () => {
    render(<MarkdownViewer content={SAMPLE_MARKDOWN} />)
    const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[]
    expect(checkboxes).toHaveLength(2)
    expect(checkboxes[0].checked).toBe(true)
    expect(checkboxes[1].checked).toBe(false)
  })

  it('コードブロックを表示する', () => {
    render(<MarkdownViewer content={SAMPLE_MARKDOWN} />)
    expect(screen.getByText('const x = 1')).toBeInTheDocument()
  })

  it('引用を表示する', () => {
    render(<MarkdownViewer content={SAMPLE_MARKDOWN} />)
    expect(screen.getByText('引用文')).toBeInTheDocument()
  })

  it('リンクを表示する', () => {
    render(<MarkdownViewer content={SAMPLE_MARKDOWN} />)
    expect(screen.getByRole('link', { name: 'リンク' })).toHaveAttribute(
      'href',
      'https://example.com',
    )
  })

  it('画像を表示する', () => {
    render(<MarkdownViewer content={SAMPLE_MARKDOWN} />)
    expect(screen.getByRole('img', { name: '代替テキスト' })).toHaveAttribute(
      'src',
      'https://example.com/image.png',
    )
  })

  it('取り消し線を表示する', () => {
    const { container } = render(<MarkdownViewer content={SAMPLE_MARKDOWN} />)
    expect(container.querySelector('del')).toHaveTextContent('取り消し線')
  })

  it('Markdown 内の生の HTML をレンダリングしない', () => {
    const { container } = render(
      <MarkdownViewer content={'<script>window.xssTriggered = true</script>\n\n見える文'} />,
    )
    expect(container.querySelector('script')).toBeNull()
    expect(screen.getByText('見える文')).toBeInTheDocument()
  })

  it('危険な属性を持つ HTML タグをレンダリングしない', () => {
    const { container } = render(
      <MarkdownViewer content={'<img src="x" onerror="window.xssTriggered = true">'} />,
    )
    expect(container.querySelector('img[onerror]')).toBeNull()
  })
})
