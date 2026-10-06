import { Button } from '@heroui/react'
import { useRef } from 'react'
import type { ChangeEvent } from 'react'

type FileOpenButtonProps = {
  onOpen: (file: File) => void
}

export function FileOpenButton({ onOpen }: FileOpenButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (file) onOpen(file)
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".md,.markdown"
        className="hidden"
        onChange={handleChange}
      />
      <Button onPress={() => inputRef.current?.click()}>ファイルを開く</Button>
    </>
  )
}
