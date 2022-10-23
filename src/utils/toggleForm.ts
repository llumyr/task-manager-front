import toggleClass from '@/utils/toggleClass'
import { Ref } from 'vue'

export default (show: Ref<boolean>, textElement: HTMLElement, formElement: HTMLElement): void => {
  if (show.value) {
    toggleClass(formElement, 'animate__bounceOut')
    setTimeout(() => {
      show.value = !show.value
      toggleClass(formElement, 'animate__bounceOut')
      toggleClass(textElement, 'animate__bounceIn')
    }, 750)
    setTimeout(() => {
      toggleClass(textElement, 'animate__bounceIn')
    }, 1500)
  } else {
    toggleClass(textElement, 'animate__bounceOut')
    setTimeout(() => {
      show.value = !show.value
      toggleClass(textElement, 'animate__bounceOut')
      toggleClass(formElement, 'animate__bounceIn')
    }, 750)
    setTimeout(() => {
      toggleClass(formElement, 'animate__bounceIn')
    }, 1500)
  }
}
