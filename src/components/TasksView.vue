<template>
  <div class="tasks">
    <div class="task" v-for="task in activeGroup.tasks" :key="task._id">
      <div class="task__title">{{ task.title }}</div>
      <div class="subtasks">
        <div class="subtask" v-for="subtask in task.subtasks" :key="subtask._id">
          {{ subtask.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const activeGroup = computed(() => store.getters['groups/activeGroup'])
</script>

<style scoped lang="scss">
.tasks {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}

.task {
  padding: 10px 0;
  font-weight: 600;
}

.subtask {
  padding: 5px 0 0 20px;
  font-weight: 500;
}
</style>
