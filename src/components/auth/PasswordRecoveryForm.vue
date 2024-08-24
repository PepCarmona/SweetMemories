<script setup lang="ts">
import { AuthStatus } from '@/types/auth';
import AppButton from '../ui/AppButton.vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import AppInput, { type AppInputProps } from '../ui/AppInput.vue';
import AppToast from '../ui/AppToast.vue';
import { useAuthStore } from '@/stores/authStore';
import { useCloned } from '@vueuse/core';
import FormLayout from '@/layouts/FormLayout.vue';

const { errors, defineField, handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      email: z.string({ required_error: 'Email is required' }).email(),
    })
  ),
});

const [email, emailProps] = defineField('email', {
  props: (state): AppInputProps => ({ validationError: state.errors[0] }),
});

const authStore = useAuthStore();
const { cloned: initialAuthStatus } = useCloned(authStore.authStatus);

const onSubmit = handleSubmit(
  ({ email }) => authStore.sendPasswordRecovery(email)
  // TODO: show toast on success
);
</script>

<template>
  <AppToast
    :should-show="authStore.authStatus === AuthStatus.FailedToRecoverPassword"
    variant="error"
    @close="authStore.authStatus = initialAuthStatus"
  >
    Ha habido un problema al intentar enviar el email de recuperación de
    contraseña. Por favor, inténtalo de nuevo más adelante.
  </AppToast>

  <FormLayout class="password-recovery-form" @submit="onSubmit" novalidate>
    <template #title>Recupera tu contraseña</template>

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
    </template>

    <template #buttons>
      <AppButton
        variant="primary"
        size="medium"
        :state="isSubmitting ? 'loading' : undefined"
      >
        Enviar link de recuperación
      </AppButton>
      <AppButton variant="link" to="/auth/login"> Go back </AppButton>
    </template>
  </FormLayout>
</template>
