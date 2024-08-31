<script setup lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppLogo from '@/components/ui/AppLogo.vue';
import AppToast from '@/components/ui/AppToast.vue';
import FormPageLayout from '@/layouts/FormPageLayout.vue';
import { useAuthStore } from '@/stores/authStore';
import { useNavigationStore } from '@/stores/navigationStore';
import { AuthStatus, type AuthUser } from '@/types/auth';
import { useCloned } from '@vueuse/core';
import { ref } from 'vue';

definePage({
  path: '/auth/login',
  name: 'login',
  meta: {
    redirectLoggedUsersToFeed: true,
  },
});

const authStore = useAuthStore();
const navigationStore = useNavigationStore();

const { cloned: initialAuthStatus } = useCloned(authStore.authStatus);

const isSubmittingForm = ref<boolean>(false);

async function handleSubmit({ email, password }: AuthUser): Promise<void> {
  // TODO: handle specific error codes text in signup, login and passwordRecovery (user_already_exists)

  isSubmittingForm.value = true;

  await authStore.logIn({ email, password });

  isSubmittingForm.value = false;

  await navigationStore.navigateToFeedPage();
}
</script>

<template>
  <AppToast
    :should-show="authStore.authStatus === AuthStatus.FailedToLogIn"
    variant="error"
    @close="authStore.authStatus = initialAuthStatus"
  >
    Ha habido un problema al intentar iniciar sesión. Por favor, inténtalo de
    nuevo más adelante.
  </AppToast>

  <FormPageLayout class="login-page">
    <template #header>
      <AppButton variant="transparent" to="/">
        <AppLogo />
      </AppButton>
    </template>

    <template #form>
      <LoginForm :is-submitting="isSubmittingForm" @submit="handleSubmit" />
    </template>
  </FormPageLayout>
</template>
