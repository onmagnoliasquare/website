import {describe, expect, test} from 'vitest'
import replaceApostrophes from './replaceApostrophes'
import checkWhitespace from './checkWhitespace'
import abbreviateName from './abbreviateName'
import checkBannedTags from './checkBannedTags'
import {validateSlug} from './validation'

describe('abbreviateName', () => {
  const twoWordNames = [
    [`Neo Alabastro`, `N. Alabastro`],
    [`Barack Obama`, `B. Obama`],
    [`Kendrick Lamar`, `K. Lamar`],
  ]

  const oneWordNames = [
    [`Zendaya`, `Zendaya`],
    [`God`, `God`],
    [`Jesus`, `Jesus`],
  ]

  const moreThanTwoWordNames = [
    [`Lord Have Mercy`, `L.H. Mercy`],
    [`John Ronald Reuel Tolkien`, `J.R.R. Tolkien`],
    [`Sometimes You Have To Try Harder`, `S. You...`],
    [`JingDong And TaoBao Have A Sale`, `J. And...`],
  ]

  test.each([...twoWordNames, ...oneWordNames, ...moreThanTwoWordNames])(
    '%s -> %s',
    (input, output) => {
      expect(abbreviateName(input)).toBe(output)
    }
  )
})

describe('checkBannedTags', () => {
  const bannedTags = ['these', 'fake', 'tags']
  const validator = checkBannedTags(bannedTags)

  const defaultBanList = [
    [`nyu`, `Cannot use tag 'nyu'`],
    [`nyu shanghai student`, `Cannot use tag 'nyu shanghai student'`],
    [`student journalism`, `Cannot use tag 'student journalism'`],
  ]

  const ignoresCase = [
    [`NYU`, `Cannot use tag 'NYU'`],
    [`NYU Shanghai Student`, `Cannot use tag 'NYU Shanghai Student'`],
    [`Student Journalism`, `Cannot use tag 'Student Journalism'`],
  ]

  const rejectsCustomTags = [
    [`these`, `Cannot use tag 'these'`],
    [`fake`, `Cannot use tag 'fake'`],
    [`tags`, `Cannot use tag 'tags'`],
  ]

  test.each([...defaultBanList, ...ignoresCase, ...rejectsCustomTags])(
    '%s -> %s',
    (input, output) => {
      expect(validator(input)).toBe(output)
    }
  )
})

describe('checkWhitespace', () => {
  const validator = checkWhitespace()

  const nonStrings: [number | null | undefined, boolean][] = [
    [123, true],
    [null, true],
    [undefined, true],
  ]

  test.each([...nonStrings])('%s -> %s', (input, output) => {
    expect(validator(input)).toBe(output)
  })
})

describe('removeTrailing', () => {
  const tests = [
    [`woohoo--`, `woohoo`],
    [`lotta-yahoos-here- _`, `lotta-yahoos-here`],
  ]

  test.each([...tests])('%s -> %s', (input, output) => {
    expect(validateSlug(input)).toBe(output)
  })
})

describe('replaceApostrophes', () => {
  const single = [
    [`What's good?`, `What’s good?`],
    [
      `I've told you nothing but the truth, and that's that.`,
      `I’ve told you nothing but the truth, and that’s that.`,
    ],
  ]

  const double: string[][] = [
    [`"No one says anything", said no one at all.`, `“No one says anything”, said no one at all.`],
    [`"Lord have mercy"`, `“Lord have mercy”`],
    [
      `"The admonishment never ends. You learn that one in school", said the boy. "The pain never ends. You learn that one in life", said the man. And consequently, "he was right", said the wife.`,
      `“The admonishment never ends. You learn that one in school”, said the boy. “The pain never ends. You learn that one in life”, said the man. And consequently, “he was right”, said the wife.`,
    ],
  ]

  const both: string[][] = [
    [
      `"No one says anything", said no one's dog at all.`,
      `“No one says anything”, said no one’s dog at all.`,
    ],
    [
      `"No one says anything", said no one's dog at all. And then he said "it's not too bad".`,
      `“No one says anything”, said no one’s dog at all. And then he said “it’s not too bad”.`,
    ],
    [
      `"Anytime I see someone, I cry" - A sad man's words`,
      `“Anytime I see someone, I cry” - A sad man’s words`,
    ],
    [
      `"Anytime I see someone, I cry" - A sad man's words. Here's an erroneous ending"`,
      `“Anytime I see someone, I cry” - A sad man’s words. Here’s an erroneous ending“`,
    ],
  ]

  test.each([...single, ...double, ...both])('%s -> %s', (input, output) => {
    expect(replaceApostrophes(input)).toBe(output)
  })
})
