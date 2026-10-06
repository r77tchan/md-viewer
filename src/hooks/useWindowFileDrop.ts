import { useEffect, useRef, useState } from 'react'

export function useWindowFileDrop(onFile: (file: File) => void): boolean {
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const onFileRef = useRef(onFile)

  useEffect(() => {
    onFileRef.current = onFile
  }, [onFile])

  useEffect(() => {
    let dragDepth = 0

    function handleDragEnter(e: DragEvent) {
      e.preventDefault()
      dragDepth += 1
      setIsDraggingOver(true)
    }
    function handleDragOver(e: DragEvent) {
      e.preventDefault()
    }
    function handleDragLeave(e: DragEvent) {
      e.preventDefault()
      dragDepth -= 1
      if (dragDepth <= 0) {
        dragDepth = 0
        setIsDraggingOver(false)
      }
    }
    function handleDrop(e: DragEvent) {
      e.preventDefault()
      dragDepth = 0
      setIsDraggingOver(false)
      const file = e.dataTransfer?.files?.[0]
      if (file) onFileRef.current(file)
    }

    window.addEventListener('dragenter', handleDragEnter)
    window.addEventListener('dragover', handleDragOver)
    window.addEventListener('dragleave', handleDragLeave)
    window.addEventListener('drop', handleDrop)
    return () => {
      window.removeEventListener('dragenter', handleDragEnter)
      window.removeEventListener('dragover', handleDragOver)
      window.removeEventListener('dragleave', handleDragLeave)
      window.removeEventListener('drop', handleDrop)
    }
  }, [])

  return isDraggingOver
}
