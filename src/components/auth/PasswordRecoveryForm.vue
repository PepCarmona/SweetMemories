<script setup lang="ts">
import { AuthStatus, AuthStep } from '@/types/auth';
import AppButton from '../ui/AppButton.vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import AppInput, { type AppInputProps } from '../ui/AppInput.vue';
import AppToast from '../ui/AppToast.vue';
import { useAuthStore } from '@/stores/authStore';
import { useCloned } from '@vueuse/core';

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

const onSubmit = handleSubmit(({ email }) => {
  authStore.sendPasswordRecovery(email).then(() => alert('Password recovery'));
});
</script>

<template>
  <form class="password-recovery-form" @submit="onSubmit" novalidate>
    <AppToast
      :should-show="authStore.authStatus === AuthStatus.FailedToRecoverPassword"
      variant="error"
      @close="authStore.authStatus = initialAuthStatus"
    >
      Ha habido un problema al intentar enviar el email de recuperación de
      contraseña. Por favor, inténtalo de nuevo más adelante.
    </AppToast>

    <h1 class="title">Recupera tu contraseña</h1>

    <div class="inputs">
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
    </div>

    <div class="buttons">
      <AppButton
        variant="primary"
        size="medium"
        :state="isSubmitting ? 'loading' : undefined"
      >
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
  width: 100%;

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
  }

  .buttons {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }
}
</style>
