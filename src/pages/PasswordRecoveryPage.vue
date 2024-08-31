<script setup lang="ts">
import PasswordRecoveryForm from '@/components/auth/PasswordRecoveryForm.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppLogo from '@/components/ui/AppLogo.vue';
import AppToast from '@/components/ui/AppToast.vue';
import FormPageLayout from '@/layouts/FormPageLayout.vue';
import { useAuthStore } from '@/stores/authStore';
import { AuthStatus } from '@/types/auth';
import { useCloned } from '@vueuse/core';
import { ref } from 'vue';

definePage({
  path: '/auth/recovery',
  name: 'recovery',
  meta: {
    redirectLoggedUsersToFeed: true,
  },
});

const authStore = useAuthStore();

const { cloned: initialAuthStatus } = useCloned(authStore.authStatus);

const isSubmittingForm = ref<boolean>(false);

async function handleSubmit(email: string): Promise<void> {
  // TODO: show toast on success

  isSubmittingForm.value = true;

  await authStore.sendPasswordRecovery(email);

  isSubmittingForm.value = false;
}
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

  <FormPageLayout class="password-recovery-page">
    <template #header>
      <AppButton variant="transparent" to="/">
        <AppLogo />
      </AppButton>
    </template>

    <template #form>
      <PasswordRecoveryForm
        :is-submitting="isSubmittingForm"
        @submit="handleSubmit"
      />
    </template>
  </FormPageLayout>
</template>
