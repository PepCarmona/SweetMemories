<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import AuthBackground from '@/components/auth/AuthBackground.vue';
import LoginForm from '@/components/auth/LoginForm.vue';
import PasswordRecoveryForm from '@/components/auth/PasswordRecoveryForm.vue';
import SignupForm from '@/components/auth/SignupForm.vue';
import LogoButton from '@/components/ui/LogoButton.vue';
import { AuthStep } from '@/types/auth';

definePage({
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
      <LogoButton fixed-size />
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
  }
}
</style>
