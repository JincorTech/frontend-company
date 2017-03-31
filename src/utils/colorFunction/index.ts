/*
 * params: fullName:string, id:string
 * return: { color:string, initials:string }
 * initials in UPPERCASE and contains 1 or 2 chars
 *
*/

const colorFunction = (fullName: string, id: string) => {
  const colors = [
    '#72A6F2', '#A68BF9', '#8BDDF9', '#FE7673', '#F99F8B',
    '#9DD06A', '#E1DA82', '#6B7BA0', '#82558D', '#F6A623'
  ]

  const index = id.split('').reduce((acc, item, index) => acc + item.charCodeAt(0), 0)
  const color = colors[index % colors.length]
  const initials = fullName
    .split(' ')
    .map(item => item.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2)

  return { color, initials }
}

export default colorFunction
