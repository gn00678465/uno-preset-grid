import { createGenerator, presetUno } from 'unocss'
import { describe, expect, it } from 'vitest'
import { presetGrid } from '../src/index'

describe('preset-grid', () => {
  it('generate flex-container', async () => {
    const uno = await createGenerator({
      presets: [
        presetGrid()
      ],
    })
    const { css: noPreflightCSS } = await uno.generate('flex-container')
    expect(noPreflightCSS).toMatchSnapshot()
  })

  it('generate row', async () => {
    const uno = await createGenerator({
      presets: [
        presetGrid()
      ],
    })
    const { css: noPreflightCSS } = await uno.generate('row')
    expect(noPreflightCSS).toMatchSnapshot()
  })

  it('generate col', async () => {
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
      'lg:col-6',
      'col-13',
      'xl:col-13'
    ])
    expect(noPreflightCSS).toMatchSnapshot()
  })

  it('custom class name', async () => {
    const uno = await createGenerator({
      presets: [
        presetGrid({
          containerClass: 'custom-container',
          rowClass: 'custom-row',
          colClass: 'custom-col'
        })
      ],
    })
    const { css: noPreflightCSS } = await uno.generate([
      'flex-container',
      'custom-container',
      'row',
      'custom-row',
      'col',
      'sm:col-2',
      'custom-col',
      'custom-col-1',
      'custom-col-12',
      'sm:custom-col-2',
      'md:custom-col-3',
      'lg:custom-col-4',
      'xl:custom-col-5'
    ])

    expect(noPreflightCSS).toMatchSnapshot()
  })

  it('with other breakpoints', async () => {
    const uno = await createGenerator({
      presets: [
        presetUno({
          theme: {
            breakpoints: {
              sm: '576px',
              md: '768px',
              lg: '992px',
              xl: '1200px',
              xxl: '1400px'
            }
          }
        }),
        presetGrid({
          breakpoints: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            xxl: '1400px'
          }
        })
      ],
    })

    const { css: noPreflightCSS } = await uno.generate([
      'flex-container',
      'row',
      'col',
      'col-1',
      'col-12',
      'sm:col-2',
      'md:col-3',
      'lg:col-4',
      'xl:col-5',
      'col-13'
    ])

    expect(noPreflightCSS).toMatchSnapshot()
  })
})