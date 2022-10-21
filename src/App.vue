<template>
  <router-view/>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

onBeforeMount(async () => {
  await store.dispatch('initAuth')
})
</script>

<style lang="scss">
@import '@/assets/default';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
