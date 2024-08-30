<script setup lang="ts">
import { type AuthUser } from '@/types/auth';
import AppButton from '../ui/AppButton.vue';
import AppInput, { type AppInputProps } from '../ui/AppInput.vue';
import AppCheckbox from '../ui/AppCheckbox.vue';
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import type { TypeToZod } from '@/types/utils';
import { toTypedSchema } from '@vee-validate/zod';
import FormLayout from '@/layouts/FormLayout.vue';
import ArrowIcon from '../ui/icons/ArrowIcon.vue';

interface SignupFormProps {
  isSubmitting: boolean;
}
const props = defineProps<SignupFormProps>();

interface SignupFormEmits {
  (eventName: 'submit', eventValue: AuthUser): void;
}
const emit = defineEmits<SignupFormEmits>();

const { defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    z.object<TypeToZod<AuthUser>>({
      email: z.string({ required_error: 'Este campo es obligatorio' }).email(),
      password: z
        .string({ required_error: 'Este campo es obligatorio' })
        .min(6, 'La contrasña debe contener al menos 6 caracteres')
        .max(16, 'La contraseña debe contener menos de 16 caracteres')
        .regex(
          new RegExp(/[0-9]/),
          'La contraseña debe contener al menos un número'
        )
        .regex(
          new RegExp(/[!@#$&*.]/),
          'La contraseña debe contener al menos un caracter especial'
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
const shouldShowPassword = ref(false);

const onSubmit = handleSubmit((authUser) => emit('submit', authUser));
</script>

<template>
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
        :state="props.isSubmitting ? 'loading' : undefined"
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
