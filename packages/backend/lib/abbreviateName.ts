/**
 * abbreviateName reduces a name that has an arbitrary
 * number of individual words, into a truncated string
 * that contains the first letter of the first name followed
 * by a period, with the succeeding words appended
 * to the end.
 * @param name name to abbreviate
 * @returns abbreviated name
 */
export default function abbreviateName(name: string): string {
  let splitted = name.split(' ')
  let length = splitted.length

  switch (length) {
    case 1:
      return name
    case 2:
      return `${splitted[0][0]}. ${splitted[1]}`
    case 3:
      return `${splitted[0][0]}.${splitted[1][0]}. ${splitted[2]}`
    case 4:
      return `${splitted[0][0]}.${splitted[1][0]}.${splitted[2][0]}. ${splitted[3]}`
    default:
      return `${splitted[0][0]}. ${splitted[1]}...`
  }
}
