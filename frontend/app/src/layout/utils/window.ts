export function neutralizeBack(callback: () => void) {
  if (window.onpopstate === null) {
    window.history.pushState(null, '', window.location.href)
  }
  window.onpopstate = () => {
    window.history.pushState(null, '', window.location.href)
    callback()
  }
}

export function revivalBack() {
  if (window.onpopstate !== null) {
    window.history.back()
  }
  window.onpopstate = null
}
