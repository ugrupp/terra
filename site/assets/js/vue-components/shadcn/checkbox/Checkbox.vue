<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from "reka-ui";
import { cn } from "@/vue-components/shadcn/utils";
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<
  CheckboxRootProps & {
    class?: HTMLAttributes["class"];
    image?: string;
    imageAlt?: string;
  }
>();
const emits = defineEmits<CheckboxRootEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <CheckboxRoot
    v-bind="forwarded"
    :class="
      cn(
        'checkbox-root peer',
        props.class,
        props.image ? 'checkbox-root--image' : '',
      )
    "
  >
    <div v-if="props.image" class="checkbox-root__image-wrapper">
      <img :src="props.image" :alt="props.imageAlt" />
      <span />
    </div>
    <CheckboxIndicator
      :class="
        cn(
          'checkbox-indicator',
          props.image ? 'checkbox-indicator--with-image' : '',
        )
      "
    >
      <slot>
        <svg viewBox="0 0 14 11" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.413 5.059L.051 6.524l4.606 4.282 8.803-9.328L12.005.105 4.565 7.99z"
            fill="#00a65c"
            fill-rule="nonzero"
          />
        </svg>
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>

<style lang="scss">
.checkbox-root {
  aspect-ratio: 1 / 1;
  height: rem(30px);
  width: rem(30px);
  border: 1px solid $color-content;
  outline: none;
  cursor: pointer;
  flex-shrink: 0;

  &:focus-visible {
    outline-offset: 2px;
    outline: $color-primary solid 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &--image {
    width: rem(120px);
    height: rem(84px);
    border: none;
    position: relative;

    @include mappy-bp(xs) {
      width: rem(172px);
      height: rem(121px);
    }
  }

  &__image-wrapper {
    width: rem(120px);
    height: rem(84px);
    position: relative;

    @include mappy-bp(xs) {
      width: rem(172px);
      height: rem(121px);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    span {
      position: absolute;
      background-color: $color-white;
      bottom: rem(10px);
      right: rem(10px);
      height: rem(30px);
      width: rem(30px);
      border: 1px solid $color-content;

      @include mappy-bp(xs) {
        bottom: rem(15px);
        right: rem(15px);
      }
    }
  }

  + label {
    hyphens: auto;
  }
}

.checkbox-indicator {
  display: flex;
  align-items: center;
  justify-content: center;

  &--with-image {
    position: absolute;
    bottom: rem(15px);
    right: rem(15px);

    @include mappy-bp(xs) {
      bottom: rem(20px);
      right: rem(20px);
    }
  }

  svg {
    width: rem(20px);
    height: rem(20px);
  }
}
</style>
