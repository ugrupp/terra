<script setup lang="ts">
import { cn } from "@/vue-components/shadcn/utils";
import {
  SelectIcon,
  SelectTrigger,
  type SelectTriggerProps,
  useForwardProps,
} from "reka-ui";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<
  SelectTriggerProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <SelectTrigger
    v-bind="forwardedProps"
    :class="cn('select-trigger', props.class)"
  >
    <slot />
    <SelectIcon as-child>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="13.103"
        height="20.674"
        class="select-trigger__icon"
      >
        <g fill="none" stroke="currentColor" stroke-miterlimit="10">
          <path d="M6.552 0v20M12.768 14.372L6.552 20 .336 14.372" />
        </g>
      </svg>
    </SelectIcon>
  </SelectTrigger>
</template>

<!--
Important: The style cannot be scoped here because
we style the span inside the trigger using '& > span'
-->
<style lang="scss">
.select-trigger {
  @include typi("form-large");
  @include font-smoothing;

  // fallback font for initial render to avoid FOIT
  font-family: $font-family-base-fallback;

  // fonts-loaded flag, triggered by JS
  .wf-active & {
    font-family: $font-family-base;
  }

  display: flex;
  height: rem(46px);
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border: 1px solid transparent;
  background-color: $color-white;
  padding-left: rem(12px);
  padding-right: rem(12px);
  padding-top: rem(8px);
  padding-bottom: rem(8px);
  outline: none;
  text-align: start;

  &:focus-visible {
    border-color: $color-content;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &[aria-invalid="true"] {
    background-color: rgba($color-error, 0.2);
    border-color: $color-error;
  }

  &[data-placeholder] {
    color: rgba($color-content, 0.7);
  }

  & > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__icon {
    color: $color-content;
    margin-left: rem(24px);
    flex-shrink: 0;
  }
}
</style>
