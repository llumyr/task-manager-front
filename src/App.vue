<template>
  <app-header/>
  <div class="container">
    <router-view/>
    <button @click="toggleColorScheme">Change color scheme</button>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import AppHeader from '@/components/AppHeader.vue'

const store = useStore()

onBeforeMount(async () => {
  document.documentElement.dataset.colorScheme = 'dark'
  if (localStorage.colorScheme === 'light') document.documentElement.dataset.colorScheme = 'light'
  await store.dispatch('initAuth')
})

const toggleColorScheme = (): void => {
  document.documentElement.dataset.colorScheme = document.documentElement.dataset.colorScheme === 'light' ? 'dark' : 'light'
  localStorage.colorScheme = document.documentElement.dataset.colorScheme
}
</script>

<style lang="scss">
@import '@/assets/style';
</style>
