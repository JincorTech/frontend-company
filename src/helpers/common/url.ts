export const convertToAbsolute = (url: string) => {
  if (url.match(/(?:(?:https?|ftp):\/\/)/)) {
    return url;
  } else {
    return '\/\/' + url;
  }
}