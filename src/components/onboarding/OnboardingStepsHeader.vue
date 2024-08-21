<script setup lang="ts">
import { OnboardingStep } from '@/types/onboarding';
import BlobOne from '../ui/blobs/BlobOne.vue';
import BlobThree from '../ui/blobs/BlobThree.vue';
import BlobTwo from '../ui/blobs/BlobTwo.vue';

interface OnboardingStepsHeaderProps {
  step: OnboardingStep;
}
const props = defineProps<OnboardingStepsHeaderProps>();
</script>

<template>
  <header class="onboarding-steps-header">
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
        active: props.step === OnboardingStep.AddFamily,
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
.onboarding-steps-header {
  --bullet-size: 30px;

  display: flex;

  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100% / 3);

    .bullet {
      position: relative;
      height: var(--bullet-size);
      width: var(--bullet-size);
      display: flex;
      align-items: center;
      justify-content: center;

      font-size: var(--font-size-sm);
      font-weight: 600;
      color: var(--color-light);

      .blob {
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: var(--layer-background);
        color: var(--color-primary-light);
      }
    }

    .description {
      text-align: center;
      margin-top: var(--space-xxxs);
      font-size: var(--font-size-sm);
      color: var(--color-primary-light);
    }

    &.active {
      .bullet {
        .blob {
          color: var(--color-primary);
        }
      }

      .description {
        color: var(--color-primary);
      }
    }

    &:not(:first-child) {
      position: relative;

      &::after {
        content: '';
        position: absolute;
        height: 1px;
        width: calc(100% - var(--bullet-size) * 2);

        top: calc(var(--bullet-size) / 2);
        right: 50%;
        transform: translate(calc(var(--bullet-size) * -1), -50%);
        background-color: var(--color-primary-light);
      }

      &.active {
        &::after {
          background-color: var(--color-primary);
        }
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

  @include breakpoint(md) {
    --bullet-size: 40px;

    .step {
      .bullet {
        font-size: var(--font-size-md);
      }
    }
  }
}
</style>
