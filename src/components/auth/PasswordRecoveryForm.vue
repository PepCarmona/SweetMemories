<script setup lang="ts">
import AppButton from '../ui/AppButton.vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import AppInput, { type AppInputProps } from '../ui/AppInput.vue';
import FormLayout from '@/layouts/FormLayout.vue';

interface PasswordRecoveryFormProps {
  isSubmitting: boolean;
}
const props = defineProps<PasswordRecoveryFormProps>();

interface PasswordRecoveryFormEmits {
  (eventName: 'submit', eventValue: string): void;
}
const emit = defineEmits<PasswordRecoveryFormEmits>();

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      email: z.string({ required_error: 'Este campo es obligatorio' }).email(),
    })
  ),
});

const [email, emailProps] = defineField('email', {
  props: (state): AppInputProps => ({ validationError: state.errors[0] }),
});

const onSubmit = handleSubmit(({ email }) => emit('submit', email));
</script>

<template>
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
        :state="props.isSubmitting ? 'loading' : undefined"
      >
        Enviar link de recuperación
      </AppButton>
      <AppButton variant="link" to="/auth/login"> Go back </AppButton>
    </template>
  </FormLayout>
</template>
