<template>
  <Transition name="slide-down">
    <slot />
  </Transition>
</template>

<style lang="scss">
.slide-down-enter-active {
  transition: all 200ms ease;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-100px);
}
</style>
