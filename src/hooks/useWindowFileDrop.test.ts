import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useWindowFileDrop } from './useWindowFileDrop'

function createDropEvent(type: string, files: File[] = []) {
  const event = new Event(type, { bubbles: true, cancelable: true }) as unknown as DragEvent
  Object.defineProperty(event, 'dataTransfer', {
    value: { files },
  })
  return event
}

describe('useWindowFileDrop', () => {
  it('window への dragenter で isDraggingOver が true になり、dragleave で false に戻る', () => {
    const { result } = renderHook(() => useWindowFileDrop(() => {}))
    expect(result.current).toBe(false)

    act(() => {
      window.dispatchEvent(createDropEvent('dragenter'))
    })
    expect(result.current).toBe(true)

    act(() => {
      window.dispatchEvent(createDropEvent('dragleave'))
    })
    expect(result.current).toBe(false)
  })

  it('ネストした要素間の dragenter/dragleave ではちらつかない', () => {
    const { result } = renderHook(() => useWindowFileDrop(() => {}))

    act(() => {
      window.dispatchEvent(createDropEvent('dragenter'))
      window.dispatchEvent(createDropEvent('dragenter'))
    })
    expect(result.current).toBe(true)

    act(() => {
      window.dispatchEvent(createDropEvent('dragleave'))
    })
    expect(result.current).toBe(true)

    act(() => {
      window.dispatchEvent(createDropEvent('dragleave'))
    })
    expect(result.current).toBe(false)
  })

  it('drop でファイルが渡され、isDraggingOver が false に戻る', () => {
    const onFile = vi.fn()
    const file = new File(['content'], 'sample.md')
    const { result } = renderHook(() => useWindowFileDrop(onFile))

    act(() => {
      window.dispatchEvent(createDropEvent('dragenter'))
      window.dispatchEvent(createDropEvent('drop', [file]))
    })

    expect(onFile).toHaveBeenCalledWith(file)
    expect(result.current).toBe(false)
  })

  it('dragover と drop でブラウザの既定動作（ファイルを直接開く）を止める', () => {
    renderHook(() => useWindowFileDrop(() => {}))
    const dragOverEvent = createDropEvent('dragover')
    const dropEvent = createDropEvent('drop')
    const dragOverSpy = vi.spyOn(dragOverEvent, 'preventDefault')
    const dropSpy = vi.spyOn(dropEvent, 'preventDefault')

    act(() => {
      window.dispatchEvent(dragOverEvent)
      window.dispatchEvent(dropEvent)
    })

    expect(dragOverSpy).toHaveBeenCalled()
    expect(dropSpy).toHaveBeenCalled()
  })

  it('onFile が再生成されても window のリスナーは登録し直さない', () => {
    const addSpy = vi.spyOn(window, 'addEventListener')
    const { rerender } = renderHook(({ onFile }) => useWindowFileDrop(onFile), {
      initialProps: { onFile: () => {} },
    })
    const callCountAfterMount = addSpy.mock.calls.length

    rerender({ onFile: () => {} })
    rerender({ onFile: () => {} })

    expect(addSpy.mock.calls.length).toBe(callCountAfterMount)
    addSpy.mockRestore()
  })

  it('onFile が更新された後の drop では、更新後の onFile が呼ばれる', () => {
    const firstOnFile = vi.fn()
    const secondOnFile = vi.fn()
    const { rerender } = renderHook(({ onFile }) => useWindowFileDrop(onFile), {
      initialProps: { onFile: firstOnFile },
    })

    rerender({ onFile: secondOnFile })

    const file = new File(['content'], 'sample.md')
    act(() => {
      window.dispatchEvent(createDropEvent('drop', [file]))
    })

    expect(firstOnFile).not.toHaveBeenCalled()
    expect(secondOnFile).toHaveBeenCalledWith(file)
  })
})
