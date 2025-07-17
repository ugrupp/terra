<script setup lang="ts">
import { cn } from "@/vue-components/shadcn/utils";
import {
  SelectScrollUpButton,
  type SelectScrollUpButtonProps,
  useForwardProps,
} from "reka-ui";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<
  SelectScrollUpButtonProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <SelectScrollUpButton
    v-bind="forwardedProps"
    :class="cn('select-scroll-up-button', props.class)"
  >
    <slot>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="20"
        height="20"
      >
        <path
          d="M256 105.4l11.3 11.3 192 192L470.6 320 448 342.6l-11.3-11.3L256 150.6 75.3 331.3 64 342.6 41.4 320l11.3-11.3 192-192L256 105.4z"
        />
      </svg>
    </slot>
  </SelectScrollUpButton>
</template>

<style lang="scss" scoped>
.select-scroll-up-button {
  display: flex;
  cursor: default;
  align-items: center;
  justify-content: center;
  padding-top: rem(4px);
  padding-bottom: rem(4px);
}
</style>
