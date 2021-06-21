export function isOnlyLetters(str: string) {
  return /^[a-z\sA-Z]+$/.test(str);
}
