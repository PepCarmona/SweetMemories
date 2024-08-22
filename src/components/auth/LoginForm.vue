<script setup lang="ts">
import { AuthStatus, AuthStep, type AuthUser } from '@/types/auth';
import AppButton from '../ui/AppButton.vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import type { TypeToZod } from '@/types/utils';
import AppInput, { type AppInputProps } from '../ui/AppInput.vue';
import AppToast from '../ui/AppToast.vue';
import { useAuthStore } from '@/stores/authStore';
import { useCloned } from '@vueuse/core';
import { useNavigationStore } from '@/stores/navigationStore';
import FormLayout from '@/layouts/FormLayout.vue';

const { errors, defineField, handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(
    z.object<TypeToZod<AuthUser>>({
      email: z.string({ required_error: 'Email is required' }).email(),
      password: z
        .string({ required_error: 'Password is required' })
        .min(6, 'Password must contain at least 6 characters'),
    })
  ),
});

const [email, emailProps] = defineField('email', {
  props: (state): AppInputProps => ({ validationError: state.errors[0] }),
});
const [password, passwordProps] = defineField('password', {
  props: (state): AppInputProps => ({ validationError: state.errors[0] }),
});

const authStore = useAuthStore();
const navigationStore = useNavigationStore();

const { cloned: initialAuthStatus } = useCloned(authStore.authStatus);

const onSubmit = handleSubmit(async ({ email, password }) => {
  {
    await authStore.logIn({ email, password });

    await navigationStore.navigateToFeedPage();
  }
});
</script>

<template>
  <AppToast
    :should-show="authStore.authStatus === AuthStatus.FailedToLogIn"
    variant="error"
    @close="authStore.authStatus = initialAuthStatus"
  >
    Ha habido un problema al intentar iniciar sesión. Por favor, inténtalo de
    nuevo más adelante.
  </AppToast>

  <FormLayout class="login-form" @submit="onSubmit" novalidate>
    <template #title>Bienvenido de nuevo</template>

    <template #subtitle>
      Accede a tu cuenta y sigue compartiendo y disfrutando de tus recuerdos
      familiares.
    </template>

    <template #inputs>
      <AppInput
        placeholder="Introduce tu correo electrónico"
        name="mail"
        type="email"
        v-model="email"
        v-bind="emailProps"
        :invalid="!!errors.email"
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
          :invalid="!!errors.password"
        >
          Contraseña
        </AppInput>

        <AppButton
          class="forgot-password"
          variant="link"
          :to="{
            name: 'auth',
            params: { step: AuthStep.PasswordRecovery },
          }"
          size="small"
        >
          ¿Olvidaste la contraseña?
        </AppButton>
      </div>
    </template>

    <template #buttons>
      <AppButton
        variant="primary"
        size="medium"
        :state="isSubmitting ? 'loading' : undefined"
      >
        Inicia sesión
      </AppButton>

      <div class="switch-auth-mode">
        <span>¿Aún no tienes una cuenta?</span>
        &nbsp;
        <AppButton
          variant="link"
          :to="{ name: 'auth', params: { step: AuthStep.Signup } }"
        >
          Regístrate
        </AppButton>
      </div>
    </template>
  </FormLayout>
</template>

<style scoped lang="scss">
.login-form {
  .forgot-password {
    display: block;
    text-align: right;
    margin-left: auto;
  }
}
</style>
