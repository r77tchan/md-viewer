export function DropOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center border-4 border-dashed border-accent bg-accent-soft">
      <p className="text-xl font-semibold text-foreground">ここにドロップしてファイルを開く</p>
    </div>
  )
}
