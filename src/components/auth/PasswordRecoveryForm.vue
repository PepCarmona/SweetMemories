<script setup lang="ts">
import { AuthStep } from '@/types/auth';
import AppButton from '../ui/AppButton.vue';
import AppInputMail from '../ui/AppInputMail.vue';
</script>

<template>
  <form class="password-recovery-form">
    <h1 class="title">Recupera tu contraseña</h1>

    <div class="inputs">
      <div class="input">
        <label class="label" for="mail">Correo electrónico</label>
        <AppInputMail
          placeholder="Introduce tu correo electrónico"
          name="mail"
          required
        />
      </div>
    </div>

    <div class="buttons">
      <AppButton variant="primary" size="large">
        Enviar link de recuperación
      </AppButton>
      <AppButton
        variant="link"
        :to="{ name: '/auth/[step]', params: { step: AuthStep.Login } }"
      >
        Go back
      </AppButton>
    </div>
  </form>
</template>

<style scoped lang="scss">
.password-recovery-form {
  text-align: center;
  max-width: var(--breakpoint-xs);

  .title {
    font-family: var(--font-family-title);
    font-size: var(--font-size-xl);
    font-weight: 600;
  }

  .inputs {
    margin-top: var(--space-lg);
    margin-bottom: var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);

    .input {
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: var(--space-xs);

      .label {
        font-weight: 600;
        margin-left: var(--space-xs);
      }
    }
  }

  .buttons {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }
}
</style>
