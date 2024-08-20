<script setup lang="ts">
import AppButton from '../ui/AppButton.vue';
</script>

<template>
  <section class="welcome-section">
    <h1 class="title">¡Qué alegría tenerte aquí!</h1>

    <div class="create-family-section">
      <p class="description">
        ¿Eres el primero en tu familia en unirse? Crea una nueva familia, invita
        a tus seres queridos, y empieza a subir fotos y videos.
      </p>
      <AppButton variant="primary" size="medium">Crear Nueva Familia</AppButton>
    </div>

    <div class="separator">
      <span class="line" />
      <span class="text">O</span>
      <span class="line" />
    </div>

    <div class="join-family-section">
      <p class="description">
        ¿Ya tienes familiares aquí? Únete a su familia y empieza a compartir
        momentos juntos.
      </p>
      <AppButton variant="primary-outlined" size="medium">
        Unirse a una Familia
      </AppButton>
    </div>

    <div class="note">
      Puedes hacer esto en cualquier momento desde la sección
      <AppButton variant="link" size="small">Gestión Familiar</AppButton>
      en el menú principal.
    </div>
  </section>
</template>

<style scoped lang="scss">
.welcome-section {
  text-align: center;

  .title {
    font-family: var(--font-family-title);
    font-size: var(--font-size-xxl);
    margin-bottom: var(--space-lg);
  }

  .create-family-section,
  .join-family-section {
    .description {
      margin-bottom: var(--space-sm);
    }
  }

  .separator {
    display: flex;
    align-items: center;
    margin: var(--space-lg) auto;

    .line {
      height: 1px;
      width: 100%;
      margin: var(--space-xxs);
      background-color: var(--color-mid);
    }

    .text {
      color: var(--color-mid);
    }
  }

  .note {
    margin-top: var(--space-lg);
    color: var(--color-mid);
    font-size: var(--font-size-sm);
  }
}
</style>
