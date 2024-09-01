<script setup lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppLogo from '@/components/ui/AppLogo.vue';
import FormPageLayout from '@/layouts/FormPageLayout.vue';
import { useAuthStore } from '@/stores/authStore';
import { useNavigationStore } from '@/stores/navigationStore';
import { type AuthUser } from '@/types/auth';
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
