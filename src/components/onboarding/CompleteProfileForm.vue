<script setup lang="ts">
import { Gender } from '@/types/user';
import type { TypeToZod } from '@/types/utils';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import AppInput from '../ui/AppInput.vue';
import AppButton from '../ui/AppButton.vue';
import type { OnboardingUserProfileForm } from '@/types/onboarding';
import FormLayout from '@/layouts/FormLayout.vue';
import AppSelect from '../ui/AppSelect.vue';
import ArrowIcon from '../ui/icons/ArrowIcon.vue';

interface CompleteProfileFormProps {
  isSubmitting: boolean;
}
const props = defineProps<CompleteProfileFormProps>();

interface CompleteProfileFormEmits {
  (eventName: 'submit', eventValue: OnboardingUserProfileForm): void;
}
const emit = defineEmits<CompleteProfileFormEmits>();

const { defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    z.object<TypeToZod<OnboardingUserProfileForm>>({
      name: z.string({ required_error: 'Name is required' }).min(3).optional(),
      gender: z
        .nativeEnum(Gender, {
          required_error: 'Gender is required',
          invalid_type_error: 'Invalid gender',
        })
        .optional(),
    })
  ),
  initialValues: {
    name: '',
    gender: Gender.Other,
  },
});

const [name, nameProps] = defineField('name');
// const [gender, genderProps] = defineField('gender');

const onSubmit = handleSubmit(async (userProfile) =>
  emit('submit', userProfile)
);
</script>

<template>
  <FormLayout class="complete-profile-form" @submit="onSubmit" novalidate>
    <template #title>Crea tu cuenta</template>

    <template #subtitle>
      Empieza a compartir fotos y vídeos de tu bebé con familiares y amigos de
      forma segura.
    </template>

    <template #inputs>
      <AppInput
        placeholder="Introduce tu nombre"
        name="name"
        type="text"
        v-model="name"
        v-bind="nameProps"
      >
        Nombre
      </AppInput>

      <AppSelect
        :options="['a', 'b', 'c']"
        :placeholder="'Selecciona tu género'"
      >
        Género
      </AppSelect>
    </template>

    <template #buttons>
      <AppButton
        variant="primary"
        size="medium"
        :state="props.isSubmitting ? 'loading' : undefined"
      >
        Continuar
        <template #rightIcon>
          <ArrowIcon class="icon" />
        </template>
      </AppButton>
    </template>
  </FormLayout>
</template>

<style scoped lang="scss"></style>
