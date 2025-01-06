export function convertRem(size: string, rootFontSize = 16) {
  const _size = size.replace('rem', '')
  return parseInt(_size, 10) * rootFontSize
}

export function convertBreakpointSize(size: string | number, rootFontSize = 16) {
  if (typeof size === 'number') return size
  if (size.endsWith('px')) return parseInt(size.replace('px', ''))
  if (size.endsWith('rem')) return convertRem(size, rootFontSize)
  return 0
}