<script setup lang="ts">
import type { RadioGroupItemProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { cn } from "@/vue-components/shadcn/utils";
import { RadioGroupIndicator, RadioGroupItem, useForwardProps } from "reka-ui";
import { computed } from "vue";

const props = defineProps<
  RadioGroupItemProps & {
    class?: HTMLAttributes["class"];
    image?: string;
    imageAlt?: string;
  }
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
    :class="
      cn(
        'radio-group-item peer',
        props.class,
        props.image ? 'radio-group-item--image' : '',
      )
    "
  >
    <div v-if="props.image" class="radio-group-item__image-wrapper">
      <img :src="props.image" :alt="props.imageAlt" />
      <span />
    </div>
    <RadioGroupIndicator
      :class="
        cn(
          'radio-group-indicator',
          props.image ? 'radio-group-indicator--with-image' : '',
        )
      "
    >
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

<style lang="scss">
.radio-group-item {
  aspect-ratio: 1 / 1;
  height: rem(30px);
  width: rem(30px);
  border: 1px solid $color-content;
  outline: none;
  cursor: pointer;

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
    background-color: $color-gray-4;

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

.radio-group-indicator {
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
