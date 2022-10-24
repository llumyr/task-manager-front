<template>
  {{ groups }}
</template>

<script setup lang="ts">
import { onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const groups = computed(() => store.getters.groups)

onBeforeMount(async () => {
  await store.dispatch('getGroups')
})
</script>

<style scoped lang="scss">
</style>
