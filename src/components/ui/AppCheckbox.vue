<script setup lang="ts">
import { onKeyPressed, useFocus } from '@vueuse/core';
import CheckmarkIcon from './icons/CheckmarkIcon.vue';
import { ref } from 'vue';

const model = defineModel<boolean>();

const nativeInput = ref<HTMLInputElement>();

const id = self.crypto.randomUUID();

const { focused } = useFocus(nativeInput);

onKeyPressed('Enter', () => {
  if (focused) {
    model.value = !model.value;
  }
});
</script>

<template>
  <div class="app-checkbox">
    <div :class="{ 'input-wrapper': true, checked: !!model, focused }">
      <input
        ref="nativeInput"
        class="native-input"
        type="checkbox"
        v-model="model"
        :id="id"
      />
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

    transition: background ease 200ms;

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

    &.focused {
      outline: 3px solid var(--color-tertiary);
    }
  }

  .label {
    padding-left: var(--space-xs);
  }
}
</style>
