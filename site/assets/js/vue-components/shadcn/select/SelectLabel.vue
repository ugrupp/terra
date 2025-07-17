<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/vue-components/shadcn/utils";
import { SelectLabel, type SelectLabelProps } from "reka-ui";

const props = defineProps<
  SelectLabelProps & { class?: HTMLAttributes["class"] }
>();
</script>

<template>
  <SelectLabel :class="cn('select-label ', props.class)">
    <slot />
  </SelectLabel>
</template>

<style lang="scss" scoped>
.select-label {
  padding-top: rem(6px);
  padding-bottom: rem(6px);
  padding-left: rem(32px);
  padding-right: rem(8px);
  font-size: rem(14px);
  line-height: rem(20px);
  font-weight: 600;
}
</style>
