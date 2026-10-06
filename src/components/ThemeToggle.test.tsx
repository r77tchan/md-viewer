import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ThemeToggle } from './ThemeToggle'

function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    mockMatchMedia(false)
  })

  it('OS がダーク設定のとき、初回表示からダークになる', () => {
    mockMatchMedia(true)
    render(<ThemeToggle />)

    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('ボタンを押すとライトとダークが切り替わる', () => {
    render(<ThemeToggle />)

    expect(document.documentElement.classList.contains('light')).toBe(true)

    fireEvent.click(screen.getByRole('button'))

    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')

    fireEvent.click(screen.getByRole('button'))

    expect(document.documentElement.classList.contains('light')).toBe(true)
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('選んだテーマは localStorage に保存され、再読み込み後も維持される', () => {
    const { unmount } = render(<ThemeToggle />)

    fireEvent.click(screen.getByRole('button'))
    expect(localStorage.getItem('heroui-theme')).toBe('dark')

    unmount()
    render(<ThemeToggle />)

    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})
