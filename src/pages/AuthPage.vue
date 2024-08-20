<script setup lang="ts">
import AuthBackground from '@/components/auth/AuthBackground.vue';
import LoginForm from '@/components/auth/LoginForm.vue';
import PasswordRecoveryForm from '@/components/auth/PasswordRecoveryForm.vue';
import SignupForm from '@/components/auth/SignupForm.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppLogo from '@/components/ui/AppLogo.vue';
import { AuthStep } from '@/types/auth';

definePage({
  // TODO: Look into issue on unplugin-vue-router package for params coming from definePage
  path: '/auth/:step',
  name: 'auth',
  props: true,
});

interface AuthPageProps {
  step: AuthStep;
}
const props = defineProps<AuthPageProps>();
</script>

<template>
  <main class="auth-page">
    <AuthBackground class="background" />
    <div class="form-container">
      <AppButton variant="transparent" to="/">
        <AppLogo />
      </AppButton>

      <SignupForm v-if="props.step === AuthStep.Signup" />
      <LoginForm v-else-if="props.step === AuthStep.Login" />
      <PasswordRecoveryForm
        v-else-if="props.step === AuthStep.PasswordRecovery"
      />
    </div>
  </main>
</template>

<style scoped lang="scss">
.auth-page {
  min-height: 100vh;
  min-height: 100dvh;

  .background {
    display: none;
  }

  .form-container {
    padding: var(--space-xl);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-lg);
    margin: auto;
    max-width: var(--breakpoint-xs);
  }

  @include breakpoint(md) {
    display: flex;

    .background {
      display: block;
      overflow: hidden;
    }

    .form-container {
      background-color: var(--color-light);
      border-radius: var(--space-md);
      box-shadow: 0 0 32px var(--color-mid-light);
      padding: var(--space-md);
      width: var(--breakpoint-xs);
    }
  }
}
</style>
