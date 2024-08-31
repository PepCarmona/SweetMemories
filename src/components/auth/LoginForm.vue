<script setup lang="ts">
import { type AuthUser } from '@/types/auth';
import AppButton, { type AppButtonState } from '../ui/AppButton.vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import type { TypeToZod } from '@/types/utils';
import AppInput, { type AppInputProps } from '../ui/AppInput.vue';
import FormLayout from '@/layouts/FormLayout.vue';
import { computed } from 'vue';

interface LoginFormProps {
  isSubmitting: boolean;
}
const props = defineProps<LoginFormProps>();

interface LoginFormEmits {
  (eventName: 'submit', eventValue: AuthUser): void;
}
const emit = defineEmits<LoginFormEmits>();

const { errors, defineField, handleSubmit, meta } = useForm({
  validationSchema: toTypedSchema(
    z.object<TypeToZod<AuthUser>>({
      email: z.string({ required_error: 'Este campo es obligatorio' }).email(),
      password: z.string({ required_error: 'Este campo es obligatorio' }),
    })
  ),
});

const [email, emailProps] = defineField('email', {
  props: (state): AppInputProps => ({ validationError: state.errors[0] }),
});
const [password, passwordProps] = defineField('password', {
  props: (state): AppInputProps => ({ validationError: state.errors[0] }),
});

const onSubmit = handleSubmit((authUser) => emit('submit', authUser));

const buttonState = computed<AppButtonState>(() => {
  if (!meta.value.valid) {
    return 'disabled';
  }

  if (props.isSubmitting) {
    return 'loading';
  }

  return 'default';
});
</script>

<template>
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
          to="/auth/recovery"
          size="small"
        >
          ¿Olvidaste la contraseña?
        </AppButton>
      </div>
    </template>

    <template #buttons>
      <AppButton variant="primary" size="medium" :state="buttonState">
        Inicia sesión
      </AppButton>

      <div class="switch-auth-mode">
        <span>¿Aún no tienes una cuenta?</span>
        &nbsp;
        <AppButton variant="link" to="/auth/signup"> Regístrate </AppButton>
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
