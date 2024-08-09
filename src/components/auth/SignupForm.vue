<script setup lang="ts">
import { AuthStep, type SignupUser } from '@/types/auth';
import AppButton from '../ui/AppButton.vue';
import AppInputMail from '../ui/AppInputMail.vue';
import AppInputPassword from '../ui/AppInputPassword.vue';
import AppInputText from '../ui/AppInputText.vue';
import AppCheckbox from '../ui/AppCheckbox.vue';
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import type { TypeToZod } from '@/types/utils';
import { toTypedSchema } from '@vee-validate/zod';

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    z.object<TypeToZod<SignupUser>>({
      email: z.string({ required_error: 'Email is required' }).email(),
      name: z.string({ required_error: 'Name is required' }),
      password: z
        .string({ required_error: 'Password is required' })
        .min(6, 'Password must contain at least 6 characters'),
    })
  ),
});

const [email, emailProps] = defineField('email');
const [name, nameProps] = defineField('name');
const [password, passwordProps] = defineField('password');

const shouldShowPassword = ref(false);

const onSubmit = handleSubmit((values) => {
  alert(values);
});
</script>

<template>
  {{ errors }}
  <form class="signup-form" @submit="onSubmit" novalidate>
    <h1 class="title">Crea tu cuenta</h1>

    <h2 class="subtitle">
      Empieza a compartir fotos y vídeos de tu bebé con familiares y amigos de
      forma segura.
    </h2>

    <div class="inputs">
      <div class="input">
        <label class="label" for="name">Nombre</label>
        <AppInputText
          placeholder="Introduce tu nombre"
          name="name"
          v-model="name"
          v-bind="nameProps"
          :invalid="!!errors.name"
        />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>
      </div>

      <div class="input">
        <label class="label" for="mail">Correo electrónico</label>
        <AppInputMail
          placeholder="Introduce tu correo electrónico"
          name="mail"
          v-model="email"
          v-bind="emailProps"
          :invalid="!!errors.email"
        />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>
      </div>

      <div class="input">
        <label class="label" for="password">Contraseña</label>
        <AppInputPassword
          placeholder="Introduce tu contraseña"
          name="password"
          v-model="password"
          v-bind="passwordProps"
          :should-show-password="shouldShowPassword"
          :invalid="!!errors.password"
        />
        <span v-if="errors.password" class="error">{{ errors.password }}</span>

        <AppCheckbox class="show-password" v-model="shouldShowPassword">
          Mostrar contraseña
        </AppCheckbox>
      </div>
    </div>

    <div class="buttons">
      <AppButton variant="primary" size="medium"> Crear cuenta </AppButton>
    </div>

    <div class="switch-auth-mode">
      <span>¿Ya tienes una cuenta?</span>
      &nbsp;
      <AppButton
        variant="link"
        :to="{ name: '/auth/[step]', params: { step: AuthStep.Login } }"
      >
        Inicia sesión
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

      .label {
        font-weight: 600;
        margin-left: var(--space-xs);
        margin-bottom: var(--space-xs);
      }

      .error {
        font-size: var(--font-size-sm);
        color: var(--color-error);
        margin-left: var(--space-xs);
      }

      .show-password {
        margin-top: var(--space-xs);
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
