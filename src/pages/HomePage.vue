<template>
  <div class="home animate__animated" ref="homeElement">
    <h1 class="home__title">This is Task Manager</h1>
    <p class="home__description">Here you can create tasks and manage them</p>
    <button class="home__sign-up-link button" @click="routeToRegAuth">Start Now</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Routes from '@/router/Routes'
import 'animate.css'

const router = useRouter()

const homeElement = ref(null)

const routeToRegAuth = () => {
  homeElement.value.classList.add('animate__backOutUp')
  setTimeout(() => {
    router.push({ path: Routes.regAuth })
  }, 1000)
}
</script>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  &__title {
    font-size: 64px;
  }

  &__description {
    font-size: 20px;
    margin-top: 5px;
  }

  &__sign-up-link {
    margin-top: 25px;
    font-weight: 600;
  }
}
</style>
