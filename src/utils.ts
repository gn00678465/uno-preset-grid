export function convertFromRem(size: string, rootFontSize = 16) {
  const _size = size.replace('rem', '')
  return parseInt(_size, 10) * rootFontSize
}

export function convertBreakpointSize(size: string | number, rootFontSize = 16) {
  if (typeof size === 'number') return size
  if (size.endsWith('px')) return parseInt(size.replace('px', ''))
  if (size.endsWith('rem')) return convertFromRem(size, rootFontSize)
  return 0
}

export function getBreakpointEntries(breakpoints: Record<string, string>) {
  return Object.entries(breakpoints)
  .map(([k, v]) => [k, convertBreakpointSize(v)])
  .filter(([, v]) => !!v)
  .sort(([, a], [, b]) => (b as number) - (a as number))
}