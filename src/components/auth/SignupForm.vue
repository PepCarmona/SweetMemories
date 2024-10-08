<script setup lang="ts">
import { AuthStatus, AuthStep, type SignupUser } from '@/types/auth';
import AppButton from '../ui/AppButton.vue';
import AppInput, { type AppInputProps } from '../ui/AppInput.vue';
import AppCheckbox from '../ui/AppCheckbox.vue';
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import type { TypeToZod } from '@/types/utils';
import { toTypedSchema } from '@vee-validate/zod';
import { useAuthStore } from '@/stores/authStore';
import AppToast from '../ui/AppToast.vue';
import { useCloned } from '@vueuse/core';
import { useNavigationStore } from '@/stores/navigationStore';

const { defineField, handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(
    z.object<TypeToZod<SignupUser>>({
      email: z.string({ required_error: 'Email is required' }).email(),
      name: z.string({ required_error: 'Name is required' }),
      password: z
        .string({ required_error: 'Password is required' })
        .min(6, 'Password must contain at least 6 characters')
        .max(16, 'Password must contain less than 16 characters')
        .regex(new RegExp(/[0-9]/), 'Password must contain at least one number')
        .regex(
          new RegExp(/[!@#$&*.]/),
          'Password must contain at least one special character'
        ),
    })
  ),
});

const [email, emailProps] = defineField('email', {
  props: (state): AppInputProps => ({ validationError: state.errors[0] }),
});
const [name, nameProps] = defineField('name', {
  props: (state): AppInputProps => ({ validationError: state.errors[0] }),
});
const [password, passwordProps] = defineField('password', {
  props: (state): AppInputProps => ({ validationError: state.errors[0] }),
});

// TODO: move stores to page level
const authStore = useAuthStore();
const navigationStore = useNavigationStore();

const { cloned: initialAuthStatus } = useCloned(authStore.authStatus);
const shouldShowPassword = ref(false);

const onSubmit = handleSubmit(async ({ name, email, password }) =>
  // TODO: handle specific error codes text in signup, login and passwordRecovery
  {
    await authStore.signUp({ name, email, password });

    await navigationStore.navigateToFeedPage();
  }
);
</script>

<template>
  <form class="signup-form" @submit="onSubmit" novalidate>
    <AppToast
      :should-show="authStore.authStatus === AuthStatus.FailedToSignUp"
      variant="error"
      @close="authStore.authStatus = initialAuthStatus"
    >
      Ha habido un problema al intentar registrarte. Por favor, inténtalo de
      nuevo más adelante.
    </AppToast>

    <h1 class="title">Crea tu cuenta</h1>

    <h2 class="subtitle">
      Empieza a compartir fotos y vídeos de tu bebé con familiares y amigos de
      forma segura.
    </h2>

    <div class="inputs">
      <AppInput
        placeholder="Introduce tu nombre"
        name="name"
        type="text"
        v-model="name"
        v-bind="nameProps"
      >
        Nombre
      </AppInput>

      <AppInput
        placeholder="Introduce tu correo electrónico"
        name="mail"
        type="email"
        v-model="email"
        v-bind="emailProps"
      >
        Correo electrónico
      </AppInput>

      <div>
        <AppInput
          placeholder="Introduce tu contraseña"
          name="password"
          type="password"
          v-model="password"
          v-bind="passwordProps"
          :should-show-password="shouldShowPassword"
        >
          Contraseña
        </AppInput>

        <!-- TODO: Add live password validation in popup -->
        <AppCheckbox class="show-password" v-model="shouldShowPassword">
          Mostrar contraseña
        </AppCheckbox>
      </div>
    </div>

    <div class="buttons">
      <AppButton
        variant="primary"
        size="medium"
        :state="isSubmitting ? 'loading' : undefined"
      >
        Crear cuenta
      </AppButton>
    </div>

    <div class="switch-auth-mode">
      <span>¿Ya tienes una cuenta?</span>
      &nbsp;
      <AppButton
        variant="link"
        :to="{ name: 'auth', params: { step: AuthStep.Login } }"
      >
        Inicia sesión
      </AppButton>
    </div>
  </form>
</template>

<style scoped lang="scss">
// TODO: extract common styles of signup login and passwordRecovery into layout component
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

    .show-password {
      margin-top: var(--space-xs);
      width: fit-content;
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
