<script setup lang="ts">
import { AuthStep, type LoginUser } from '@/types/auth';
import AppButton from '../ui/AppButton.vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import type { TypeToZod } from '@/types/utils';
import AppInput, { type AppInputProps } from '../ui/AppInput.vue';

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    z.object<TypeToZod<LoginUser>>({
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

const onSubmit = handleSubmit((values) => {
  alert(values);
});
</script>

<template>
  <form class="signup-form" @submit="onSubmit" novalidate>
    <h1 class="title">Bienvenido de nuevo</h1>

    <h2 class="subtitle">
      Accede a tu cuenta y sigue compartiendo y disfrutando de tus recuerdos
      familiares.
    </h2>

    <div class="inputs">
      <div class="input">
        <label class="label" for="mail">Correo electrónico</label>
        <AppInput
          placeholder="Introduce tu correo electrónico"
          name="mail"
          type="email"
          v-model="email"
          v-bind="emailProps"
          :invalid="!!errors.email"
        />
      </div>

      <div class="input">
        <label class="label" for="password">Contraseña</label>
        <AppInput
          placeholder="Introduce tu contraseña"
          name="password"
          type="password"
          v-model="password"
          v-bind="passwordProps"
          :invalid="!!errors.password"
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
      <AppButton variant="primary" size="medium">Inicia sesión</AppButton>
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
