<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "@/vue-components/shadcn/utils";
import { useFormField } from "./useFormField";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const { formDescriptionId } = useFormField();
</script>

<template>
  <p :id="formDescriptionId" :class="cn('form-description', props.class)">
    <slot />
  </p>
</template>

<style lang="scss" scoped>
.form-description {
  @include typi("gallery-meta");

  color: rgba($color-content, 0.8);
}
</style>
