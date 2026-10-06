import { describe, expect, it } from 'vitest'
import { buildToc } from './toc'

describe('buildToc', () => {
  it('h1〜h3 を出現順に取り、h4 以降は含めない', () => {
    const toc = buildToc('# A\n\n## B\n\n### C\n\n#### D\n\n## E')
    expect(toc.map((item) => [item.level, item.text])).toEqual([
      [1, 'A'],
      [2, 'B'],
      [3, 'C'],
      [2, 'E'],
    ])
  })

  it('同じ文言の見出しでも ID が異なる', () => {
    const toc = buildToc('## 概要\n\n## 詳細\n\n## 概要')
    expect(toc.map((item) => item.text)).toEqual(['概要', '詳細', '概要'])
    expect(new Set(toc.map((item) => item.id)).size).toBe(3)
  })

  it('引用やリストの中の見出しも拾う', () => {
    const toc = buildToc('> ## 引用内\n\n- ### リスト内')
    expect(toc.map((item) => item.text)).toEqual(['引用内', 'リスト内'])
  })

  it('インライン装飾を除いた文字列にする', () => {
    const toc = buildToc('# **太字** と `code` と [リンク](https://example.com)')
    expect(toc[0].text).toBe('太字 と code と リンク')
  })

  it('見出し内の生 HTML は含めない', () => {
    const toc = buildToc('# 前<b>後</b>')
    expect(toc[0].text).toBe('前後')
  })

  it('コードフェンス内の # は拾わない', () => {
    expect(buildToc('```\n# コメント\n```')).toEqual([])
  })

  it('setext 形式の見出しを拾う', () => {
    const toc = buildToc('大見出し\n=====\n\n中見出し\n-----')
    expect(toc.map((item) => [item.level, item.text])).toEqual([
      [1, '大見出し'],
      [2, '中見出し'],
    ])
  })

  it('空の見出しは除く', () => {
    expect(buildToc('#\n\n## 本物')).toHaveLength(1)
  })

  it('見出しがなければ空配列を返す', () => {
    expect(buildToc('ただの段落')).toEqual([])
  })
})
