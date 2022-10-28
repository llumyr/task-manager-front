<template>
  <app-header/>
  <div class="container" style="padding-top: 52px">
    <router-view/>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import AppHeader from '@/components/AppHeader.vue'

const store = useStore()

onBeforeMount(async () => {
  document.documentElement.dataset.colorScheme = localStorage.colorScheme === 'dark' ? 'dark' : 'light'
  await store.dispatch('initAuth')
})
</script>

<style lang="scss">
@import '@/assets/style';
</style>
