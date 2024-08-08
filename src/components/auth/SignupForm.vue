<script setup lang="ts">
import { AuthStep } from '@/types/auth';
import AppButton from '../ui/AppButton.vue';
import AppInputMail from '../ui/AppInputMail.vue';
import AppInputPassword from '../ui/AppInputPassword.vue';
import AppInputText from '../ui/AppInputText.vue';
</script>

<template>
  <form class="signup-form">
    <h1 class="title">Crea tu cuenta</h1>

    <h2 class="subtitle">
      Empieza a compartir fotos y vídeos de tu bebé con familiares y amigos de
      forma segura.
    </h2>

    <div class="inputs">
      <div class="input">
        <label class="label" for="name">Nombre</label>
        <AppInputText
          placeholder="Introduce tu nombre"
          name="Nombre"
          required
        />
      </div>

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
      </div>

      <div class="input">
        <label class="label" for="confirm-password">Confirmar contraseña</label>
        <AppInputPassword
          placeholder="Introduce de nuevo tu contraseña"
          name="confirm-password"
          required
        />
      </div>
    </div>

    <div class="buttons">
      <AppButton variant="primary" size="medium"> Crear cuenta </AppButton>
    </div>

    <div class="switch-auth-mode">
      <span>¿Ya tienes una cuenta?</span>
      &nbsp;
      <AppButton
        variant="link"
        :to="{ name: '/auth/[step]', params: { step: AuthStep.Login } }"
      >
        Inicia sesión
      </AppButton>
    </div>
  </form>
</template>

<style scoped lang="scss">
.signup-form {
  text-align: center;
  width: 100%;

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
