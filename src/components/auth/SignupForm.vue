<script setup lang="ts">
import { AuthStatus, type AuthUser } from '@/types/auth';
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
import FormLayout from '@/layouts/FormLayout.vue';
import ArrowIcon from '../ui/icons/ArrowIcon.vue';
import { useOnboardingStore } from '@/stores/onboardingStore';

const { defineField, handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(
    z.object<TypeToZod<AuthUser>>({
      email: z.string({ required_error: 'Email is required' }).email(),
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
const [password, passwordProps] = defineField('password', {
  props: (state): AppInputProps => ({ validationError: state.errors[0] }),
});

// TODO: move stores to page level
const authStore = useAuthStore();
const onboardingStore = useOnboardingStore();

const { cloned: initialAuthStatus } = useCloned(authStore.authStatus);
const shouldShowPassword = ref(false);

const onSubmit = handleSubmit(async ({ email, password }) =>
  // TODO: handle specific error codes text in signup, login and passwordRecovery (user_already_exists)
  {
    await authStore.signUp({ email, password });

    onboardingStore.nextStep();
  }
);
</script>

<template>
  <!-- TODO: Move to global component with dedicated store -->
  <AppToast
    :should-show="authStore.authStatus === AuthStatus.FailedToSignUp"
    variant="error"
    @close="authStore.authStatus = initialAuthStatus"
  >
    Ha habido un problema al intentar registrarte. Por favor, inténtalo de nuevo
    más adelante.
  </AppToast>

  <FormLayout class="signup-form" @submit="onSubmit" novalidate>
    <template #title>¡Empecemos por lo básico!</template>

    <template #subtitle>
      Crea tu cuenta para comenzar a guardar y compartir recuerdos.
    </template>

    <template #inputs>
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
    </template>

    <template #buttons>
      <AppButton
        variant="primary"
        size="medium"
        :state="isSubmitting ? 'loading' : undefined"
      >
        Continuar
        <template #rightIcon>
          <ArrowIcon class="icon" />
        </template>
      </AppButton>

      <div class="switch-auth-mode">
        <span>¿Ya tienes una cuenta?</span>
        &nbsp;
        <AppButton variant="link" to="/auth/login"> Inicia sesión </AppButton>
      </div>
    </template>
  </FormLayout>
</template>

<style scoped lang="scss">
.signup-form {
  .show-password {
    margin-top: var(--space-xs);
    width: fit-content;
  }
}
</style>
