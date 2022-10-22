<template>
  <div class="reg-auth">
    <div class="reg-auth__wrapper">
      <div class="reg-auth__item">
        <div class="content" @click="showReg = !showReg">
          <h1>Registration</h1>
          <p v-if="!showReg">If you don`t have an account</p>
        </div>
        <div class="reg-auth__form" v-if="showReg">
          <input type="text" placeholder="username">
          <input type="password" placeholder="password">
        </div>
      </div>
      <div class="reg-auth__item">
        <div class="content">
          <h1>Authorization</h1>
          <p>If you already have an account</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showReg = ref(false)
</script>

<style scoped lang="scss">
.reg-auth {
  min-height: 100vh;
  display: flex;
  align-items: center;

  &__wrapper {
    min-height: 60vh;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  &__item {
    padding: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &:first-child {
      border-right: 1px solid grey;
    }

    .content {
      cursor: pointer;
      text-align: center;
      transition: 200ms;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
  }
}
</style>
