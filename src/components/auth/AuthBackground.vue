<script setup lang="ts">
import BlobOne from '@/components/ui/blobs/BlobOne.vue';
import BlobThree from '@/components/ui/blobs/BlobThree.vue';
import BlobTwo from '@/components/ui/blobs/BlobTwo.vue';
</script>

<template>
  <div class="auth-background">
    <BlobOne class="blob one" />
    <BlobTwo class="blob two" />
    <BlobThree class="blob three" />
    <BlobOne class="blob four" />
    <BlobTwo class="blob five" />
    <BlobThree class="blob six" />
    <BlobOne class="blob seven" />
    <BlobTwo class="blob eight" />
    <BlobThree class="blob nine" />
    <BlobOne class="blob ten" />
    <BlobTwo class="blob eleven" />
    <BlobThree class="blob twelve" />
  </div>
</template>

<style scoped lang="scss">
.auth-background {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: var(--layer-background);

  .blob {
    position: absolute;
    height: 150px;
    width: 150px;
    filter: blur(40px);

    &.one {
      top: 5%;
      left: 10%;
      color: var(--color-primary);
    }

    &.two {
      top: 50%;
      left: 64%;
      color: var(--color-primary);
    }

    &.three {
      top: 65%;
      left: -8%;
      color: var(--color-primary);
    }

    &.four {
      top: 42%;
      left: 0%;
      transform: rotate(28deg);
      color: var(--color-primary);
    }

    &.five {
      top: 39%;
      right: 17%;
      transform: rotate(84deg);
      color: var(--color-secondary);
    }

    &.six {
      top: 93%;
      left: 38%;
      transform: rotate(147deg);
      color: var(--color-secondary);
    }

    &.seven {
      bottom: -2%;
      left: -7%;
      transform: rotate(39deg);
      color: var(--color-secondary);
    }

    &.eight {
      top: 17%;
      left: 66%;
      transform: rotate(208deg);
      color: var(--color-secondary);
    }

    &.nine {
      top: 28%;
      left: -3%;
      transform: rotate(106deg);
      color: var(--color-tertiary);
    }

    &.ten {
      top: -3%;
      right: -5%;
      transform: rotate(240deg);
      color: var(--color-tertiary);
    }

    &.eleven {
      top: 84%;
      left: 73%;
      transform: rotate(17deg);
      color: var(--color-tertiary);
    }

    &.twelve {
      top: 73%;
      left: 10%;
      transform: rotate(99deg);
      color: var(--color-tertiary);
    }
  }
}
</style>
