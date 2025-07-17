<script setup lang="ts">
import { cn } from "@/vue-components/shadcn/utils";
import { SelectGroup, type SelectGroupProps } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<
  SelectGroupProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <SelectGroup :class="cn('select-group', props.class)" v-bind="delegatedProps">
    <slot />
  </SelectGroup>
</template>

<style lang="scss" scoped>
.select-group {
  padding: rem(4px);
  width: 100%;
}
</style>
