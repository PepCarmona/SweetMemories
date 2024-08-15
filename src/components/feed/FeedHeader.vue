<script setup lang="ts">
import type { AppUser } from '@/types/auth';
import AppButton from '../ui/AppButton.vue';
import AppLogo from '../ui/AppLogo.vue';
import LogoutIcon from '../ui/icons/LogoutIcon.vue';
import ProfileIcon from '../ui/icons/ProfileIcon.vue';
import { ref } from 'vue';
import AppTransitionFade from '../ui/AppTransitionFade.vue';

interface FeedHeaderProps {
  user: AppUser;
}
const props = defineProps<FeedHeaderProps>();

interface FeedHeaderEmits {
  (eventName: 'log-out'): void;
}
const emit = defineEmits<FeedHeaderEmits>();

const isPopoverOpen = ref<boolean>(false);

function togglePopover(): void {
  isPopoverOpen.value = !isPopoverOpen.value;
}
</script>

<template>
  <header class="feed-header">
    <AppLogo />
    <div class="profile">
      <AppButton variant="transparent" @click="togglePopover"
        ><ProfileIcon
      /></AppButton>
      <AppTransitionFade>
        <div v-if="isPopoverOpen" class="popover">
          <div class="name">{{ props.user.name }}</div>
          <AppButton
            variant="transparent"
            class="logout-button"
            @click="emit('log-out')"
          >
            <LogoutIcon class="logout-icon" /> Cerrar sesión
          </AppButton>
        </div>
      </AppTransitionFade>
    </div>
  </header>
</template>

<style scoped lang="scss">
.feed-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: var(--space-sm) var(--space-md);

  .profile {
    position: relative;

    .popover {
      position: absolute;
      right: 0;

      padding: var(--space-sm) var(--space-md);
      border: 1px solid var(--color-mid-light);
      border-radius: var(--space-xs);
      box-shadow: 0 0 64px var(--color-mid-light);

      .name {
        font-weight: 600;
        margin-bottom: var(--space-xxs);
      }

      .logout-button {
        display: flex;
        align-items: center;
        gap: var(--space-xxxs);
        text-wrap: nowrap;

        .logout-icon {
          height: 1.25em;
          width: 1.25em;
        }
      }
    }
  }
}
</style>
