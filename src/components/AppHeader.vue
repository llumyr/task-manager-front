<template>
  <header class="header">
    <router-link :to="Routes.home" class="header__logo">Task Manager</router-link>
  </header>
</template>

<script setup lang="ts">
import Routes from '@/router/Routes'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const isAuth = computed(() => store.getters.isAuth)
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
}
</style>
