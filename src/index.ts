import type { Preset } from 'unocss'
import type { Theme } from "unocss/preset-mini"
import type { GridOptions } from "./type"
import { getBreakpointEntries, convertLenUnit } from './utils'

export function presetGrid (options: GridOptions = {}): Preset {
  const {
    columns = 12,
    gutter = 24,
    variablePrefix = 'un-',
    baseFontSize = 16,
    lengthUnit = 'px'
  } = options
  const breakpoints = options?.breakpoints ?? {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
  const containerClassName = options?.containerClass ?? 'flex-container'
  const rowClassName = options?.rowClass ?? 'row'
  const colClassName = options?.colClass ?? 'col'

  return {
    name: 'uno-preset-grid',
    theme: {
      breakpoints
    },
    rules: [
      /** container */
      [
        new RegExp(`^${containerClassName}$`),
        function*(_, { generator, symbols }) {
          const _breakpoints = (generator?.userConfig?.theme as Theme)?.breakpoints ?? breakpoints
          const _breakpointEntries = getBreakpointEntries(_breakpoints)
          yield {
            [`--${variablePrefix}gutter-x`]: convertLenUnit(`${gutter}px`, lengthUnit, baseFontSize),
            [`--${variablePrefix}gutter-y`]: '0',
            width: '100%',
            'padding-right': `calc(var(--${variablePrefix}gutter-x) * 0.5)`,
            'padding-left': `calc(var(--${variablePrefix}gutter-x) * 0.5)`,
            'margin-right': 'auto',
            'margin-left': 'auto'
          }
          yield {
            [symbols.selector]: selector => `${selector}-fluid`,
            [`--${variablePrefix}gutter-x`]: convertLenUnit(`${gutter}px`, lengthUnit, baseFontSize),
            [`--${variablePrefix}gutter-y`]: '0',
            width: '100%',
            'padding-right': `calc(var(--${variablePrefix}gutter-x) * 0.5)`,
            'padding-left': `calc(var(--${variablePrefix}gutter-x) * 0.5)`,
            'margin-right': 'auto',
            'margin-left': 'auto'
          }

          for (const [, value] of _breakpointEntries) {
            yield {
              [symbols.parent]: `@media (min-width: ${value}px)`,
              'max-width': `${value}px`
            }
          }
        }
      ],
      /** row */
      [
        new RegExp(`^${rowClassName}$`),
        function*(_, { symbols }) {
          yield {
            [`--${variablePrefix}gutter-x`]: convertLenUnit(`${gutter}px`, lengthUnit, baseFontSize),
            [`--${variablePrefix}gutter-y`]: '0',
            display: 'flex',
            'flex-wrap': 'wrap',
            'margin-top': `calc(-1 * var(--${variablePrefix}gutter-y))`,
            'margin-right': `calc(-.5 * var(--${variablePrefix}gutter-x))`,
            'margin-left': `calc(-.5 * var(--${variablePrefix}gutter-x))`,
          }
          yield {
            [symbols.selector]: selector => `${selector} > *`,
            'flex-shrink': 0,
            width: '100%',
            'max-width': '100%',
            'padding-right': `calc(var(--${variablePrefix}gutter-x) * .5)`,
            'padding-left': `calc(var(--${variablePrefix}gutter-x) * .5)`,
            'margin-top': `var(--${variablePrefix}gutter-y)`
          }
        }
      ],
      /** col */
      [
        new RegExp(`^(\\w+)?:?${colClassName}-?(\\d*)$`),
        function*([_, breakpoint, size], { symbols, generator }) {
          const _breakpoints = (generator?.userConfig?.theme as Theme)?.breakpoints ?? breakpoints
          if (!breakpoint) {
            if (!size) {
              yield {
                flex: '1 0 0%'
              }
            }
            if (!isNaN(parseInt(size)) && parseInt(size) > 0 && parseInt(size) <= columns) {
              yield {
                [symbols.selector]: selector => `${selector}`,
                flex: '0 0 auto',
                width: `${(parseInt(size) / columns) * 100}%`
              }
            }
          }
          if (breakpoint && breakpoint in _breakpoints) {
            if (!isNaN(parseInt(size)) && parseInt(size) > 0 && parseInt(size) <= columns) {
              yield {
                [symbols.parent]: `@media (min-width: ${_breakpoints[breakpoint]})`,
                [symbols.selector]: selector => `${selector}`,
                flex: '0 0 auto',
                width: `${(parseInt(size) / columns) * 100}%`
              }
            }
            if (!size) {
              yield {
                [symbols.parent]: `@media (min-width: ${_breakpoints[breakpoint]})`,
                [symbols.selector]: selector => `${selector}`,
                flex: '1 0 0%'
              }
            }
          }
          return undefined
        }
      ],
      /** gutter */
      [
        new RegExp(`^g([xy])?-(\\d+)$`),
        ([, dim, size]) => {
          let gutterObject: { [key: string]: string } = {}
          if (dim !== "y") gutterObject[`--${variablePrefix}gutter-x`] = convertLenUnit(`${parseInt(size) * 16}px`, lengthUnit, baseFontSize)
          if (dim !== "x") gutterObject[`--${variablePrefix}gutter-y`] = convertLenUnit(`${parseInt(size) * 16}px`, lengthUnit, baseFontSize)
          return gutterObject
        },
        { autocomplete: ["g-<num>", "gx-<num>", "gy-<num>"] }
      ]
    ],
  }
}
