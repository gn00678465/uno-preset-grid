const remRE = /(-?[.\d]+)rem/g

const pxRE = /(-?[.\d]+)px/g

/**
 * 將 rem 轉換為 px
 * @param size 
 * @param baseFontSize 
 * @returns 
 */
export function convertRemToPx(size: string, baseFontSize = 16) {
  if (typeof size === 'string' && remRE.test(size)){
    return size.replace(remRE, (_, p1) => `${p1 * baseFontSize}px`)
  }
  return size
}

/**
 * 將 px 轉換為 rem
 * @param size 
 * @param baseFontSize 
 * @returns 
 */
export function convertPxToRem(size: string, baseFontSize = 16) {
  if (typeof size === 'string' && pxRE.test(size)){
    return size.replace(pxRE, (_, p1) => `${p1 / baseFontSize}rem`)
  }
  return size
}

/**
 * 轉換長度單位
 * @param size 
 * @param unit 
 * @param baseFontSize 
 * @returns 
 */
export function convertLenUnit(size: string, unit: 'px' | 'rem', baseFontSize = 16) {
  if (unit === 'px') return convertRemToPx(size, baseFontSize)
  if (unit === 'rem') return convertPxToRem(size, baseFontSize)
  return size
}

export function convertBreakpointSize(size: string | number, baseFontSize = 16) {
  if (typeof size === 'number') return size
  const _px = convertLenUnit(size, 'px', baseFontSize)
  if (_px.endsWith('px')) return parseInt(_px.replace('px', ''))
  return 0
}

export function getBreakpointEntries(breakpoints: Record<string, string>, baseFontSize = 16) {
  return Object.entries(breakpoints)
  .map(([k, v]) => [k, convertBreakpointSize(v, baseFontSize)])
  .filter(([, v]) => !!v)
  .sort(([, a], [, b]) => (b as number) - (a as number)) as([string, number])[]
}