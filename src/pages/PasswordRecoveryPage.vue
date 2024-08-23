<script setup lang="ts">
import PasswordRecoveryForm from '@/components/auth/PasswordRecoveryForm.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppLogo from '@/components/ui/AppLogo.vue';
import FormPageLayout from '@/layouts/FormPageLayout.vue';

definePage({
  path: '/auth/recovery',
  name: 'recovery',
});
</script>

<template>
  <FormPageLayout class="password-recovery-page">
    <template #header>
      <AppButton variant="transparent" to="/">
        <AppLogo />
      </AppButton>
    </template>

    <template #form>
      <PasswordRecoveryForm />
    </template>
  </FormPageLayout>
</template>
