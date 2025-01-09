export interface GridOptions<Breakpoint extends string = string> {
  /**
   * @default 12
   */
  columns?: number
  breakpoints?: Record<Breakpoint, string>
  maxWidth?: Record<Breakpoint, string>
  /**
   * @default 24
   * px
   */
  gutter?: number
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
