<script setup lang="ts">
import { AuthStep } from '@/types/auth';
import AppButton from '../ui/AppButton.vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import AppInput, { type AppInputProps } from '../ui/AppInput.vue';

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      email: z.string({ required_error: 'Email is required' }).email(),
    })
  ),
});

const [email, emailProps] = defineField('email', {
  props: (state): AppInputProps => ({ validationError: state.errors[0] }),
});

const onSubmit = handleSubmit((values) => {
  alert(values);
});
</script>

<template>
  <form class="password-recovery-form" @submit="onSubmit" novalidate>
    <h1 class="title">Recupera tu contraseña</h1>

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
    </div>

    <div class="buttons">
      <AppButton variant="primary" size="medium">
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
