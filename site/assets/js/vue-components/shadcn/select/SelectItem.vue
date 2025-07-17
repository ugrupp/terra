<script setup lang="ts">
import { cn } from "@/vue-components/shadcn/utils";
import {
  SelectItem,
  SelectItemIndicator,
  type SelectItemProps,
  SelectItemText,
  useForwardProps,
} from "reka-ui";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<
  SelectItemProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <SelectItem v-bind="forwardedProps" :class="cn('select-item ', props.class)">
    <span class="select-item__selected-icon-wrapper">
      <SelectItemIndicator>
        <svg
          viewBox="0 0 14 11"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="20"
        >
          <path
            d="M1.413 5.059L.051 6.524l4.606 4.282 8.803-9.328L12.005.105 4.565 7.99z"
            fill="currentColor"
            fill-rule="nonzero"
          />
        </svg>
      </SelectItemIndicator>
    </span>

    <SelectItemText>
      <slot />
    </SelectItemText>
  </SelectItem>
</template>

<style lang="scss" scoped>
.select-item {
  @include typi("form-large");
  @include font-smoothing;

  // fallback font for initial render to avoid FOIT
  font-family: $font-family-base-fallback;

  // fonts-loaded flag, triggered by JS
  .wf-active & {
    font-family: $font-family-base;
  }

  position: relative;
  display: flex;
  width: 100%;
  cursor: default;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  align-items: center;
  padding-top: rem(6px);
  padding-bottom: rem(6px);
  padding-left: rem(32px);
  padding-right: rem(8px);
  font-size: rem(14px);
  line-height: rem(20px);
  outline: 2px solid transparent;
  outline-offset: 2px;

  &:focus-visible {
    background-color: $color-gray-f;
  }

  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }

  &__selected-icon-wrapper {
    position: absolute;
    left: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

    > span {
      display: flex;
    }
  }
}
</style>
