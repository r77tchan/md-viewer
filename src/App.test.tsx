import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('ヘッダーにアプリ名を表示する', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'md-viewer' })).toBeInTheDocument()
  })

  it('ファイルを開くボタンを表示する', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: 'ファイルを開く' })).toBeInTheDocument()
  })

  it('ファイルを開く前は案内を表示する', () => {
    render(<App />)
    expect(screen.getByText(/ドラッグ＆ドロップしてください/)).toBeInTheDocument()
  })

  it('.md ファイルを選ぶと、ファイル名と内容が表示される', async () => {
    const user = userEvent.setup()
    render(<App />)

    const file = new File(['# 見出し'], 'note.md', { type: 'text/markdown' })
    const input = document.querySelector('input[type="file"]') as HTMLInputElement
    await user.upload(input, file)

    expect(await screen.findByText('note.md')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '見出し' })).toBeInTheDocument()
  })

  it('大文字小文字が混在した拡張子（.MD）のファイルも開ける', async () => {
    const user = userEvent.setup()
    render(<App />)

    const file = new File(['# 見出し'], 'README.MD', { type: 'text/markdown' })
    const input = document.querySelector('input[type="file"]') as HTMLInputElement
    await user.upload(input, file)

    expect(await screen.findByText('README.MD')).toBeInTheDocument()
  })

  it('Markdown 以外の拡張子のファイルを選ぶと、分かるメッセージを表示する', async () => {
    render(<App />)

    // userEvent.upload は input の accept 属性で .txt を拒否してしまうため、
    // ドラッグ＆ドロップ等で accept の制約を受けずに渡されるケースを想定し change イベントを直接発火する
    const file = new File(['plain text'], 'note.txt', { type: 'text/plain' })
    const input = document.querySelector('input[type="file"]') as HTMLInputElement
    fireEvent.change(input, { target: { files: [file] } })

    expect(
      await screen.findByText('"note.txt" は Markdown ファイル（.md / .markdown）ではありません。'),
    ).toBeInTheDocument()
  })
})
