export const convertToAbsolute = (url: string) => {
  return url.match(/(?:(?:https?|ftp):\/\/)/) ? url : '\/\/' + url;
};
