import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('ヘッダーにアプリ名を表示する', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'md-viewer' })).toBeInTheDocument()
  })

  it('HeroUI の Button を表示する', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: 'ファイルを開く（準備中）' })).toBeInTheDocument()
  })
})
