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
}
