/**
 * Replaces apostrophes with a 'typist' looking
 * replacement. Use this for titles. We must just
 * agree to **NOT USE** single apostrophes, `''` for
 * quotations.
 * @param s string to change
 */
export default function replaceApostrophes(s: string): string {
  // Maybe we won't use this...
  // const singleL: string = '‘'

  let start: number = 0
  let end: number = s.length

  const singleR: string = '’'
  const doubleL: string = '“'
  const doubleR: string = '”'

  let stack: number[] = []

  // First replace single apostrophes.
  s = s.replace(/'/g, singleR)

  let newString: string = ''

  for (let i = 0; i < s.length; i++) {
    if (s[i] == `"`) {
      stack.push(i)
    }

    if (stack.length > 1) {
      let a: string = s.slice(start, stack[0])
      let b: string = s.slice(stack[0] + 1, stack[1])
      let c: string = s.slice(stack[1] + 1, end)

      newString = newString.concat(a, doubleL, b, doubleR, replaceApostrophes(c))

      // Update start index.
      start = stack[1] + 1

      // Reset the stack.
      stack = []
    }
  }

  // For any "hanging" double quotation marks, for example
  // if a string erroneously ends in `"`, replace it with a
  // single `doubleL`.
  newString = newString.replace(/"/g, doubleL)
  s = s.replace(/"/g, doubleL)

  // If the newString is still empty, i.e. there are no
  // double quotations/apostrophes marks in it, return the original
  // string, which has the new single apostrophes inserted.
  // The slice solution is jerry rigged as hell. This is to avoid
  // recursion errors where the recursion makes a longer string
  // than usual. I don't know how to fix the recursion, and this
  // method is just temporary. It's inefficient. TODO FIX.
  return newString === '' ? s : newString.slice(0, end)
}
