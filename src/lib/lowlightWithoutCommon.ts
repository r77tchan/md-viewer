// rehype-highlight は既定値として lowlight の common（37 言語）を import するため、
// languages を渡してもバンドルに全部入ってしまう。common を空にした lowlight に差し替える。
// lowlight は exports で内部ファイルを公開していないので、直接の依存として node_modules 直下に置いた上で相対パスで import する。
export { createLowlight } from '../../node_modules/lowlight/lib/index.js'
export const common = {}
