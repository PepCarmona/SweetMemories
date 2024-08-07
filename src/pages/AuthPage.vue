<script setup lang="ts">
import AuthBackground from '@/components/auth/AuthBackground.vue';
import SignupForm from '@/components/auth/SignupForm.vue';
import LogoButton from '@/components/ui/LogoButton.vue';
</script>

<template>
  <main class="auth-page">
    <AuthBackground class="background" />
    <div class="form-container">
      <LogoButton fixed-size />
      <SignupForm />
    </div>
  </main>
</template>

<style scoped lang="scss">
.auth-page {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;

  .background {
    display: none;
  }

  .form-container {
    padding: var(--space-md);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-lg);
    margin: auto;
  }
}
</style>
