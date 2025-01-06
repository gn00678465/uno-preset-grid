import { definePreset } from "unocss"
import type { Theme } from "unocss/preset-mini"
import type { GridOptions } from "./type"
import { convertBreakpointSize } from './utils'

export const presetGrid = definePreset((options: GridOptions = {}) => {
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

  return {
    name: 'uno-preset-grid',
    preflights: [
      {},
    ],
    rules: [
      [
        /^flex-container$/,
        function*(_, { symbols, generator }) {
          const _breakpoints = (generator?.userConfig?.theme as Theme)?.breakpoints ?? breakpoints
          const _breakpointEntries = Object.entries(_breakpoints)
            .map(([k, v]) => [k, convertBreakpointSize(v)])
            .filter(([, v]) => !!v)
            .sort(([, a], [, b]) => (b as number) - (a as number))

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
              'max-width': value
              
            }
          }
        }
      ],
      [
        /^row$/,
        () => { }
      ],
      [
        /^col-?(\\d*)$/,
        () => { }
      ]
    ]
  }
})
