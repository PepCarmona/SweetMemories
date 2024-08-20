<script setup lang="ts">
import BlobOne from '../ui/blobs/BlobOne.vue';
import BlobThree from '../ui/blobs/BlobThree.vue';
import BlobTwo from '../ui/blobs/BlobTwo.vue';
import ContributeIllustration from '../ui/illustrations/ContributeIllustration.vue';
import SecureIllustration from '../ui/illustrations/SecureIllustration.vue';
import ShareIllustration from '../ui/illustrations/ShareIllustration.vue';
import StoreIllustration from '../ui/illustrations/StoreIllustration.vue';
</script>

<template>
  <section class="features-description-section">
    <div class="feature-description store">
      <StoreIllustration class="illustration" />
      <BlobOne class="blob" />
      <div class="content">
        <h3 class="title">Contenido Centralizado</h3>
        <div class="description">
          Todas tus fotos y videos de tu bebé en un solo lugar, organizados y
          fácilmente accesibles. Ya no tendrás que buscar en diferentes
          dispositivos o plataformas. Todo está aquí, en un solo espacio seguro.
        </div>
      </div>
    </div>

    <div class="feature-description share">
      <BlobTwo class="blob" />
      <div class="content">
        <h3 class="title">Compartir con Confianza</h3>
        <div class="description">
          Comparte las sonrisas y los primeros pasos de tu bebé solo con quienes
          más importan. Nuestro sistema te permite controlar con quién compartes
          cada recuerdo, asegurando que solo tu círculo íntimo pueda verlos.
        </div>
      </div>
      <ShareIllustration class="illustration" />
    </div>

    <div class="feature-description contribute">
      <ContributeIllustration class="illustration" />
      <BlobThree class="blob" />
      <div class="content">
        <h3 class="title">Contribuciones Familiares</h3>
        <div class="description">
          Permite que abuelos, tíos y amigos cercanos compartan sus propios
          momentos especiales con tu bebé, enriqueciendo el álbum familiar con
          múltiples perspectivas y recuerdos.
        </div>
      </div>
    </div>

    <div class="feature-description security">
      <BlobOne class="blob" />
      <div class="content">
        <h3 class="title">Seguridad y Privacidad</h3>
        <div class="description">
          Protege tus fotos y videos en un espacio seguro, donde solo tú decides
          quién puede verlos. Nuestra infraestructura de almacenamiento cifrada
          garantiza que tus recuerdos estén siempre protegidos.
        </div>
      </div>
      <SecureIllustration class="illustration" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.features-description-section {
  margin-top: var(--space-xxxl);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  overflow: hidden;

  .feature-description {
    position: relative;
    padding: var(--space-md);
    display: flex;

    .illustration {
      height: 150px;
    }

    .content {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .title {
        font-weight: 600;
      }

      .description {
        margin-top: var(--space-lg);
      }
    }

    .blob {
      position: absolute;
      height: 100%;
      width: 50%;
      z-index: var(--layer-background);
      overflow: hidden;
    }

    &.store {
      .illustration {
        color: var(--color-secondary-dark);
      }

      .blob {
        color: var(--color-secondary-light);
        transform: rotate(90deg);
        left: 0;
        top: -15%;
      }
    }

    &.share {
      .illustration {
        color: var(--color-tertiary-dark);
      }

      .blob {
        color: var(--color-tertiary-light);
        transform: rotate(115deg);
        right: -5%;
        top: -10%;
      }
    }

    &.contribute {
      .illustration {
        color: var(--color-primary-dark);
      }

      .blob {
        color: var(--color-primary-light);
        transform: rotate(300deg);
        left: 15%;
        top: 10%;
      }
    }

    &.security {
      .illustration {
        color: var(--color-secondary-dark);
      }

      .blob {
        color: var(--color-secondary-light);
        transform: rotate(215deg);
        left: 45%;
        bottom: -10%;
      }
    }
  }

  @include breakpoint(md) {
    padding: var(--space-md) var(--space-xxxl);
  }
}
</style>
