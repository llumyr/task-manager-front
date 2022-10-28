<template>
  <div class="content">
    <div class="groups">
      <div class="groups__wrapper">
        <div class="groups__header">
          <h3 class="groups__title">Groups</h3>
          <button class="groups__add"></button>
        </div>
        <div class="groups__content">
          <span class="groups__mark" ref="markElement"></span>
          <div class="group" :class="{ active: group.active }" v-for="(group, index) in groups" :key="group._id">
            <span class="group__title" @click="makeActive(index)">
              {{ group.title }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="tasks">
      <div class="tasks__wrapper">
        <div class="tasks__header">
          <h3 class="tasks__title">Tasks</h3>
          <button class="tasks__add"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, computed, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

// const groups = computed(() => store.getters.groups)
const groups = ref([
  {
    _id: 1,
    title: 'Group 1',
    active: false
  },
  {
    _id: 2,
    title: 'Group 2',
    active: false
  },
  {
    _id: 3,
    title: 'Group 3',
    active: false
  },
  {
    _id: 4,
    title: 'Group 4',
    active: false
  },
  {
    _id: 5,
    title: 'Group 5',
    active: false
  },
  {
    _id: 6,
    title: 'Group 6',
    active: false
  },
  {
    _id: 7,
    title: 'Group 7',
    active: false
  },
  {
    _id: 8,
    title: 'Group 8',
    active: false
  },
  {
    _id: 9,
    title: 'Group 9',
    active: false
  },
  {
    _id: 10,
    title: 'Group 10',
    active: false
  },
  {
    _id: 11,
    title: 'Group 11',
    active: false
  },
  {
    _id: 12,
    title: 'Group 12',
    active: false
  }
])

const markElement = ref(null)

const makeActive = (index: number): void => {
  groups.value.forEach((item: any) => (item.active = false))
  groups.value[index].active = true
  markElement.value.style.left = '-30px'
  setTimeout(() => {
    markElement.value.style.left = '6px'
  }, 100)
  markElement.value.style.top = index * 39 + 20 + 'px'
}

onBeforeMount(async () => {
  await store.dispatch('getGroups')
  groups.value[0].active = true
})
</script>

<style scoped lang="scss">
.content {
  display: grid;
  grid-template-columns: 20% 1fr;
}

.groups,
.tasks {
  padding: 15px 0;
  height: calc(100vh - 53px);

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

  &__add {
    position: relative;
    width: 16px;
    height: 16px;

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

    &:hover {
      &::before {
        transform: rotate(90deg);
      }

      &::after {
        transform: rotate(180deg);
      }
    }
  }
}

.groups {
  &__wrapper {
    padding-right: 15px;
    border-right: 1px solid var(--splitter);
  }

  &__content {
    margin-top: 10px;
    position: relative;
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
    transition: 200ms ease-in-out;
  }
}

.group {
  padding: 10px 0;
  transition: 200ms;

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
