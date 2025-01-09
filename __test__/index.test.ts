import { createGenerator } from 'unocss'
import { describe, expect, it } from 'vitest'
import { presetGrid } from '../src/index'

describe('preset-grid', () => {
  it('generate flex-container', async () => {
    const uno = await createGenerator({
      presets: [
        presetGrid()
      ],
    })
    const { css: containerCss } = await uno.generate([
      'flex-container',
      'flex-container-fluid',
      'lg:flex-container'
    ])
    expect(containerCss).toMatchSnapshot()
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

  it('generate gutter', async () => {
    const uno = await createGenerator({
      presets: [
        presetGrid()
      ],
    })
    const { css: noPreflightCSS } = await uno.generate(['gy-1', 'g-12', 'gx-6', 'gx-0', 'gy-0'])
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

  it('generate gutter', async () => {
    const uno = await createGenerator({
      presets: [
        presetGrid()
      ],
    })
    const { css: noPreflightCSS } = await uno.generate([
      'g-1',
      'gx-3',
      'gy-6'
    ])
    expect(noPreflightCSS).toMatchSnapshot()
  })

  it('different length unit', async () => {
    const uno = await createGenerator({
      presets: [
        presetGrid({
          lengthUnit: 'rem',
          baseFontSize: 16
        })
      ],
    })
    const { css: noPreflightCSS } = await uno.generate([
      'flex-container',
      'flex-container-fluid',
      'row',
      'col',
      'col-1',
      'col-12',
      'md:col',
      'sm:col-12',
      'lg:col-6',
      'g-1',
      'gx-3',
      'gy-6'
    ])
    expect(noPreflightCSS).toMatchSnapshot()
  })

  it('different prefix', async () => {
    const uno = await createGenerator({
      presets: [
        presetGrid({
          lengthUnit: 'rem',
          baseFontSize: 16,
          variablePrefix: 'test-'
        })
      ],
    })
    const { css: noPreflightCSS } = await uno.generate([
      'flex-container',
      'flex-container-fluid',
      'row',
      'col',
      'col-1',
      'col-12',
      'md:col',
      'sm:col-12',
      'lg:col-6',
      'g-1',
      'gx-3',
      'gy-6'
    ])
    expect(noPreflightCSS).toMatchSnapshot()
  })

  it('bootstrap container config', async () => {
    const uno = await createGenerator({
      presets: [
        presetGrid({
          lengthUnit: 'rem',
          baseFontSize: 16,
          variablePrefix: 'bs-',
          breakpoints: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            xxl: '1400px'
          },
          maxWidth: {
            sm: '540px',
            md: '720px',
            lg: '960px',
            xl: '1140px',
            xxl: '1320px'
          }
        })
      ],
    })
    const { css: bsContainer } = await uno.generate([
      'flex-container',
      'flex-container-fluid'
    ])
    expect(bsContainer).toMatchSnapshot()
  })

  it('with other breakpoints', async () => {
    const uno = await createGenerator({
      presets: [
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