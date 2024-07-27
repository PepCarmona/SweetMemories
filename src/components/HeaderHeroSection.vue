<script setup lang="ts"></script>

<template>
  <section class="header-hero-section">
    <nav class="navigation-bar"></nav>
    <div class="hero-background">
      <div class="figure-1"></div>
      <div class="figure-2"></div>
      <div class="figure-3"></div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.header-hero-section {
  overflow: hidden;
  .hero-background {
    position: relative;
    height: 100%;
    width: 100%;
    .figure-1 {
      position: absolute;
      height: 100%;
      width: 100%;
      background: linear-gradient(
        135deg,
        hsla(248, 53%, 79%, 1) 0%,
        hsla(247, 45%, 66%, 1) 20%,
        hsla(248, 37%, 53%, 1) 70%
      );
    }
    .figure-2 {
      position: absolute;
      height: 80%;
      width: 50%;
      transform: rotate(15deg);
      bottom: -20%;
      left: -20%;
      background: linear-gradient(
        45deg,
        hsla(57, 100%, 86%, 1) 20%,
        hsla(57, 100%, 79%, 1) 40%,
        hsla(57, 100%, 72%, 1) 80%
      );
    }
    .figure-3 {
      position: absolute;
      height: 150%;
      width: 30%;
      transform: rotate(15deg);
      right: -10%;
      background: linear-gradient(
        315deg,
        hsla(38, 100%, 86%, 1) 20%,
        hsla(37, 100%, 79%, 1) 40%,
        hsla(37, 100%, 72%, 1) 80%
      );
    }
  }
}
</style>
