<script setup lang="ts">
import CheckmarkIcon from './icons/CheckmarkIcon.vue';

const model = defineModel<boolean>();

const id = self.crypto.randomUUID();
</script>

<template>
  <div class="app-checkbox">
    <div :class="{ 'input-wrapper': true, checked: !!model }">
      <input class="native-input" type="checkbox" v-model="model" :id="id" />
      <CheckmarkIcon class="checkmark" />
    </div>

    <label class="label" :for="id">
      <slot />
    </label>
  </div>
</template>

<style scoped lang="scss">
.app-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;

  * {
    cursor: pointer;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--space-lg);
    width: var(--space-lg);
    border-radius: var(--space-xxs);
    background-color: white;
    border: 1px solid var(--color-mid-light);

    transition: all ease 200ms;

    .native-input {
      height: 100%;
      width: 100%;
      opacity: 0;
      position: absolute;
    }

    .checkmark {
      display: none;
    }

    &.checked {
      background-color: var(--color-dark);

      .checkmark {
        display: block;
        height: var(--space-sm);
        width: var(--space-sm);
        color: var(--color-light);
      }
    }
  }

  .label {
    padding-left: var(--space-xs);
  }
}
</style>
