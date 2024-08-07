<script setup lang="ts">
import AppButton from '../ui/AppButton.vue';
import AppInputMail from '../ui/AppInputMail.vue';
import AppInputPassword from '../ui/AppInputPassword.vue';
import AppInputText from '../ui/AppInputText.vue';
import FacebookIcon from '../ui/icons/FacebookIcon.vue';
import GoogleIcon from '../ui/icons/GoogleIcon.vue';
</script>

<template>
  <form class="signup-form">
    <h1 class="title">Crea tu cuenta</h1>

    <h2 class="subtitle">
      Empieza a compartir fotos y vídeos de tu bebé con familiares y amigos de
      forma segura.
    </h2>

    <div class="inputs">
      <div class="input name">
        <label class="label" for="name">Nombre</label>
        <AppInputText
          placeholder="Introduce tu nombre"
          name="Nombre"
          required
        />
      </div>

      <div class="input mail">
        <label class="label" for="mail">Correo electrónico</label>
        <AppInputMail
          placeholder="Introduce tu correo electrónico"
          name="mail"
          required
        />
      </div>

      <div class="input password">
        <label class="label" for="password">Contraseña</label>
        <AppInputPassword
          placeholder="Introduce tu contraseña"
          name="password"
          required
        />
      </div>

      <div class="input confirm-password">
        <label class="label" for="confirm-password">Confirmar contraseña</label>
        <AppInputPassword
          placeholder="Introduce de nuevo tu contraseña"
          name="confirm-password"
          required
        />
      </div>
    </div>

    <div class="buttons">
      <AppButton variant="primary" size="large"> Crear cuenta </AppButton>
      <AppButton class="oauth-button" variant="dark-outlined" size="large">
        <GoogleIcon class="oauth-icon" />
        <span class="oauth-text">Crear cuenta con Google</span>
      </AppButton>
      <AppButton class="oauth-button" variant="dark-outlined" size="large">
        <FacebookIcon class="oauth-icon" />
        <span class="oauth-text">Crear cuenta con Facebook</span>
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
    }
  }

  .buttons {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);

    .oauth-button {
      display: flex;
      align-items: center;
      padding-left: var(--space-md);
      font-size: var(--font-size-md);

      .oauth-icon {
        height: var(--space-lg);
      }
      .oauth-text {
        flex-grow: 1;
      }
    }
  }
}
</style>
