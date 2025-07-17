<script setup lang="ts">
import { cn } from "@/vue-components/shadcn/utils";
import {
  SelectScrollDownButton,
  type SelectScrollDownButtonProps,
  useForwardProps,
} from "reka-ui";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<
  SelectScrollDownButtonProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <SelectScrollDownButton
    v-bind="forwardedProps"
    :class="cn('select-scroll-down-button', props.class)"
  >
    <slot>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="20"
        height="20"
      >
        <path
          d="M256 406.6l11.3-11.3 192-192L470.6 192 448 169.4l-11.3 11.3L256 361.4 75.3 180.7 64 169.4 41.4 192l11.3 11.3 192 192L256 406.6z"
        />
      </svg>
    </slot>
  </SelectScrollDownButton>
</template>

<style lang="scss" scoped>
.select-scroll-down-button {
  display: flex;
  cursor: default;
  align-items: center;
  justify-content: center;
  padding-top: rem(4px);
  padding-bottom: rem(4px);
}
</style>
