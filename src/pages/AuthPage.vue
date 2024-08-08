<script setup lang="ts">
import AuthBackground from '@/components/auth/AuthBackground.vue';
import LoginForm from '@/components/auth/LoginForm.vue';
import PasswordRecoveryForm from '@/components/auth/PasswordRecoveryForm.vue';
import SignupForm from '@/components/auth/SignupForm.vue';
import LogoButton from '@/components/ui/LogoButton.vue';
import { useAuthStore } from '@/stores/authStore';
import { AuthStep } from '@/types/auth';

const authStore = useAuthStore();
</script>

<template>
  <main class="auth-page">
    <AuthBackground class="background" />
    <div class="form-container">
      <LogoButton fixed-size />
      <SignupForm
        v-if="authStore.authMode === AuthStep.Signup"
        @switch-auth-mode="authStore.authMode = $event"
      />
      <LoginForm
        v-else-if="authStore.authMode === AuthStep.Login"
        @switch-auth-mode="authStore.authMode = $event"
      />
      <PasswordRecoveryForm
        v-else-if="authStore.authMode === AuthStep.PasswordRecovery"
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
