<script lang="ts" setup>
import { useId } from "reka-ui";
import { type HTMLAttributes, provide } from "vue";
import { cn } from "@/vue-components/shadcn/utils";
import { FORM_ITEM_INJECTION_KEY } from "./injectionKeys";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const id = useId();
provide(FORM_ITEM_INJECTION_KEY, id);
</script>

<template>
  <div :class="cn('form-item', props.class)">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.form-item > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}
</style>
