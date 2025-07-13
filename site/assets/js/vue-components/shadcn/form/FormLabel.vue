<script lang="ts" setup>
import type { LabelProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { cn } from "@/vue-components/shadcn/utils";
import { Label } from "@/vue-components/shadcn/label";
import { useFormField } from "./useFormField";

const props = defineProps<LabelProps & { class?: HTMLAttributes["class"] }>();

const { error, formItemId } = useFormField();
</script>

<template>
  <Label
    :class="cn(error && 'text-destructive', props.class)"
    :for="formItemId"
  >
    <slot />
  </Label>
</template>

<style lang="scss" scoped>
.text-destructive {
  color: $color-error;
}
</style>
