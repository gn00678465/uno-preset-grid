import { createGenerator } from 'unocss'
import { describe, expect, it } from 'vitest'
import { presetGrid } from '../src/index'

describe('preset-grid', () => {
  it('flex-container', async () => {
    const uno = await createGenerator({
      presets: [
        presetGrid()
      ],
    })
    const { css: noPreflightCSS } = await uno.generate('flex-container')
    expect(noPreflightCSS).toMatchSnapshot()
  })

  it('row', async () => {
    const uno = await createGenerator({
      presets: [
        presetGrid()
      ],
    })
    const { css: noPreflightCSS } = await uno.generate('row')
    expect(noPreflightCSS).toMatchSnapshot()
  })

  it('col', async () => {
    const uno = await createGenerator({
      presets: [
        presetGrid()
      ],
    })
    const { css: noPreflightCSS } = await uno.generate([
      'col',
      'col-1',
      'col-6',
      'col-12',
      'md:col-1',
      'md:col',
      'sm:col-12',
      'lg:col-6'
    ])
    expect(noPreflightCSS).toMatchSnapshot()
  })
})