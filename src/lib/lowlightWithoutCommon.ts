// rehype-highlight は既定値として lowlight の common（37 言語）を import するため、
// languages を渡してもバンドルに全部入ってしまう。common を空にした lowlight に差し替える。
export { createLowlight } from '../../node_modules/lowlight/lib/index.js'
export const common = {}
