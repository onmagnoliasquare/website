import {describe, expect, test} from 'vitest'
import slugValidator from './slugValidator'

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
  ]

  // Replaces spaces with hyphens.
  const spaceToHyphen = [
    ['hello world', 'hello-world'],
    ['THIS IS A TEST.', 'this-is-a-test'],
    ['HELLO! Go ahead, ILLEGAL ch#!', 'hello-go-ahead-illegal-ch'],
  ]

  // Replaces all types of brackets.
  const replaceBrackets = [
    [`{this type of thing isn't allowed`, `this-type-of-thing-isnt-allowed`],
    [`[when and where]? Did you find this?`, `when-and-where-did-you-find-this`],
    [`THE WORLD is_round...`, `the-world-is_round`],
  ]

  // Removes *common* diacritics. There will be edge cases not accounted for.
  const removeDiacritics = [
    [`áēîöùćž`, `aeioucz`],
    [`ěûäõșţ`, `euaost`],
    [`iîøüçñĝ`, `iiøucng`],
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
    ...replaceBrackets,
    ...removeDiacritics,
    ...charLimit,
  ])('%s -> %s', (input, output) => {
    expect(slugValidator(input)).toBe(output)
  })
})

// describe('slugValidator', () => {})
