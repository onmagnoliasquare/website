import { hasUppercase, buildSiteTags, getMetaTags } from '$lib/helpers'
import type { MetaInfo } from '$lib/schema'
import { describe, expect, it } from 'vitest'

describe('hasUppercase', () => {
  it('is true for uppercase', () => {
    expect(hasUppercase('abcDefg')).toBe(true)
  })

  it('is false for lowercase', () => {
    expect(hasUppercase('abcdefg')).toBe(false)
  })
})

describe('buildSiteTags', () => {
  it('returns a new array combining ref and unique values from cmp', () => {
    const ref = ['a', 'b']
    const cmp = ['b', 'c', 'd']
    const result = buildSiteTags(ref, cmp)
    expect.soft(result).toEqual(['a', 'b', 'c', 'd'])
  })

  it('returns a copy of ref if cmp has no new elements', () => {
    const ref = ['x', 'y']
    const cmp = ['x', 'y']
    const result = buildSiteTags(ref, cmp)
    expect.soft(result).toEqual(['x', 'y'])
  })

  it('returns a copy of ref if cmp is empty', () => {
    const ref = ['x', 'y']
    const cmp: string[] = []
    const result = buildSiteTags(ref, cmp)
    expect.soft(result).toEqual(['x', 'y'])
  })

  it('returns cmp if ref is empty', () => {
    const ref: string[] = []
    const cmp = ['foo', 'bar']
    const result = buildSiteTags(ref, cmp)
    expect.soft(result).toEqual(['foo', 'bar'])
  })

  it('handles both arrays empty', () => {
    const result = buildSiteTags([], [])
    expect.soft(result).toEqual([])
  })

  it('does not modify the input arrays', () => {
    const ref = ['a']
    const cmp = ['b']
    buildSiteTags(ref, cmp)
    expect.soft(ref).toEqual(['a'])
    expect.soft(cmp).toEqual(['b'])
  })

  it('preserves order: ref first, then new items from cmp in cmp order', () => {
    const ref = ['1', '2']
    const cmp = ['3', '2', '4']
    const result = buildSiteTags(ref, cmp)
    expect.soft(result).toEqual(['1', '2', '3', '4'])
  })
})

describe('getMetaTags', () => {
  it('selects title without MetaInfo.ogTitle', () => {
    const metaInfo = undefined
    const { title } = getMetaTags(metaInfo, 'the truman show', '')
    expect.soft(title).toBe('the truman show')
  })
  it('selects description without MetaInfo.ogDescription', () => {
    const metaInfo = undefined
    const { description } = getMetaTags(metaInfo, '', 'a really good movie apparently')
    expect.soft(description).toBe('a really good movie apparently')
  })
  it('selects MetaInfo.ogTitle with MetaInfo.ogTitle', () => {
    const metaInfo: MetaInfo = {
      ogTitle: 'lifetime movie',
    }
    const { title } = getMetaTags(metaInfo, 'finesse', '')
    expect.soft(title).toBe('lifetime movie')
  })
  it('selects MetaInfo.ogDescription with MetaInfo.ogDescription', () => {
    const metaInfo: MetaInfo = {
      ogDescription: 'hotel? trivago',
    }
    const { description } = getMetaTags(metaInfo, '', 'doggo')
    expect.soft(description).toBe('hotel? trivago')
  })
  it('selects tags without MetaInfo.ogTags', () => {
    const metaInfo = undefined
    const image = undefined
    const testTags = new Set<string>(['a', 'b', 'c'])
    const { tags } = getMetaTags(metaInfo, '', '', image, testTags)
    expect.soft(tags).toStrictEqual(testTags)
  })
  it('selects MetaInfo.ogTags with MetaInfo.ogTags', () => {
    const metaInfo = {
      ogTags: ['a', 'b', 'c', 'd', 'e', 'cat'],
    }
    const image = undefined
    const testTags = new Set<string>(['a', 'b', 'c', 'x'])
    const { tags } = getMetaTags(metaInfo, '', '', image, testTags)
    expect.soft(tags).toStrictEqual(new Set(['a', 'b', 'c', 'd', 'e', 'cat', 'x']))
  })
})
