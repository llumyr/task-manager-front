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
          <h3 class="tasks__title">{{ chosenGroup.title }}</h3>
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
</style>
