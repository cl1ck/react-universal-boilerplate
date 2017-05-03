export function getClientLanguage() {
  return (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage
}