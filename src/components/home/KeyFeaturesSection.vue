<script setup lang="ts">
import PrivacyIcon from '../ui/icons/PrivacyIcon.vue';
import ShareIcon from '../ui/icons/ShareIcon.vue';
import LockIcon from '../ui/icons/LockIcon.vue';
import BlobOne from '../ui/icons/BlobOne.vue';
import BlobTwo from '../ui/icons/BlobTwo.vue';
import BlobThree from '../ui/icons/BlobThree.vue';
</script>

<template>
  <section class="key-features-section">
    <div class="key-feature">
      <div class="icon-wrapper share">
        <BlobOne class="blob" />
        <ShareIcon class="icon" />
      </div>

      <div class="description">
        Comparte fotos y videos en segundos con tu familia y amigos cercanos,
        sin complicaciones.
      </div>
    </div>
    <div class="key-feature">
      <div class="icon-wrapper privacy">
        <BlobTwo class="blob" />
        <PrivacyIcon class="icon" />
      </div>

      <div class="description">
        Tú eliges quién puede ver tus fotos y videos, con configuraciones de
        privacidad simples y efectivas.
      </div>
    </div>
    <div class="key-feature">
      <div class="icon-wrapper safe">
        <BlobThree class="blob" />
        <LockIcon class="icon" />
      </div>

      <div class="description">
        Mantén tus recuerdos seguros con nuestra infraestructura de
        almacenamiento cifrada.
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.key-features-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xxl);
  margin-top: var(--space-xxxl);
  padding: var(--space-md);

  .key-feature {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;

    .icon-wrapper {
      position: relative;
      width: 80px;
      height: 80px;

      .icon,
      .blob {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      &.share {
        .blob {
          color: var(--color-secondary-light);
        }
        .icon {
          color: var(--color-secondary-dark);
        }
      }

      &.privacy {
        .blob {
          color: var(--color-tertiary-light);
        }
        .icon {
          color: var(--color-tertiary-dark);
        }
      }

      &.safe {
        .blob {
          color: var(--color-primary-light);
        }
        .icon {
          color: var(--color-primary-dark);
        }
      }
    }

    .description {
      margin-top: var(--space-lg);
      text-align: center;
    }
  }

  @include breakpoint(md) {
    flex-direction: row;
    align-items: flex-start;

    .key-feature {
      width: unset;
    }
  }
}
</style>
