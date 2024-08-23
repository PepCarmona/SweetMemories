<script setup lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppLogo from '@/components/ui/AppLogo.vue';
import FormPageLayout from '@/layouts/FormPageLayout.vue';

definePage({
  path: '/auth/login',
  name: 'login',
});
</script>

<template>
  <FormPageLayout class="login-page">
    <template #header>
      <AppButton variant="transparent" to="/">
        <AppLogo />
      </AppButton>
    </template>

    <template #form>
      <LoginForm />
    </template>
  </FormPageLayout>
</template>
