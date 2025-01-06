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
}
