export function abbreviateName(name: string): string {
  let splitted = name.split(' ')

  // If the name is only one word
  if (splitted.length == 1) {
    return name
  }

  return `${splitted[0][0]}. ${splitted[1]}`
}
