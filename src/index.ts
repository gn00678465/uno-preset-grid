import { toEscapedSelector as e, type Preset } from 'unocss'
import type { Theme } from "unocss/preset-mini"
import type { GridOptions } from "./type"
import { mobileFirstBreakpointSort, convertLenUnit } from './utils'

export function presetGrid (options: GridOptions = {}): Preset {
  const {
    columns = 12,
    gutter = 24,
    variablePrefix = 'un-',
    baseFontSize = 16,
    lengthUnit = 'px'
  } = options
  // Default breakpoints
  const maxWidth = options?.maxWidth ?? {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
  const breakpoints = options?.breakpoints ?? {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }

  const gutterXVar = `--${variablePrefix}gutter-x`
  const gutterYVar = `--${variablePrefix}gutter-y`
  const gutterXLen = `${gutter}px`

  return {
    name: 'uno-preset-grid',
    rules: [
      /** container */
      [
        new RegExp(`^flex-container$`),
        ([], { generator, rawSelector }) => {
          const _breakpoints = (generator?.userConfig?.theme as Theme)?.breakpoints ?? breakpoints
          const _breakpointEntries = mobileFirstBreakpointSort(_breakpoints)
          const _selector = e(rawSelector)

          let containerStyle = `
          ${_selector},
          ${_selector}-fluid {
            ${gutterXVar}: ${convertLenUnit(gutterXLen, lengthUnit, baseFontSize)};
            ${gutterYVar}: 0;
            width: 100%;
            padding-right: calc(var(${gutterXVar}) * 0.5);
            padding-left: calc(var(${gutterXVar}) * 0.5);
            margin-right: auto;
            margin-left: auto;
          }
          `
          _breakpointEntries.forEach(([breakpoint, value]) => {
            const width = maxWidth[breakpoint] || `${value}px`
            containerStyle += `
            @media (min-width: ${value}px) {
              ${_selector} {
                max-width: ${width};
              }
            }
            `
          })

          

          return containerStyle
        },
        { autocomplete: ['flex-container', 'flex-container-fluid'] }
      ],
      /** row */
      [
        new RegExp(`^row$`),
        function*(_, { symbols }) {
          yield {
            [gutterXVar]: gutterXLen,
            [gutterYVar]: '0',
            display: 'flex',
            'flex-wrap': 'wrap',
            'margin-top': `calc(-1 * var(${gutterYVar}))`,
            'margin-right': `calc(-.5 * var(${gutterXVar}))`,
            'margin-left': `calc(-.5 * var(${gutterXVar}))`,
          }
          yield {
            [symbols.selector]: selector => `${selector} > *`,
            'flex-shrink': 0,
            width: '100%',
            'max-width': '100%',
            'padding-right': `calc(var(${gutterXVar}) * .5)`,
            'padding-left': `calc(var(${gutterXVar}) * .5)`,
            'margin-top': `var(${gutterYVar})`
          }
        }
      ],
      /** col */
      [
        new RegExp(`^(\\w+)?:?col-?(\\d*)$`),
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
        },
        { autocomplete: ['col', 'col-<num>'] }
      ],
      /** gutter */
      [
        new RegExp(`^g([xy])?-(\\d+)$`),
        ([, dim, size]) => {
          let gutterObject: { [key: string]: string } = {}
          if (dim !== "y") gutterObject[gutterXVar] = `${parseInt(size) * 16}px`
          if (dim !== "x") gutterObject[gutterYVar] = `${parseInt(size) * 16}px`
          return gutterObject
        },
        { autocomplete: ["g-<num>", "gx-<num>", "gy-<num>"] }
      ]
    ],
    postprocess: (util) => {
      util.entries.forEach((i) => {
        const [property, value] = i
        if (property.startsWith(`--${variablePrefix}`) && typeof value === 'string') {
          i[1] = convertLenUnit(value, lengthUnit, baseFontSize)
        }
      })
    }
  }
}
