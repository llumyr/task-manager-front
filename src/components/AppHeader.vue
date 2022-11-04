<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <router-link :to="Routes.home" class="header__logo black">Task Manager</router-link>
        <div class="header__buttons" v-if="isAuth">
          <button class="button outline red" @click="logout">logout</button>
        </div>
<!--        <button type="button" class="header__color-scheme-switcher" @click="toggleColorScheme">button</button>-->
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import Routes from '@/router/Routes'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const isAuth = computed(() => store.getters.isAuth)

const toggleColorScheme = (): void => {
  document.documentElement.dataset.colorScheme = document.documentElement.dataset.colorScheme === 'light' ? 'dark' : 'light'
  localStorage.colorScheme = document.documentElement.dataset.colorScheme
}

const logout = async () => await store.dispatch('logout')
</script>

<style scoped lang="scss">
.header {
  border-bottom: 1px solid var(--splitter);
  padding: 10px 0;
  z-index: 1000;

  &__wrapper {
    display: flex;
    justify-content: space-between;
  }

  &__logo {
    font-size: 26px;
    font-weight: 600;
  }

  &__color-scheme-switcher {
    font-size: 26px;
    font-weight: 600;
  }
}
</style>
