import {describe, expect, test} from 'vitest'
import slugValidator from './slugValidator'
import replaceApostrophes from './replaceApostrophes'
import checkWhitespace from './checkWhitespace'
import abbreviateName from './abbreviateName'
import checkBannedTags from './checkBannedTags'

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
  // Extracts the inner validator function
  const validator = checkWhitespace()

  const nonStrings = [
    [123, true],
    [null, true],
    [undefined, true],
  ]

  const leadingOrTrailingWhitespace = [
    [` test`, 'Remove spaces before or after string'],
    [`test `, 'Remove spaces before or after string'],
    [` test `, 'Remove spaces before or after string'],
  ]

  const noWhitespaces = [
    [`meow`, true],
    [`woof woof`, true],
    [`Barack Obama`, true],
  ]

  const emptyStrings = [[``, '']]

  test.each([...nonStrings, ...leadingOrTrailingWhitespace, ...noWhitespaces, ...emptyStrings])(
    '%s -> %s',
    //@ts-expect-error TS(2345)
    (input, output) => {
      expect(validator(input)).toBe(output)
    }
  )
})

describe('removeTrailing', () => {
  const tests = [
    [`woohoo--`, `woohoo`],
    [`lotta-yahoos-here- _`, `lotta-yahoos-here`],
  ]

  test.each([...tests])('%s -> %s', (input, output) => {
    expect(slugValidator(input)).toBe(output)
  })
})

describe('slugValidator', () => {
  // Uppercase to lowercase.
  const upperToLower = [
    ['ABCDEFG', 'abcdefg'],
    ['ABCdefg', 'abcdefg'],
    ['abcDEFg', 'abcdefg'],
    ['AbCdEfG', 'abcdefg'],
  ]

  // Replaces special characters.
  const specialChars = [
    ['ab!cDEfg', 'abcdefg'],
    ['A!??b/cd', 'abcd'],
    ['.&.aB#?130', 'ab130'],
    [
      `should remove them all!(),.\\$%&?#'"“”‘’「」「」『』《》〈〉【】〖〗«»‘’„‚‹›﹙﹚﹛﹜﹝﹞（）［］｛｝｟｠`,
      'should-remove-them-all',
    ],
  ]

  // Replaces spaces with hyphens.
  const spaceToHyphen = [
    ['hello world', 'hello-world'],
    ['THIS IS A TEST.', 'this-is-a-test'],
    ['HELLO! Go ahead, ILLEGAL ch#!', 'hello-go-ahead-illegal-ch'],
  ]

  // Replaces – and — with -
  const replaceDifferentHyphen = [
    [
      `Off the clock—what they do in their free time`,
      `off-the-clock-what-they-do-in-their-free-time`,
    ],
    [
      `Off the clock–what they do in their free time`,
      `off-the-clock-what-they-do-in-their-free-time`,
    ],
  ]

  // Replaces all types of brackets.
  const replaceBrackets = [
    [`{this type of thing isn't allowed`, `this-type-of-thing-isnt-allowed`],
    [`[when and where]? Did you find this?`, `when-and-where-did-you-find-this`],
    [`THE WORLD is_round...`, `the-world-is-round`],
  ]

  // Removes *common* diacritics. There will be edge cases not accounted for.
  const removeDiacritics = [
    [`áēîöùćž`, `aeioucz`],
    [`ěûäõșţ`, `euaost`],
    [`iîøüçñĝ`, `iiøucng`],
  ]

  // Removes other unicode punctuations.
  const removeSpecialPunctuation = [
    [`再见，长乐路`, `再见-长乐路`],
    [`「知事を優先しすぎた兵庫県政」`, `知事を優先しすぎた兵庫県政`],
    [
      `兵庫県議会が開会、斎藤知事の不信任決議案を提案へ`,
      `兵庫県議会が開会-斎藤知事の不信任決議案を提案へ`,
    ],
  ]

  // Remove currency symbols.
  const removeCurrency = [
    [`$5000`, `5000`],
    [
      `New campus cats are EXTREMELY broke, lost ¥20 in poker`,
      `new-campus-cats-are-extremely-broke-lost-20-in-poker`,
    ],
    [`Gaining more £s`, `gaining-more-s`],
  ]

  // No emojis allowed.
  const removeEmojis = [
    [`lemon🍋`, `lemon`],
    [`Oh 💩! The website broke :(`, `oh-the-website-broke`],
  ]

  // Truncates output to max 200 characters.
  const charLimit = [
    [
      `The experiment was to see if NYU Shanghai could sustain free metal cups on campus provided for when students wanted to drink water. These cups were available at the café, but could also be taken throughout the school, if they were later returned.`,
      `the-experiment-was-to-see-if-nyu-shanghai-could-sustain-free-metal-cups-on-campus-provided-for-when-students-wanted-to-drink-water-these-cups-were-available-at-the-cafe-but-could-also-be-taken-through`,
    ],
    [
      `Beginning as a collaboration between the NYU Shanghai Writing Department and students of NYU Shanghai’s Inaugural Class, On Magnolia Square, formerly On Century Avenue, has bloomed into a thriving daily student publication`,
      `beginning-as-a-collaboration-between-the-nyu-shanghai-writing-department-and-students-of-nyu-shanghais-inaugural-class-on-magnolia-square-formerly-on-century-avenue-has-bloomed-into-a-thriving-daily-s`,
    ],
    [
      `“I always had this sense of Los Angeles, but I never knew what it was about,” Louise said. “So, I was curious, because this movie looked like it could give me a new perspective.” “I think the [cinema] atmosphere definitely helped because if it was in a classroom or something it would be very different. This actually made you get into the movie and zone out of the world,” she said.`,
      `i-always-had-this-sense-of-los-angeles-but-i-never-knew-what-it-was-about-louise-said-so-i-was-curious-because-this-movie-looked-like-it-could-give-me-a-new-perspective-i-think-the-cinema-atmosphere-d`,
    ],
  ]

  // JS Spread Syntax
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  test.each([
    ...upperToLower,
    ...specialChars,
    ...spaceToHyphen,
    ...replaceDifferentHyphen,
    ...replaceBrackets,
    ...removeDiacritics,
    ...removeSpecialPunctuation,
    ...removeCurrency,
    ...removeEmojis,
    ...charLimit,
  ])('%s -> %s', (input, output) => {
    expect(slugValidator(input)).toBe(output)
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
