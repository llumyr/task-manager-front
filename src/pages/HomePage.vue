<template>
  <div class="home">
    <h1 class="home__title">This is Task Manager</h1>
    <p class="home__description">Here you can create tasks and manage them</p>
    <router-link :to="Routes.regAuth" class="home__sign-up-link button">Start Now</router-link>
  </div>
</template>

<script setup lang="ts">
import Routes from '@/router/Routes'
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
