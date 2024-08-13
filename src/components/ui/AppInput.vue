<script setup lang="ts">
import type { PickStringLiteral } from '@/types/utils';
import { computed, type InputTypeHTMLAttribute } from 'vue';
import ErrorIcon from './icons/ErrorIcon.vue';

type TextInputType = PickStringLiteral<
  InputTypeHTMLAttribute,
  'text' | 'email' | 'password'
>;

export interface AppInputProps {
  name?: string;
  type?: TextInputType;
  placeholder?: string;
  validationError?: string;
  shouldShowPassword?: boolean;
}
const props = withDefaults(defineProps<AppInputProps>(), {
  type: 'text',
});

const model = defineModel();
const slots = defineSlots();

const id = self.crypto.randomUUID();

const boundProps = computed<AppInputProps>(() => ({
  name: props.name,
  placeholder: props.placeholder,
}));

const inputType = computed<TextInputType>(() => {
  if (props.type !== 'password') {
    return props.type;
  }

  return props.shouldShowPassword ? 'text' : 'password';
});

const hasLabelSlot = computed<boolean>(() => !!slots['default']);
</script>

<template>
  <div class="app-input-text">
    <label v-if="hasLabelSlot" :for="id"><slot /></label>
    <input
      :id="id"
      :class="{ invalid: !!props.validationError }"
      v-model="model"
      v-bind="boundProps"
      :type="inputType"
    />
    <!-- TODO: Avoid layout shift and add transition -->
    <div v-if="!!props.validationError" class="error">
      <ErrorIcon class="icon" />
      {{ props.validationError }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-input-text {
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  text-align: start;

  label {
    font-weight: 600;
    margin-left: var(--space-xs);
    margin-bottom: var(--space-xs);
  }

  input {
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--space-xs);
    border: 1px solid var(--color-mid-light);
    font-size: var(--font-size-md);
    width: 100%;
    color: var(--color-dark);

    &:focus {
      outline: 3px solid var(--color-tertiary);

      &::placeholder {
        visibility: hidden;
      }
    }

    &::placeholder {
      color: var(--color-mid);
    }

    &.invalid {
      border-color: var(--color-error);
    }
  }

  .error {
    display: flex;
    align-items: center;
    gap: var(--space-xxxs);

    font-size: var(--font-size-sm);
    color: var(--color-error);

    margin-top: var(--space-xxxs);

    .icon {
      height: var(--font-size-sm);
      width: var(--font-size-sm);
    }
  }
}
</style>
