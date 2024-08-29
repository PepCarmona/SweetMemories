<script setup lang="ts">
import Select, {
  type SelectPassThroughAttributes,
  type SelectPassThroughMethodOptions,
} from 'primevue/select';
import { computed, useSlots } from 'vue';

interface AppSelectProps {
  options: string[];
  placeholder?: string;
}
const props = defineProps<AppSelectProps>();

const model = defineModel<string>();
const slots = useSlots();

const id = self.crypto.randomUUID();

const hasLabelSlot = computed<boolean>(() => !!slots['default']);

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
      :placeholder="props.placeholder"
      :pt="{
        root: 'app-select-root',
        label: 'app-select-label',
        dropdown: 'app-select-dropdown',
        overlay: 'app-select-overlay',
        list: 'app-select-list',
        option: getOptionClass,
        optionLabel: 'app-select-option-label',
      }"
    />
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
}

.app-select-label {
  font-family: var(--font-family-body);
  font-size: var(--font-size-md);
  color: var(--color-mid);
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
      background-color: var(--color-tertiary);
    }
  }
}
</style>
