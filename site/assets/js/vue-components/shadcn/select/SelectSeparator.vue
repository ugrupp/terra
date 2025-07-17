<script setup lang="ts">
import { cn } from "@/vue-components/shadcn/utils";
import { SelectSeparator, type SelectSeparatorProps } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<
  SelectSeparatorProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <SelectSeparator
    v-bind="delegatedProps"
    :class="cn('select-separator', props.class)"
  />
</template>

<style lang="scss" scoped>
.select-separator {
  margin-left: rem(-4px);
  margin-right: rem(-4px);
  margin-top: rem(4px);
  margin-bottom: rem(4px);
  height: 1px;
  background-color: $color-gray-d;
}
</style>
