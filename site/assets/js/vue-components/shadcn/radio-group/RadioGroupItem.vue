<script setup lang="ts">
import type { RadioGroupItemProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { cn } from "@/vue-components/shadcn/utils";
import { RadioGroupIndicator, RadioGroupItem, useForwardProps } from "reka-ui";
import { computed } from "vue";

const props = defineProps<
  RadioGroupItemProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <RadioGroupItem
    v-bind="forwardedProps"
    :class="cn('radio-group-item peer', props.class)"
  >
    <RadioGroupIndicator class="radio-group-indicator">
      <svg viewBox="0 0 14 11" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.413 5.059L.051 6.524l4.606 4.282 8.803-9.328L12.005.105 4.565 7.99z"
          fill="#00a65c"
          fill-rule="nonzero"
        />
      </svg>
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>

<style lang="scss" scoped>
.radio-group-item {
  aspect-ratio: 1 / 1;
  height: rem(30px);
  width: rem(30px);
  border: 1px solid $color-content;
  outline: none;

  &:focus-visible {
    outline-offset: 2px;
    outline: $color-primary solid 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

.radio-group-indicator {
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: rem(20px);
    height: rem(20px);
  }
}
</style>
