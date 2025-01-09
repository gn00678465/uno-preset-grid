export interface GridOptions {
  columns?: number
  breakpoints?: Record<string, string>
  gutter?: number
  piece?: number
  /**
   * Prefix for CSS variables.
   *
   * @default 'un-'
   * */
  variablePrefix?: string
  /**
   * 1rem = n px
   * @default 16
   */
  baseFontSize?: number
  /**
   * Length units
   * px | rem
   * @default 'px
   */
  lengthUnit?: 'px' | 'rem'
}
