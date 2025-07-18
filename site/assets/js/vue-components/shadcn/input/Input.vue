<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/vue-components/shadcn/utils";
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  defaultValue?: string | number;
  modelValue?: string | number;
  class?: HTMLAttributes["class"];
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>

<template>
  <input v-model="modelValue" :class="cn(props.class)" />
</template>

<style lang="scss" scoped>
input {
  @include typi("form-large");
  @include font-smoothing;

  // fallback font for initial render to avoid FOIT
  font-family: $font-family-base-fallback;

  // fonts-loaded flag, triggered by JS
  .wf-active & {
    font-family: $font-family-base;
  }

  background-color: $color-white;
  border: 1px solid transparent;
  color: $color-content;
  padding: 9px 15px;
  outline: none;
  width: 100%;
  transition:
    border-color 0.3s ease-in-out,
    color 0.3s ease-in-out,
    background-color 0.3s ease-in-out;

  &::placeholder {
    color: rgba($color-content, 0.7);
  }

  &:focus-visible {
    border-color: $color-content;
  }

  &[aria-invalid="true"] {
    background-color: rgba($color-error, 0.2);
    border-color: $color-error;
  }
}
</style>
