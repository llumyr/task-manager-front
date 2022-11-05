<template>
  <app-header/>
  <main>
    <div class="container" style="height: 100%">
      <router-view/>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import AppHeader from '@/components/AppHeader.vue'

const store = useStore()

onBeforeMount(async () => {
  document.documentElement.dataset.colorScheme = localStorage.colorScheme === 'dark' ? 'dark' : 'light'
  await store.dispatch('auth/initAuth')
})
</script>

<style lang="scss">
@import '@/assets/style';
</style>
