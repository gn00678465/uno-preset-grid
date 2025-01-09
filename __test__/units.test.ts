import { describe, expect, it } from 'vitest'
import { mobileFirstBreakpointSort, convertLenUnit, convertRemToPx, convertPxToRem } from '../src/utils'

describe('utils', () => {
  it('convertRemToPx', () => {
    expect(convertRemToPx).toBeDefined()
    expect(convertRemToPx('1rem', 16)).toBe('16px')
    expect(convertRemToPx('1rem', 14)).toBe('14px')
    expect(convertRemToPx('16px', 14)).toBe('16px')
  })

  it('convertPxToRem', () => {
    expect(convertPxToRem).toBeDefined()
    expect(convertPxToRem('16px', 16)).toBe('1rem')
    expect(convertPxToRem('14px', 16)).toBe('0.875rem')
    expect(convertPxToRem('1rem', 14)).toBe('1rem')
  })

  it('convertLenUnit', () => {
    expect(convertLenUnit).toBeDefined()
    expect(convertLenUnit('16px', 'px')).toBe('16px')
    expect(convertLenUnit('16px', 'rem')).toBe('1rem')
    expect(convertLenUnit('1rem', 'rem')).toBe('1rem')
    expect(convertLenUnit('1rem', 'px')).toBe('16px')
    expect(convertLenUnit('1em', 'px')).toBe('1em')
  })

  it('mobileFirstBreakpointSort', () => {
    expect(mobileFirstBreakpointSort).toBeDefined()
    const breakpoint = {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    }
    expect(mobileFirstBreakpointSort(breakpoint)).toEqual([
      ['sm', 640],
      ['md', 768],
      ['lg', 1024],
      ['xl', 1280],
      ['2xl', 1536],
    ])

    const randomBreakpoint = {
      sm: '540px',
      md: '720px',
      lg: '960px',
      xl: '1140px',
      xxl: '1320px'
    }
    expect(mobileFirstBreakpointSort(randomBreakpoint)).toEqual([
      ['sm', 540],
      ['md', 720],
      ['lg', 960],
      ['xl', 1140],
      ['xxl', 1320],
    ])
  })
})