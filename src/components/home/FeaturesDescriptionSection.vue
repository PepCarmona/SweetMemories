<script setup lang="ts">
import BlobOne from '../ui/icons/BlobOne.vue';
import BlobThree from '../ui/icons/BlobThree.vue';
import BlobTwo from '../ui/icons/BlobTwo.vue';
</script>

<template>
  <section class="features-description-section">
    <div class="feature-description store">
      <BlobOne class="blob" />
      <h3 class="title">Contenido Centralizado</h3>
      <div class="description">
        Todas tus fotos y videos de tu bebé en un solo lugar, organizados y
        fácilmente accesibles. Ya no tendrás que buscar en diferentes
        dispositivos o plataformas. Todo está aquí, en un solo espacio seguro.
      </div>
    </div>

    <div class="feature-description share">
      <BlobTwo class="blob" />
      <h3 class="title">Compartir con Confianza</h3>
      <div class="description">
        Comparte las sonrisas y los primeros pasos de tu bebé solo con quienes
        más importan. Nuestro sistema te permite controlar con quién compartes
        cada recuerdo, asegurando que solo tu círculo íntimo pueda verlos.
      </div>
    </div>

    <div class="feature-description contribute">
      <BlobThree class="blob" />
      <h3 class="title">Contribuciones Familiares</h3>
      <div class="description">
        Permite que abuelos, tíos y amigos cercanos compartan sus propios
        momentos especiales con tu bebé, enriqueciendo el álbum familiar con
        múltiples perspectivas y recuerdos.
      </div>
    </div>

    <div class="feature-description security">
      <BlobOne class="blob" />
      <h3 class="title">Seguridad y Privacidad</h3>
      <div class="description">
        Protege tus fotos y videos en un espacio seguro, donde solo tú decides
        quién puede verlos. Nuestra infraestructura de almacenamiento cifrada
        garantiza que tus recuerdos estén siempre protegidos.
      </div>
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

  .feature-description {
    position: relative;
    text-align: center;
    padding: var(--space-md);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .blob {
      position: absolute;
      height: 100%;
      width: 50%;
      z-index: -1;
    }

    .title {
      font-weight: 600;
    }

    .description {
      margin-top: var(--space-lg);
    }

    &.store {
      .blob {
        color: var(--color-secondary-light);
        transform: rotate(90deg);
        left: 0;
        top: -20%;
      }
    }

    &.share {
      .blob {
        color: var(--color-tertiary-light);
        transform: rotate(115deg);
        right: -5%;
        top: -10%;
      }
    }

    &.contribute {
      .blob {
        color: var(--color-primary-light);
        transform: rotate(300deg);
        left: 15%;
        top: 10%;
      }
    }

    &.security {
      .blob {
        color: var(--color-secondary-light);
        transform: rotate(215deg);
        left: 45%;
        bottom: -10%;
      }
    }
  }

  @include breakpoint(sm) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    align-items: start;
    padding: var(--space-md) var(--space-xxxl);
  }
}
</style>
