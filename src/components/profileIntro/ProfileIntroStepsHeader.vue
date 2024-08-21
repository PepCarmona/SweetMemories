<script setup lang="ts">
import { ProfileIntroStep } from '@/types/profileIntro';
import BlobOne from '../ui/blobs/BlobOne.vue';
import BlobThree from '../ui/blobs/BlobThree.vue';
import BlobTwo from '../ui/blobs/BlobTwo.vue';

interface ProfileIntroStepsHeaderProps {
  step: ProfileIntroStep;
}
const props = defineProps<ProfileIntroStepsHeaderProps>();
</script>

<template>
  <header class="profile-intro-steps-header">
    <div class="step signup-step active">
      <div class="bullet">
        <BlobOne class="blob" />
        1
      </div>
      <div class="description">Regístrate</div>
    </div>

    <div class="progress-bar" />

    <div class="step profile-step active">
      <div class="bullet">
        <BlobTwo class="blob" />
        2
      </div>
      <div class="description">Completa tu perfil</div>
    </div>

    <div class="progress-bar" />

    <div
      :class="{
        step: true,
        'family-step': true,
        active: props.step === ProfileIntroStep.AddFamily,
      }"
    >
      <div class="bullet">
        <BlobThree class="blob" />
        3
      </div>
      <div class="description">Añade una familia</div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.profile-intro-steps-header {
  display: flex;

  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100% / 3);

    .bullet {
      position: relative;
      height: 40px;
      width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: var(--color-light);

      .blob {
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: var(--layer-background);
        color: var(--color-primary);
      }
    }

    .description {
      text-align: center;
      margin-top: var(--space-xxxs);
      font-size: var(--font-size-sm);
      color: var(--color-primary);
    }

    &:not(.active) {
      .bullet {
        .blob {
          color: var(--color-mid);
        }
      }

      .description {
        color: var(--color-mid);
      }
    }

    &.profile-step {
      .bullet {
        .blob {
          transform: scale(0.9) rotate(80deg);
        }
      }
    }

    &.family-step {
      .bullet {
        .blob {
          transform: scale(0.9);
        }
      }
    }
  }
}
</style>
