import { Alert } from '@heroui/react'
import { useState } from 'react'
import { DropOverlay } from './components/DropOverlay'
import { EmptyState } from './components/EmptyState'
import { FileOpenButton } from './components/FileOpenButton'
import { Layout } from './components/Layout'
import { DocumentView } from './components/DocumentView'
import { useWindowFileDrop } from './hooks/useWindowFileDrop'
import { isMarkdownFileName, readMarkdownFile } from './lib/markdownFile'

type OpenedDocument = {
  fileName: string
  content: string
}

function App() {
  const [openedDocument, setOpenedDocument] = useState<OpenedDocument | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function openFile(file: File) {
    if (!isMarkdownFileName(file.name)) {
      setErrorMessage(`"${file.name}" は Markdown ファイル（.md / .markdown）ではありません。`)
      return
    }
    try {
      const content = await readMarkdownFile(file)
      setOpenedDocument({ fileName: file.name, content })
      setErrorMessage(null)
    } catch {
      setErrorMessage(`"${file.name}" を読み込めませんでした。`)
    }
  }

  const isDraggingOver = useWindowFileDrop(openFile)

  return (
    <>
      <Layout
        headerActions={
          <>
            <FileOpenButton onOpen={openFile} />
            {openedDocument && (
              <span className="min-w-0 truncate" title={openedDocument.fileName}>
                {openedDocument.fileName}
              </span>
            )}
          </>
        }
      >
        {errorMessage && (
          <Alert status="danger" className="mb-4">
            {errorMessage}
          </Alert>
        )}
        {openedDocument ? <DocumentView key={openedDocument.fileName} content={openedDocument.content} /> : <EmptyState />}
      </Layout>
      {isDraggingOver && <DropOverlay />}
    </>
  )
}

export default App
