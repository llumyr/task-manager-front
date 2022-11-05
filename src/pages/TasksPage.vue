<template>
  <div class="content">
    <groups-view/>
    <group-view/>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import GroupsView from '@/components/GroupsView.vue'
import GroupView from '@/components/GroupView.vue'

const store = useStore()

onBeforeMount(async () => await store.dispatch('groups/getGroups'))
</script>

<style scoped lang="scss">
.content {
  display: grid;
  grid-template-columns: 20% 1fr;
  height: 100%;
}
</style>
