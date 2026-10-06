import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { DocumentView } from './DocumentView'

const CONTENT = '# 題\n\n## 概要\n\n本文\n\n## 詳細\n\n### 概要\n\n#### 深い見出し'

describe('DocumentView', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('h1〜h3 の項目だけを目次に出す', () => {
    render(<DocumentView content={CONTENT} />)
    const nav = screen.getByRole('navigation', { name: '目次' })
    expect(nav.querySelectorAll('a')).toHaveLength(4)
  })

  it('同文言の見出しでも、クリックした項目に対応する見出しへスクロールする', async () => {
    const user = userEvent.setup()
    const scrolled: Element[] = []
    vi.spyOn(Element.prototype, 'scrollIntoView').mockImplementation(function (this: Element) {
      scrolled.push(this)
    })
    render(<DocumentView content={CONTENT} />)
    const nav = screen.getByRole('navigation', { name: '目次' })
    const links = Array.from(nav.querySelectorAll('a')).filter((a) => a.textContent === '概要')
    const headings = screen.getAllByRole('heading', { name: '概要' })
    expect(links).toHaveLength(2)

    await user.click(links[0])
    await user.click(links[1])

    expect(scrolled).toEqual([headings[0], headings[1]])
  })

  it('目次を開閉でき、項目を選ぶと閉じる', async () => {
    const user = userEvent.setup()
    render(<DocumentView content={CONTENT} />)
    const toggle = screen.getByRole('button', { name: '目次' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')

    await user.click(screen.getByRole('link', { name: '詳細' }))
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('見出しがなければ目次を出さない', () => {
    render(<DocumentView content="ただの段落" />)
    expect(screen.queryByRole('navigation', { name: '目次' })).toBeNull()
    expect(screen.getByText('ただの段落')).toBeInTheDocument()
  })
})
