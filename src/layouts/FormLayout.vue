<script setup lang="ts">
interface FormLayoutProps {
  novalidate: boolean;
}
const props = defineProps<FormLayoutProps>();

interface FormLayoutEmits {
  (eventName: 'submit', eventValue: Event): void;
}
const emit = defineEmits<FormLayoutEmits>();
</script>

<template>
  <form
    class="form-layout"
    @submit="emit('submit', $event)"
    :novalidate="props.novalidate"
  >
    <h1 class="title"><slot name="title" /></h1>

    <h2 class="subtitle">
      <slot name="subtitle" />
    </h2>

    <div class="inputs">
      <slot name="inputs" />
    </div>

    <div class="buttons">
      <slot name="buttons" />
    </div>
  </form>
</template>

<style scoped lang="scss">
.form-layout {
  text-align: center;
  width: 100%;

  .title {
    font-family: var(--font-family-title);
    font-size: var(--font-size-xl);
    font-weight: 600;
  }

  .subtitle {
    font-family: var(--font-family-title);
    font-size: var(--font-size-md);
  }

  .inputs {
    margin-top: var(--space-lg);
    margin-bottom: var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }

  .buttons {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }
}
</style>
