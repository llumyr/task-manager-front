<template>
  <div class="reg-auth animate__animated animate__backInDown">
    <div class="reg-auth__wrapper">
      <div class="reg-auth__item">
        <div class="content animate__animated" @click="regToggleForm" v-show="!regShow" ref="regTextElement">
          <h1>Registration</h1>
          <p>If you don`t have an account</p>
        </div>
        <div class="reg-auth__form animate__animated" v-show="regShow" ref="regFormElement">
          <h1>Registration</h1>
          <div>
            <label for="" class="label">Username</label>
            <input type="text" class="input" placeholder="input username" v-model="username">
          </div>
          <div>
            <label for="" class="label">Password</label>
            <input type="password" class="input" placeholder="input password" v-model="password">
          </div>
          <button type="submit" class="button" @click="auth('auth/signUp')">Sign Up</button>
        </div>
      </div>
      <div class="reg-auth__item">
        <div class="content animate__animated" @click="authToggleForm" v-show="!authShow" ref="authTextElement">
          <h1>Authorization</h1>
          <p>If you already have an account</p>
        </div>
        <div class="reg-auth__form animate__animated" v-show="authShow" ref="authFormElement">
          <h1>Authorization</h1>
          <div>
            <label for="" class="label">Username</label>
            <input type="text" class="input" placeholder="username" v-model="username">
          </div>
          <div>
            <label for="" class="label">Password</label>
            <input type="password" class="input" placeholder="password" v-model="password">
          </div>
          <button type="submit" class="button" @click="auth('auth/signIn')">Sign In</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import toggleForm from '@/utils/toggleForm'
import 'animate.css'

const store = useStore()

const username = ref('')
const password = ref('')

const auth = async (method: string): Promise<void> => await store.dispatch(method, { username: username.value, password: password.value })

const regShow = ref(false)
const regTextElement = ref()
const regFormElement = ref()

const regToggleForm = () => {
  if (authShow.value) authToggleForm()
  toggleForm(regShow, regTextElement.value, regFormElement.value)
}

const authShow = ref(false)
const authTextElement = ref()
const authFormElement = ref()

const authToggleForm = () => {
  if (regShow.value) regToggleForm()
  toggleForm(authShow, authTextElement.value, authFormElement.value)
}
</script>

<style scoped lang="scss">
.reg-auth {
  height: 100%;
  display: flex;
  align-items: center;

  &__wrapper {
    min-height: 50vh;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &:first-child {
      border-right: 1px solid var(--splitter);
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
    width: 50%;
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 25px;
  }
}
</style>
