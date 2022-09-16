import { beforeEach, describe, expect, it, vi } from 'vitest'
import { isFunction } from 'yewtils'
import { pipe } from '../src'

const mockFn = vi.fn()
const mockFn2 = vi.fn()

mockFn.mockImplementation((_, arr) => arr)
mockFn2.mockImplementation((c: string, arr: any[]): any[] => {
  const newArr = arr.slice(1)

  return newArr
})

describe('pipe', () => {
  beforeEach(() => {
    mockFn.mockClear()
    mockFn2.mockClear()
  })

  it('will return a function', () => {
    const testFn = pipe()

    expect(isFunction(testFn)).toBe(true)
  })

  it('will return a function that calls piped functions', () => {
    const testFn = pipe(mockFn)

    testFn('#000', ['#fff'])

    expect(mockFn.mock.calls.length).toBe(1)
  })

  it('will pass params to piped functions', () => {
    const testFn = pipe(mockFn)

    testFn('#000', ['#fff'])

    expect(mockFn).toBeCalledWith('#000', ['#fff'], undefined)
  })

  it('will pass result of previous function to param of next piped function', () => {
    const testFn = pipe(mockFn, mockFn2)
    testFn('#000', ['#fff', '#222'])
    expect(mockFn).toBeCalledWith('#000', ['#fff', '#222'], undefined)
    expect(mockFn2).toBeCalledWith('#000', ['#fff', '#222'], undefined)
  })

  it('will pass the comparitor to all function', () => {
    const comparitor = '#000'

    const testFn = pipe(mockFn, mockFn2)
    testFn(comparitor, ['#fff', '#222'])
    expect(mockFn.mock.calls[0][0]).toBe(comparitor)
    expect(mockFn2.mock.calls[0][0]).toBe(comparitor)
  })

  it('will pass the options to all function', () => {
    const options = { test: true }

    const testFn = pipe(mockFn, mockFn2)
    testFn('#000', ['#fff', '#222'], options)
    expect(mockFn.mock.calls[0][2]).toMatchObject(options)
    expect(mockFn2.mock.calls[0][2]).toMatchObject(options)
  })
})
