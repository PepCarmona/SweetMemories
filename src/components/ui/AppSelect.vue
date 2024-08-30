<script setup lang="ts">
import Select, {
  type SelectPassThroughAttributes,
  type SelectPassThroughMethodOptions,
} from 'primevue/select';
import { computed, useSlots } from 'vue';
import ErrorIcon from './icons/ErrorIcon.vue';

export interface AppSelectOption {
  value: string;
  label?: string;
}

interface AppSelectProps {
  options: AppSelectOption[];
  placeholder?: string;
  validationError?: string;
}
const props = defineProps<AppSelectProps>();

const model = defineModel<string>();
const slots = useSlots();

const id = self.crypto.randomUUID();

const hasLabelSlot = computed<boolean>(() => !!slots['default']);

function getOptionValue(option: AppSelectOption): string {
  return option.value;
}

function getOptionLabel(option: AppSelectOption): string {
  return option.label ?? option.value;
}

function getRootClass(
  options: SelectPassThroughMethodOptions<any>
): SelectPassThroughAttributes {
  return {
    class: [
      'app-select-root',
      {
        focused: options.state.focused,
        invalid: !!props.validationError,
      },
    ],
  };
}

function getLabelClass(): SelectPassThroughAttributes {
  return {
    class: [
      'app-select-label',
      {
        selected: !!model.value,
      },
    ],
  };
}

function getOptionClass(
  options: SelectPassThroughMethodOptions<any>
): SelectPassThroughAttributes {
  return {
    class: [
      'app-select-option',
      { focused: options.context.focused, selected: options.context.selected },
    ],
  };
}
</script>

<template>
  <div class="app-select">
    <label v-if="hasLabelSlot" :for="id"><slot /></label>
    <Select
      v-model="model"
      :options="props.options"
      :option-value="getOptionValue"
      :option-label="getOptionLabel"
      :placeholder="props.placeholder"
      :pt="{
        root: getRootClass,
        label: getLabelClass,
        dropdown: 'app-select-dropdown',
        overlay: 'app-select-overlay',
        list: 'app-select-list',
        option: getOptionClass,
        optionLabel: 'app-select-option-label',
      }"
    />
    <!-- TODO: Avoid layout shift and add transition -->
    <div v-if="!!props.validationError" class="error">
      <ErrorIcon class="icon" />
      {{ props.validationError }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-select {
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

<style lang="scss">
.app-select-root {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--space-xs);
  border: 1px solid var(--color-mid-light);
  font-size: var(--font-size-md);
  color: var(--color-dark);
  background-color: var(--color-lightest);

  &.focused {
    outline: 3px solid var(--color-tertiary);
  }

  &.invalid {
    border-color: var(--color-error);
  }
}

.app-select-label {
  font-family: var(--font-family-body);
  font-size: var(--font-size-md);
  color: var(--color-mid);
  outline: none;

  &.selected {
    color: var(--color-dark);
  }
}

.app-select-dropdown {
  color: var(--color-dark);
  height: 1em;
  width: 1em;
}

.app-select-overlay {
  background-color: var(--color-lightest);
  border-radius: var(--space-xs);
  border: 1px solid var(--color-mid-light);

  margin-top: var(--space-xxxs);
  box-shadow: 0 2px 8px var(--color-mid-light);
  padding: var(--space-xxxs);
}

.app-select-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-xxxs);
}

.app-select-option {
  padding: var(--space-xxxs) var(--space-sm);
  border-radius: var(--space-xxxs);

  cursor: pointer;

  &.focused {
    background-color: var(--color-light);
  }

  &.selected {
    background-color: var(--color-tertiary-dark);
    color: var(--color-light);

    &.focused {
      background-color: var(--color-tertiary-semi-dark);
    }
  }
}
</style>
