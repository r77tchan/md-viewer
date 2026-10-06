/// <reference types="node" />
import { render } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { MarkdownViewer } from './MarkdownViewer'

function renderCode(lang: string, code: string) {
  const fence = '```'
  const { container } = render(<MarkdownViewer content={`${fence}${lang}\n${code}\n${fence}`} />)
  const codeElement = container.querySelector('pre code')
  if (!codeElement) throw new Error('code 要素がない')
  return codeElement
}

const CASES: { lang: string; code: string; selector: string; token: string }[] = [
  { lang: 'js', code: 'const x = 1', selector: '.hljs-keyword', token: 'const' },
  { lang: 'javascript', code: 'const x = 1', selector: '.hljs-keyword', token: 'const' },
  { lang: 'ts', code: 'const x: number = 1', selector: '.hljs-keyword', token: 'const' },
  { lang: 'tsx', code: 'const x: number = 1', selector: '.hljs-keyword', token: 'const' },
  { lang: 'python', code: 'def f():\n    return 1', selector: '.hljs-keyword', token: 'def' },
  { lang: 'py', code: 'def f():\n    return 1', selector: '.hljs-keyword', token: 'def' },
  { lang: 'bash', code: 'if true; then echo hi; fi', selector: '.hljs-keyword', token: 'if' },
  { lang: 'sh', code: 'if true; then echo hi; fi', selector: '.hljs-keyword', token: 'if' },
  { lang: 'shell', code: 'if true; then echo hi; fi', selector: '.hljs-keyword', token: 'if' },
  { lang: 'json', code: '{"a": 1}', selector: '.hljs-attr', token: '"a"' },
  { lang: 'html', code: '<div class="a">x</div>', selector: '.hljs-tag', token: '<div class="a">' },
  { lang: 'css', code: 'a { color: red; }', selector: '.hljs-selector-tag', token: 'a' },
  { lang: 'markdown', code: '# 見出し', selector: '.hljs-section', token: '# 見出し' },
  { lang: 'md', code: '# 見出し', selector: '.hljs-section', token: '# 見出し' },
  { lang: 'yaml', code: 'key: value', selector: '.hljs-attr', token: 'key' },
  { lang: 'yml', code: 'key: value', selector: '.hljs-attr', token: 'key' },
  { lang: 'diff', code: '+追加\n-削除', selector: '.hljs-addition', token: '+追加' },
]

describe('コードのシンタックスハイライト', () => {
  it.each(CASES)('$lang のコードブロックを色分けする', ({ lang, code, selector, token }) => {
    const codeElement = renderCode(lang, code)
    expect(codeElement).toHaveClass('hljs')
    expect(codeElement.querySelector(selector)).toHaveTextContent(token)
    expect(codeElement.textContent).toBe(`${code}\n`)
  })

  it('言語の指定がないコードブロックは色分けせずそのまま表示する', () => {
    const codeElement = renderCode('', 'const x = 1')
    expect(codeElement.querySelector('[class*="hljs-"]')).toBeNull()
    expect(codeElement.textContent).toBe('const x = 1\n')
  })

  it('対応していない言語でも色分けせずそのまま表示する', () => {
    const codeElement = renderCode('foo-lang', 'const x = 1')
    expect(codeElement.querySelector('[class*="hljs-"]')).toBeNull()
    expect(codeElement.textContent).toBe('const x = 1\n')
  })

  it('対応言語に含めていない言語（go など）は色分けしない', () => {
    const codeElement = renderCode('go', 'func main() {}')
    expect(codeElement.querySelector('[class*="hljs-"]')).toBeNull()
  })

  it('インラインコードは色分けの対象にしない', () => {
    const { container } = render(<MarkdownViewer content={'文中の `const x = 1` です'} />)
    expect(container.querySelector('code')).not.toHaveClass('hljs')
    expect(container.querySelector('code [class*="hljs-"]')).toBeNull()
  })

  it('ライトとダークで同じ配色変数を定義している', () => {
    const css = readFileSync('src/styles/globals.css', 'utf-8')
    const names = (block: string) =>
      [...block.matchAll(/(--hl-[a-z-]+):/g)].map((m) => m[1]).sort()
    const light = css.match(/:root\s*{([^}]*--hl-[^}]*)}/)?.[1]
    const dark = css.match(/\.dark,\s*\[data-theme="dark"\]\s*{([^}]*--hl-[^}]*)}/)?.[1]
    expect(light).toBeDefined()
    expect(dark).toBeDefined()
    expect(names(dark!)).toEqual(names(light!))
    expect(names(light!).length).toBeGreaterThan(0)
  })
})
