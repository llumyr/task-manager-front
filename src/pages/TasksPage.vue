<template>
  <div class="content">
    <div class="groups">
      <div class="groups__content">
        <h5 class="groups__title">Groups</h5>
        <button class="groups__add">+</button>
      </div>
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

.groups {
  padding: 15px;

  &__content {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    border-right: 1px solid gray;
  }
}
</style>
