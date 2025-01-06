import { createGenerator } from 'unocss'
import { describe, expect, it } from 'vitest'
import { presetGrid } from '../src/index'

describe('preset-dark-mode-theme', () => {
  it('basic', async () => {
    const uno = await createGenerator({
      presets: [
        presetGrid()
      ],
    })
    const { css: noPreflightCSS } = await uno.generate('flex-container')
    expect(noPreflightCSS).toMatchSnapshot()
  })

  it('media dark mode', async () => {
    const uno = await createGenerator({
      presets: [
        presetGrid()
      ],
    })
    const { css: noPreflightCSS } = await uno.generate('flex-container')
    expect(noPreflightCSS).toMatchSnapshot()
  })
})