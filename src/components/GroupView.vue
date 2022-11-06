<template>
  <div class="group">
    <div class="group__wrapper">
      <div class="group__header">
        <div class="group__activeGroup activeGroup">
          <h2 class="activeGroup__title">
            <input type="text" v-model="newTitle" v-if="inputNewTitle" style="outline: none">
            <span v-else>{{ activeGroup ? activeGroup.title : 'To start, select a group...' }}</span>
          </h2>
          <button class="activeGroup__confirm" @click="changeTitle" :disabled="confirmNewTitleDisabled" v-if="inputNewTitle">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="none">
              <path stroke="#77ff77" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M18.5 2 7.1 14 2 8.6"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g><path fill="#2c3e50" d="m13.41 12 4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/></g></svg>
          </button>
          <div class="activeGroup__actions" v-else-if="activeGroup">
            <button type="button" class="activeGroup__edit" @click="toggleInputNewTitle">
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="none">
                <path fill="#2C3E50" fill-rule="evenodd" d="M20.56 5.2a.7.7 0 0 1-.1.9l-8.8 8.81c-.1.08-.2.15-.32.18l-3.67.96a.72.72 0 0 1-.88-.88l.95-3.67c.03-.1.09-.2.16-.29l8.84-8.84a.72.72 0 0 1 1.02 0l2.71 2.7.1.12h-.01Zm-1.61.38-1.7-1.68-8.16 8.17-.6 2.3 2.3-.6 8.16-8.17v-.02Z" clip-rule="evenodd"/>
                <path fill="#2C3E50" d="M18.82 16.45c.26-2.25.35-4.5.25-6.75a.38.38 0 0 1 .12-.29l.93-.94a.2.2 0 0 1 .33.12c.18 2.68.12 5.36-.2 8.02a4.2 4.2 0 0 1-3.7 3.68c-3.33.36-6.77.36-10.1 0a4.2 4.2 0 0 1-3.7-3.68 44 44 0 0 1 0-10.22 4.2 4.2 0 0 1 3.7-3.68c2.53-.29 5.12-.34 7.68-.2a.2.2 0 0 1 .11.33l-.96.95a.38.38 0 0 1-.29.1c-2.12-.07-4.27.02-6.37.25a2.77 2.77 0 0 0-2.44 2.41 42.67 42.67 0 0 0 0 9.9 2.77 2.77 0 0 0 2.44 2.41c3.21.35 6.55.35 9.76 0a2.77 2.77 0 0 0 2.44-2.41Z"/>
              </svg>
            </button>
            <button type="button" class="activeGroup__delete" @click="deleteGroup">
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="none">
                <path fill="#F77" d="M8.09 4.13H7.9c.1 0 .18-.08.18-.17v.17h6.82v-.17c0 .1.09.17.18.17h-.18v1.62h1.62v-1.8c0-.79-.64-1.44-1.44-1.44H7.91c-.8 0-1.44.65-1.44 1.44v1.8h1.62V4.13ZM19.4 5.75H3.59a.72.72 0 0 0-.71.72v.72c0 .1.07.18.18.18H4.4l.55 11.75c.04.77.67 1.37 1.44 1.37h10.2c.76 0 1.4-.6 1.44-1.37l.55-11.75h1.35a.2.2 0 0 0 .18-.18v-.72a.72.72 0 0 0-.71-.72Zm-2.98 13.12H6.57l-.54-11.5h10.94l-.54 11.5Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <tasks-view/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import TasksView from '@/components/TasksView.vue'

const store = useStore()

const activeGroup = computed(() => store.getters['groups/activeGroup'])

const inputNewTitle = ref(false)
const newTitle = ref('')

const confirmNewTitleDisabled = computed(() => !!inputNewTitle.value)

const toggleInputNewTitle = () => {
  inputNewTitle.value = !inputNewTitle.value
  if (inputNewTitle.value) newTitle.value = activeGroup.value.title
}

const deleteGroup = async () => {
  await store.dispatch('groups/deleteGroup', activeGroup.value._id)
}
</script>

<style scoped lang="scss">
.group {
  padding: 15px 0;

  &__wrapper {
    height: 100%;
    padding-left: 15px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px 10px 0;
    border-bottom: 1px solid var(--splitter);
  }
}

.activeGroup {
  display: flex;
  align-items: center;
  gap: 8px;

  &__actions {
    display: flex;
    gap: 2px;
    opacity: 0;
    transition: 200ms;

    > button {
      display: flex;
    }
  }

  &:hover {
    .activeGroup__actions {
      opacity: 1;
    }
  }

  &__confirm[disabled] {
    cursor: default;
    filter: grayscale(1);
  }
}
</style>
