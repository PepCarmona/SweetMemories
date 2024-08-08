<script setup lang="ts">
import { AuthStep } from '@/types/auth';
import AppButton from '../ui/AppButton.vue';
import AppInputMail from '../ui/AppInputMail.vue';
import AppInputPassword from '../ui/AppInputPassword.vue';
</script>

<template>
  <form class="signup-form">
    <h1 class="title">Bienvenido de nuevo</h1>

    <h2 class="subtitle">
      Accede a tu cuenta y sigue compartiendo y disfrutando de tus recuerdos
      familiares.
    </h2>

    <div class="inputs">
      <div class="input">
        <label class="label" for="mail">Correo electrónico</label>
        <AppInputMail
          placeholder="Introduce tu correo electrónico"
          name="mail"
          required
        />
      </div>

      <div class="input">
        <label class="label" for="password">Contraseña</label>
        <AppInputPassword
          placeholder="Introduce tu contraseña"
          name="password"
          required
        />
        <AppButton
          class="forgot-password"
          variant="link"
          :to="{
            name: '/auth/[step]',
            params: { step: AuthStep.PasswordRecovery },
          }"
        >
          ¿Olvidaste la contraseña?
        </AppButton>
      </div>
    </div>

    <div class="buttons">
      <AppButton variant="primary" size="large">Inicia sesión</AppButton>
    </div>

    <div class="switch-auth-mode">
      <span>¿Aún no tienes una cuenta?</span>
      &nbsp;
      <AppButton
        variant="link"
        :to="{ name: '/auth/[step]', params: { step: AuthStep.Signup } }"
      >
        Regístrate
      </AppButton>
    </div>
  </form>
</template>

<style scoped lang="scss">
.signup-form {
  text-align: center;
  max-width: var(--breakpoint-xs);

  .title {
    font-family: var(--font-family-title);
    font-size: var(--font-size-xl);
    font-weight: 600;
  }

  .subtitle {
    font-family: var(--font-family-title);
    font-size: var(--font-size-md);
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

      .forgot-password {
        margin-left: auto;
      }
    }
  }

  .buttons {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .switch-auth-mode {
    margin-top: var(--space-lg);
  }
}
</style>
