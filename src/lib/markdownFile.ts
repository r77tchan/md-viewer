const MARKDOWN_EXTENSIONS = ['.md', '.markdown']

export function isMarkdownFileName(name: string): boolean {
  const lowerName = name.toLowerCase()
  return MARKDOWN_EXTENSIONS.some((ext) => lowerName.endsWith(ext))
}

export function readMarkdownFile(file: File): Promise<string> {
  return file.text()
}
