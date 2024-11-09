/**
 * abbreviateName reduces a name that has an arbitrary
 * number of individual words, into a truncated string
 * that contains the first letter of the first name followed
 * by a period, with the succeeding words appended
 * to the end.
 * @param name name to abbreviate
 * @returns abbreviated name
 */
export function abbreviateName(name: string): string {
  let splitted = name.split(' ')

  // If the name is only one word
  if (splitted.length == 1) {
    return name
  }

  return `${splitted[0][0]}. ${splitted[1]}`
}
