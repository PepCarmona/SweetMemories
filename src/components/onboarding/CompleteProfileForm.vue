<script setup lang="ts">
import { Gender, type UserProfile } from '@/types/user';
import type { TypeToZod } from '@/types/utils';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import AppInput, { type AppInputProps } from '../ui/AppInput.vue';
import AppButton, { type AppButtonState } from '../ui/AppButton.vue';
import FormLayout from '@/layouts/FormLayout.vue';
import AppSelect, { type AppSelectOption } from '../ui/AppSelect.vue';
import ArrowIcon from '../ui/icons/ArrowIcon.vue';
import { computed } from 'vue';

interface CompleteProfileFormProps {
  isSubmitting: boolean;
}
const props = defineProps<CompleteProfileFormProps>();

interface CompleteProfileFormEmits {
  (eventName: 'submit', eventValue: UserProfile): void;
}
const emit = defineEmits<CompleteProfileFormEmits>();

const { defineField, handleSubmit, meta } = useForm({
  validationSchema: toTypedSchema(
    z.object<TypeToZod<UserProfile>>({
      name: z.string({ required_error: 'Este campo es obligatorio' }).min(3),
      gender: z.nativeEnum(Gender, {
        errorMap: (issue) => {
          if (issue.code === 'invalid_enum_value') {
            return { message: 'Este valor no es válido' };
          }

          if (issue.code === 'invalid_type') {
            return { message: 'Este campo es obligatorio' };
          }

          return { message: 'Algo fue mal' };
        },
      }),
    })
  ),
});

const [name, nameProps] = defineField('name', {
  props: (state): AppInputProps => ({ validationError: state.errors[0] }),
});
const [gender, genderProps] = defineField('gender', {
  props: (state): AppInputProps => ({ validationError: state.errors[0] }),
});

const onSubmit = handleSubmit(async (userProfile) =>
  emit('submit', userProfile)
);

const options: AppSelectOption[] = [
  {
    value: Gender.Male,
    label: 'Hombre',
  },
  {
    value: Gender.Female,
    label: 'Mujer',
  },
  {
    value: Gender.Other,
    label: 'Otro',
  },
];

const buttonState = computed<AppButtonState>(() => {
  if (!meta.value.valid) {
    return 'disabled';
  }

  if (props.isSubmitting) {
    return 'loading';
  }

  return 'default';
});
</script>

<template>
  <FormLayout class="complete-profile-form" @submit="onSubmit" novalidate>
    <template #title>Personalicemos tu perfil</template>

    <template #subtitle>Cuéntanos un poco sobre ti.</template>

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
        :options="options"
        placeholder="Selecciona tu género"
        v-model="gender"
        v-bind="genderProps"
      >
        Género
      </AppSelect>
    </template>

    <template #buttons>
      <AppButton variant="primary" size="medium" :state="buttonState">
        Continuar
        <template #rightIcon>
          <ArrowIcon class="icon" />
        </template>
      </AppButton>
    </template>
  </FormLayout>
</template>

<style scoped lang="scss"></style>
