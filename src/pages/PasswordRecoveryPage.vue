<script setup lang="ts">
import PasswordRecoveryForm from '@/components/auth/PasswordRecoveryForm.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppLogo from '@/components/ui/AppLogo.vue';
import FormPageLayout from '@/layouts/FormPageLayout.vue';
import { useAuthStore } from '@/stores/authStore';
import { ref } from 'vue';

definePage({
  path: '/auth/recovery',
  name: 'recovery',
  meta: {
    redirectLoggedUsersToFeed: true,
  },
});

const authStore = useAuthStore();

const isSubmittingForm = ref<boolean>(false);

async function handleSubmit(email: string): Promise<void> {
  // TODO: show toast on success

  isSubmittingForm.value = true;

  await authStore.sendPasswordRecovery(email);

  isSubmittingForm.value = false;
}
</script>

<template>
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
