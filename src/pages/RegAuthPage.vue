<template>
  <div class="reg-auth">
    <div class="reg-auth__wrapper">
      <div class="reg-auth__item">
        <div class="content animate__animated" style="text-align: center; cursor: pointer" @click="regToggleForm"
             v-show="!regShow" ref="regTextElement">
          <h1>Registration</h1>
          <p>If you don`t have an account</p>
        </div>
        <div class="reg-auth__form animate__animated" v-show="regShow" ref="regFormElement">
          <input type="text" placeholder="username" v-model="username">
          <input type="password" placeholder="password" v-model="password">
          <button type="submit" @click="clickSignUp">Sign Up</button>
        </div>
      </div>
      <div class="reg-auth__item">
        <div class="content animate__animated" style="text-align: center; cursor: pointer" @click="authToggleForm"
             v-show="!authShow" ref="authTextElement">
          <h1>Authorization</h1>
          <p>If you already have an account</p>
        </div>
        <div class="reg-auth__form animate__animated" v-show="authShow" ref="authFormElement">
          <input type="text" placeholder="username" v-model="username">
          <input type="password" placeholder="password" v-model="password">
          <button type="submit" @click="clickSignIn">Sign In</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import 'animate.css'
import { signUp, signIn } from '@/services/auth.service'
import { useRouter } from 'vue-router'

const toggleClass = (element: HTMLElement, className: string): void => {
  if (element.classList.contains(className)) {
    element.classList.remove(className)
  } else {
    element.classList.add(className)
  }
}

const regShow = ref(false)
const regTextElement = ref(null)
const regFormElement = ref(null)

const username = ref('')
const password = ref('')

const router = useRouter()

const regToggleForm = () => {
  if (authShow.value) authToggleForm()
  if (regShow.value) {
    toggleClass(regFormElement.value, 'animate__bounceOut')
    setTimeout(() => {
      regShow.value = !regShow.value
      toggleClass(regFormElement.value, 'animate__bounceOut')
      toggleClass(regTextElement.value, 'animate__bounceIn')
    }, 750)
    setTimeout(() => {
      toggleClass(regTextElement.value, 'animate__bounceIn')
    }, 1500)
  } else {
    toggleClass(regTextElement.value, 'animate__bounceOut')
    setTimeout(() => {
      regShow.value = !regShow.value
      toggleClass(regTextElement.value, 'animate__bounceOut')
      toggleClass(regFormElement.value, 'animate__bounceIn')
    }, 750)
    setTimeout(() => {
      toggleClass(regFormElement.value, 'animate__bounceIn')
    }, 1500)
  }
}

const authShow = ref(false)
const authTextElement = ref(null)
const authFormElement = ref(null)

const authToggleForm = () => {
  if (regShow.value) regToggleForm()
  if (authShow.value) {
    toggleClass(authFormElement.value, 'animate__bounceOut')
    setTimeout(() => {
      authShow.value = !authShow.value
      toggleClass(authFormElement.value, 'animate__bounceOut')
      toggleClass(authTextElement.value, 'animate__bounceIn')
    }, 750)
    setTimeout(() => {
      toggleClass(authTextElement.value, 'animate__bounceIn')
    }, 1500)
  } else {
    toggleClass(authTextElement.value, 'animate__bounceOut')
    setTimeout(() => {
      authShow.value = !authShow.value
      toggleClass(authTextElement.value, 'animate__bounceOut')
      toggleClass(authFormElement.value, 'animate__bounceIn')
    }, 750)
    setTimeout(() => {
      toggleClass(authFormElement.value, 'animate__bounceIn')
    }, 1500)
  }
}

const clickSignUp = async () => {
  try {
    const res = await signUp(username.value, password.value)
    console.log(res)
    localStorage.token = res.data.token
    await router.push('/tasks')
  } catch (e) {
    console.log(e)
  }
}

const clickSignIn = async () => {
  try {
    const res = await signIn(username.value, password.value)
    await router.push('/tasks')
    console.log(res)
  } catch (e) {
    console.log(e)
  }
}
</script>

<style scoped lang="scss">
.reg-auth {
  min-height: 100vh;
  display: flex;
  align-items: center;

  &__wrapper {
    min-height: 60vh;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  &__item {
    padding: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &:first-child {
      border-right: 1px solid grey;
    }

    .content {
      cursor: pointer;
      text-align: center;
      transition: 200ms;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
  }
}
</style>
