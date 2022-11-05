export default (markElement: HTMLElement, index: number): void => {
  markElement.style.left = '-15px'
  setTimeout(() => {
    markElement.style.left = '6px'
  }, 100)
  markElement.style.top = index * 39 + 20 + 'px'
}
