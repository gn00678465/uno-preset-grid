import { toEscapedSelector as e } from 'unocss'
import type { Preset } from 'unocss'
import type { Theme } from "unocss/preset-mini"
import type { GridOptions } from "./type"
import { getBreakpointEntries } from './utils'

export function presetGrid (options: GridOptions = {}): Preset {
  const columns = options?.columns ?? 12
  const gutter = options?.gutter ?? 24
  const variablePrefix = options?.variablePrefix ?? 'un-'
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
      [
        new RegExp(`^${containerClassName}$`),
        function*(_, { generator, symbols }) {
          const _breakpoints = (generator?.userConfig?.theme as Theme)?.breakpoints ?? breakpoints
          const _breakpointEntries = getBreakpointEntries(_breakpoints)
          yield {
            [`--${variablePrefix}gutter-x`]: `${gutter / 2}px`,
            [`--${variablePrefix}gutter-y`]: '0px',
            width: '100%',
            'padding-right': `var(--${variablePrefix}gutter-x, .75rem)`,
            'padding-left': `var(--${variablePrefix}gutter-x, .75rem)`,
            'margin-right': 'auto',
            'margin-left': 'auto'
          }
          yield {
            [symbols.selector]: selector => `${selector}-fluid`,
            [`--${variablePrefix}gutter-x`]: `${gutter / 2}px`,
            [`--${variablePrefix}gutter-y`]: '0px',
            width: '100%',
            'padding-right': `var(--${variablePrefix}gutter-x, .75rem)`,
            'padding-left': `var(--${variablePrefix}gutter-x, .75rem)`,
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
      [
        new RegExp(`^${rowClassName}$`),
        function(_, { rawSelector }) {
          const _selector = e(rawSelector)
          return `
          ${_selector} {
            --${variablePrefix}gutter-x: ${gutter / 2}px;
            --${variablePrefix}gutter-y: 0px;
            display: flex;
            flex-wrap: wrap;
            margin-top: calc(var(--${variablePrefix}gutter-y, 0px) * -1);
            margin-right: calc(var(--${variablePrefix}gutter-x, .75rem) / -2);
            margin-left: calc(var(--${variablePrefix}gutter-x, .75rem) / -2);
            & > * {
              flex-shrink: 0;
              width: 100%;
              max-width: 100%;
              padding-right: calc(var(--${variablePrefix}gutter-x, .75rem) / 2);
              padding-left: calc(var(--${variablePrefix}gutter-x, .75rem) / 2);
              margin-top: var(--${variablePrefix}gutter-y, 0px) ;
            }
          }
          `
        }
      ],
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
      ]
    ],
  }
}
