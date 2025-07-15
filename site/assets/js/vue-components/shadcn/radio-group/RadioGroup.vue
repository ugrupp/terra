<script setup lang="ts">
import { cn } from "@/vue-components/shadcn/utils";
import {
  RadioGroupRoot,
  type RadioGroupRootEmits,
  type RadioGroupRootProps,
  useForwardPropsEmits,
} from "reka-ui";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<
  RadioGroupRootProps & { class?: HTMLAttributes["class"] }
>();
const emits = defineEmits<RadioGroupRootEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <RadioGroupRoot :class="cn('radio-group', props.class)" v-bind="forwarded">
    <slot />
  </RadioGroupRoot>
</template>

<style lang="scss" scoped>
.radio-group {
  display: grid;
  gap: rem(30px);
}
</style>
