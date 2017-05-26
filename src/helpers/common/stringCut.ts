const stringCut = (str: string, chars: number): string => {
  if (str.length < chars) {
    return str
  }

  return `${str.substring(0, chars)}...`
}

export default stringCut
