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
import toggleForm from '@/utils/toggleForm'

const router = useRouter()

const username = ref('')
const password = ref('')

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

const regShow = ref(false)
const regTextElement = ref(null)
const regFormElement = ref(null)

const regToggleForm = () => {
  if (authShow.value) authToggleForm()
  toggleForm(regShow, regTextElement.value, regFormElement.value)
}

const authShow = ref(false)
const authTextElement = ref(null)
const authFormElement = ref(null)

const authToggleForm = () => {
  if (regShow.value) regToggleForm()
  toggleForm(authShow, authTextElement.value, authFormElement.value)
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
