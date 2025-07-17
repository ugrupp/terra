<script setup lang="ts">
import { cn } from "@/vue-components/shadcn/utils";
import {
  SelectContent,
  type SelectContentEmits,
  type SelectContentProps,
  SelectPortal,
  SelectViewport,
  useForwardPropsEmits,
} from "reka-ui";
import { computed, type HTMLAttributes } from "vue";
import { SelectScrollDownButton, SelectScrollUpButton } from ".";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<SelectContentProps & { class?: HTMLAttributes["class"] }>(),
  {
    position: "popper",
  },
);
const emits = defineEmits<SelectContentEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <SelectPortal>
    <SelectContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="
        cn(
          'select-content',
          position === 'popper' && 'select-content__popper ',
          props.class,
        )
      "
    >
      <SelectScrollUpButton />
      <SelectViewport
        :class="
          cn(
            'select-viewport',
            position === 'popper' && 'select-viewport__popper',
          )
        "
      >
        <slot />
      </SelectViewport>
      <SelectScrollDownButton />
    </SelectContent>
  </SelectPortal>
</template>

<!--
Important: The style cannot be scoped here because the divs
are removed and created in the DOM each time the select is opened.
-->
<style lang="scss">
@keyframes enter {
  0% {
    opacity: var(--tw-enter-opacity, 1);
    transform: translate3d(
        var(--tw-enter-translate-x, 0),
        var(--tw-enter-translate-y, 0),
        0
      )
      scale3d(
        var(--tw-enter-scale, 1),
        var(--tw-enter-scale, 1),
        var(--tw-enter-scale, 1)
      )
      rotate(var(--tw-enter-rotate, 0));
  }
}

@keyframes exit {
  to {
    opacity: var(--tw-exit-opacity, 1);
    transform: translate3d(
        var(--tw-exit-translate-x, 0),
        var(--tw-exit-translate-y, 0),
        0
      )
      scale3d(
        var(--tw-exit-scale, 1),
        var(--tw-exit-scale, 1),
        var(--tw-exit-scale, 1)
      )
      rotate(var(--tw-exit-rotate, 0));
  }
}

.select-content {
  position: relative;
  z-index: 50;
  max-height: 384px;
  min-width: 128px;
  overflow: hidden;
  background-color: $color-white;
  color: $color-content;

  &[data-state="open"] {
    animation-name: enter;
    animation-duration: 0.15s;
    --tw-enter-opacity: initial;
    --tw-enter-scale: initial;
    --tw-enter-rotate: initial;
    --tw-enter-translate-x: initial;
    --tw-enter-translate-y: initial;
    --tw-enter-opacity: 0;
    --tw-enter-scale: 0.95;
  }

  &[data-state="closed"] {
    animation-name: exit;
    animation-duration: 0.15s;
    --tw-exit-opacity: initial;
    --tw-exit-scale: initial;
    --tw-exit-rotate: initial;
    --tw-exit-translate-x: initial;
    --tw-exit-translate-y: initial;
    --tw-exit-opacity: 0;
    --tw-exit-scale: 0.95;
  }

  &[data-side="bottom"] {
    --tw-enter-translate-y: rem(8px);
  }

  &[data-side="left"] {
    --tw-enter-translate-x: rem(8px);
  }

  &[data-side="right"] {
    --tw-enter-translate-x: -rem(8px);
  }

  &[data-side="top"] {
    --tw-enter-translate-y: rem(8px);
  }

  &__popper {
    &[data-side="bottom"] {
      --tw-translate-y: rem(4px);
      transform: translate(var(--tw-translate-x), var(--tw-translate-y))
        rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
        scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    }

    &[data-side="left"] {
      --tw-translate-x: rem(-4px);
      transform: translate(var(--tw-translate-x), var(--tw-translate-y))
        rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
        scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    }

    &[data-side="right"] {
      --tw-translate-x: rem(4px);
      transform: translate(var(--tw-translate-x), var(--tw-translate-y))
        rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
        scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    }

    &[data-side="top"] {
      --tw-translate-y: rem(-4px);
      transform: translate(var(--tw-translate-x), var(--tw-translate-y))
        rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
        scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    }
  }
}

.select-viewport {
  padding: rem(4px);

  &__popper {
    height: var(--reka-select-trigger-height);
    width: 100%;
    min-width: var(--reka-select-trigger-width);
  }
}
</style>
