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
              <button type="button" class="chosenGroup__edit">
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="none">
                  <path fill="#2C3E50" fill-rule="evenodd" d="M20.56 5.2a.7.7 0 0 1-.1.9l-8.8 8.81c-.1.08-.2.15-.32.18l-3.67.96a.72.72 0 0 1-.88-.88l.95-3.67c.03-.1.09-.2.16-.29l8.84-8.84a.72.72 0 0 1 1.02 0l2.71 2.7.1.12h-.01Zm-1.61.38-1.7-1.68-8.16 8.17-.6 2.3 2.3-.6 8.16-8.17v-.02Z" clip-rule="evenodd"/>
                  <path fill="#2C3E50" d="M18.82 16.45c.26-2.25.35-4.5.25-6.75a.38.38 0 0 1 .12-.29l.93-.94a.2.2 0 0 1 .33.12c.18 2.68.12 5.36-.2 8.02a4.2 4.2 0 0 1-3.7 3.68c-3.33.36-6.77.36-10.1 0a4.2 4.2 0 0 1-3.7-3.68 44 44 0 0 1 0-10.22 4.2 4.2 0 0 1 3.7-3.68c2.53-.29 5.12-.34 7.68-.2a.2.2 0 0 1 .11.33l-.96.95a.38.38 0 0 1-.29.1c-2.12-.07-4.27.02-6.37.25a2.77 2.77 0 0 0-2.44 2.41 42.67 42.67 0 0 0 0 9.9 2.77 2.77 0 0 0 2.44 2.41c3.21.35 6.55.35 9.76 0a2.77 2.77 0 0 0 2.44-2.41Z"/>
                </svg>
              </button>
              <button type="button" class="chosenGroup__delete" @click="deleteGroup">
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="none">
                  <path fill="#F77" d="M8.09 4.13H7.9c.1 0 .18-.08.18-.17v.17h6.82v-.17c0 .1.09.17.18.17h-.18v1.62h1.62v-1.8c0-.79-.64-1.44-1.44-1.44H7.91c-.8 0-1.44.65-1.44 1.44v1.8h1.62V4.13ZM19.4 5.75H3.59a.72.72 0 0 0-.71.72v.72c0 .1.07.18.18.18H4.4l.55 11.75c.04.77.67 1.37 1.44 1.37h10.2c.76 0 1.4-.6 1.44-1.37l.55-11.75h1.35a.2.2 0 0 0 .18-.18v-.72a.72.72 0 0 0-.71-.72Zm-2.98 13.12H6.57l-.54-11.5h10.94l-.54 11.5Z"/>
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

const groups = computed(() => store.getters['groups/groups'])

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
  await store.dispatch('groups/createGroup', newGroupTitle.value)
  newGroupTitle.value = ''
  toggleAddingForm()
}

const deleteGroup = async () => {
  await store.dispatch('groups/deleteGroup', chosenGroup.value._id)
}

onBeforeMount(async () => {
  await store.dispatch('groups/getGroups')
  await store.dispatch('groups/getGroup')
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
    .chosenGroup__actions {
      opacity: 1;
    }
  }
}
</style>
