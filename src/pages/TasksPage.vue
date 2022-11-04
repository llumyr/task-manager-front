<template>
  <div class="content">
    <div class="groups">
      <div class="groups__wrapper">
        <div class="groups__header">
          <h3 class="groups__title">Groups</h3>
          <button class="groups__add" @click="toggleAddingForm" ref="addingGroupButton"></button>
        </div>
        <div class="groups__adding-form" ref="addingFormElement">
          <input type="text" placeholder="New group`s title" v-model="newGroupTitle">
          <button class="groups__adding-form-confirm" @click="addGroup" :disabled="confirmAddGroupDisabled">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="none">
              <path stroke="#77ff77" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M18.5 2 7.1 14 2 8.6"/>
            </svg>
          </button>
        </div>
        <div class="groups__content" ref="groupsContentElement">
          <span class="groups__mark" ref="markElement"></span>
          <div class="group" :class="{ active: group._id === chosenGroup._id }" v-for="(group, index) in groups" :key="group._id">
            <span class="group__title" @click="chooseGroup(index)">{{ group.title }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="tasks">
      <div class="tasks__wrapper">
        <div class="tasks__header">
          <div class="tasks__chosenGroup chosenGroup">
            <h3 class="chosenGroup__title">{{ chosenGroup.title }}</h3>
            <div class="chosenGroup__actions">
              <button class="chosenGroup__edit">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                  <path fill="#2c3e50" fill-rule="evenodd" d="M21.45 5.42c.2.29.16.68-.1.94l-9.18 9.2a.96.96 0 0 1-.34.19l-3.83 1a.75.75 0 0 1-.92-.92l1-3.83a.78.78 0 0 1 .16-.3l9.23-9.23a.75.75 0 0 1 1.06 0l2.83 2.83a.4.4 0 0 1 .1.12Zm-1.68.4L18 4.07l-8.52 8.52-.62 2.4 2.39-.63 8.52-8.52Z" clip-rule="evenodd"/>
                  <path fill="#2c3e50" d="M19.64 17.16c.27-2.34.36-4.7.26-7.04a.4.4 0 0 1 .12-.3l.98-.98a.2.2 0 0 1 .34.12c.19 2.8.12 5.6-.2 8.37a4.39 4.39 0 0 1-3.88 3.84c-3.47.38-7.05.38-10.52 0a4.39 4.39 0 0 1-3.87-3.84 45.92 45.92 0 0 1 0-10.66 4.39 4.39 0 0 1 3.87-3.84c2.63-.3 5.33-.36 8-.21a.2.2 0 0 1 .12.34l-1 1a.4.4 0 0 1-.3.1c-2.22-.07-4.46.02-6.65.26a2.89 2.89 0 0 0-2.55 2.52c-.4 3.43-.4 6.9 0 10.32a2.89 2.89 0 0 0 2.55 2.52c3.35.37 6.83.37 10.18 0a2.89 2.89 0 0 0 2.55-2.52Z"/>
                </svg>
              </button>
              <button class="chosenGroup__delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                  <path fill="#ff7777" d="M8.44 4.31h-.19c.1 0 .19-.08.19-.18v.18h7.12v-.18c0 .1.09.18.19.18h-.19V6h1.69V4.12c0-.82-.67-1.5-1.5-1.5h-7.5c-.83 0-1.5.68-1.5 1.5V6h1.69V4.31ZM20.25 6H3.75a.75.75 0 0 0-.75.75v.75c0 .1.08.19.19.19H4.6l.58 12.26c.04.8.7 1.43 1.5 1.43h10.64c.8 0 1.46-.63 1.5-1.43l.58-12.26h1.41A.2.2 0 0 0 21 7.5v-.75a.75.75 0 0 0-.75-.75Zm-3.11 13.69H6.86l-.57-12h11.42l-.57 12Z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, computed, ref } from 'vue'
import { useStore } from 'vuex'
import toggleClass from '@/utils/toggleClass'

const store = useStore()

const groups = computed(() => store.getters.groups)

const chosenGroup = ref({ _id: 'loading...', title: 'loading...' })

const markElement = ref()

const chooseGroup = (index: number): void => {
  chosenGroup.value = groups.value[index]
  markElement.value.style.left = '-15px'
  setTimeout(() => {
    markElement.value.style.left = '6px'
  }, 100)
  markElement.value.style.top = index * 39 + 20 + 'px'
}

const addingFormElement = ref()
const addingGroupButton = ref()
const groupsContentElement = ref()

const toggleAddingForm = () => {
  toggleClass(groupsContentElement.value, 'adding-form-active')
  toggleClass(addingGroupButton.value, 'adding-form-active')
  toggleClass(addingFormElement.value, 'adding-form-active')
}

const newGroupTitle = ref('')

const confirmAddGroupDisabled = computed(() => newGroupTitle.value.length === 0)

const addGroup = async () => {
  await store.dispatch('createGroup', newGroupTitle.value)
  newGroupTitle.value = ''
  toggleAddingForm()
}

onBeforeMount(async () => {
  await store.dispatch('getGroups')
  chosenGroup.value = groups.value[0]
})
</script>

<style scoped lang="scss">
.content {
  display: grid;
  grid-template-columns: 20% 1fr;
  height: 100%;
}

.groups,
.tasks {
  padding: 15px 0;

  &__wrapper {
    height: 100%;
    //overflow-y: scroll;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px 10px 0;
    border-bottom: 1px solid var(--splitter);
  }
}

.groups {
  &__wrapper {
    padding-right: 15px;
    border-right: 1px solid var(--splitter);
  }

  &__add {
    position: relative;
    width: 16px;
    height: 16px;
    transition: 200ms;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      width: 2px;
      height: 16px;
      background-color: var(--main);
      transition: 200ms;
    }

    &::after {
      transform: rotate(90deg);
    }

    &.adding-form-active {
      transform: rotate(45deg);
    }
  }

  &__adding-form {
    position: relative;
    top: -30px;
    margin-top: 10px;
    z-index: -1;
    opacity: 0;
    transition: 200ms;

    &.adding-form-active {
      top: 0;
      z-index: 0;
      opacity: 1;
    }

    > input {
      width: 100%;
      padding: 10px;
      outline: none;
    }

    &-confirm {
      position: absolute;
      right: 6px;
      top: 50%;
      transform: translateY(-50%);

      &[disabled] {
        cursor: default;
        filter: grayscale(1);
      }
    }
  }

  &__content {
    margin-top: 10px;
    position: relative;
    top: -50px;
    transition: 200ms;

    &.adding-form-active {
      top: -10px;
    }
  }

  &__mark {
    content: '';
    position: absolute;
    top: 20px;
    left: 6px;
    height: 6px;
    width: 6px;
    transform: translateY(-50%);
    border-radius: 50%;
    background-color: var(--accent);
    transition: top 200ms, left 100ms ease-in-out;
  }
}

.group {
  padding: 10px 0;
  transition: 200ms;
  display: flex;
  gap: 6px;
  align-items: center;

  &.active {
    padding-left: 20px;

    .group__title {
      font-weight: 600;
    }
  }

  &__title {
    cursor: pointer;
    font-weight: 500;
  }
}

.tasks {
  &__wrapper {
    padding-left: 15px;
  }
}

.chosenGroup {
  display: flex;
  gap: 8px;

  &:hover {
    .chosenGroup__actions {
      display: flex;
    }
  }

  &__actions {
    display: none;
    gap: 2px;
  }
}
</style>
