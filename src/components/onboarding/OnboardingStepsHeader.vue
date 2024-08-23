<script setup lang="ts">
import { useOnboardingStore } from '@/stores/onboardingStore';
import { OnboardingStep } from '@/types/onboarding';

interface OnboardingStepsHeaderProps {
  step: OnboardingStep;
}
const props = defineProps<OnboardingStepsHeaderProps>();

const onboardingStore = useOnboardingStore();
</script>

<template>
  <header class="onboarding-steps-header">
    <div
      v-for="stepConfig in onboardingStore.stepConfigs"
      :key="stepConfig.order"
      :class="{
        step: true,
        [stepConfig.name]: true,
        active: onboardingStore.isActiveStep(stepConfig, props.step),
        selected: props.step === stepConfig.name,
      }"
    >
      <div class="bullet">
        <component :is="stepConfig.blobComponent" class="blob" />
        {{ stepConfig.order }}
      </div>
      <div class="description">{{ stepConfig.description }}</div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.onboarding-steps-header {
  --bullet-size: 30px;
  --gap: var(--space-sm);

  display: flex;
  gap: var(--gap);
  width: 100%;

  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .bullet {
      position: relative;
      height: var(--bullet-size);
      width: var(--bullet-size);
      display: flex;
      align-items: center;
      justify-content: center;

      font-size: var(--font-size-sm);
      font-weight: 600;
      color: var(--color-primary-light);

      .blob {
        display: none;
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
        color: var(--color-primary);

        .blob {
          color: var(--color-primary);
        }
      }

      .description {
        color: var(--color-primary);
      }
    }

    &.selected {
      .bullet {
        color: var(--color-light);

        .blob {
          display: block;
        }
      }

      .description {
        color: var(--color-primary);
      }
    }

    &:not(:first-child) {
      position: relative;

      &::before {
        content: '';
        position: absolute;
        height: 1px;
        width: calc(100% - var(--bullet-size) * 2 + var(--gap));

        top: calc(var(--bullet-size) / 2);
        right: 50%;
        transform: translate(calc(var(--bullet-size) * -1), -50%);
        background-color: var(--color-primary-light);
      }

      &.active {
        &::before {
          background-color: var(--color-primary);
        }
      }
    }

    &.profile {
      .bullet {
        .blob {
          transform: scale(0.9) rotate(80deg);
        }
      }
    }

    &.family {
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
