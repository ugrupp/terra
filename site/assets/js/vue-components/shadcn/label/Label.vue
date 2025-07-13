<script setup lang="ts">
import { cn } from "@/vue-components/shadcn/utils";
import { Label, type LabelProps } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<LabelProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <Label v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </Label>
</template>
