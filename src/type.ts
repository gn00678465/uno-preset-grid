export interface GridOptions {
  columns?: number
  breakpoints?: Record<string, string>
  gutter?: number
  /**
   * Prefix for CSS variables.
   *
   * @default 'un-'
   * */
  variablePrefix?: string
  /**
   * container class name.
   *
   * @default 'flex-container'
   * */
  containerClass?: string
  /**
   * row class name.
   *
   * @default 'row'
   * */
  rowClass?: string
  /**
   * column class name.
   *
   * @default 'col'
   * */
  colClass?: string
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
