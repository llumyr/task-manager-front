<template>
  <div class="content">
    <div class="groups">
      {{ groups }}
    </div>
    <div class="tasks">tasks</div>
  </div>
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
.content {
  padding-top: 52px;
  display: grid;
  grid-template-columns: 25% 1fr;
}
</style>
