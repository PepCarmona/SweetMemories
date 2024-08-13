<template>
  <div class="app-logo">Cudlo</div>
</template>

<style scoped lang="scss">
.app-logo {
  font-family: var(--font-family-logo);
  font-size: var(--font-size-xxl);
  line-height: 1;

  background: url('../../assets/logo-bg.svg');
  background-clip: text;
  color: transparent;
  background-position: 4% 32%;
  filter: brightness(90%);

  transition: background ease 200ms;

  @include on-hover {
    background-position: center 32%;
  }
}
</style>
