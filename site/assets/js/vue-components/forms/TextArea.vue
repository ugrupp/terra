<template>
  <div class="c-text-area" :class="{ 'has-error': !!errorMessage }">
    <label :for="name" class="u-invisible">{{ label }}</label>
    <textarea
      :name="name"
      :id="name"
      :value="inputValue"
      rows="4"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
    />

    <p class="help-message" v-show="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { toRef } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  value: {
    type: String,
    default: undefined,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
});

// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const name = toRef(props, "name");

// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
} = useField(name, undefined, {
  initialValue: props.value,
});
</script>

<style lang="scss" scoped>
.c-text-area {
  position: relative;
  margin-bottom: calc(1em * 1.5);
  width: 100%;

  &.has-error {
    textarea {
      background-color: rgba($color-error, 0.2);

      &:focus {
        border-color: $color-error;
      }
    }

    .help-message {
      color: $color-error;
    }
  }
}

textarea {
  @include typi("form-large");
  @include font-smoothing;

  // fallback font for initial render to avoid FOIT
  font-family: $font-family-base-fallback;

  // fonts-loaded flag, triggered by JS
  .wf-active & {
    font-family: $font-family-base;
  }

  background-color: $color-white;
  border: 1px solid transparent;
  color: $color-content;
  padding: 9px 15px;
  outline: none;
  resize: none;
  width: 100%;
  transition:
    border-color 0.3s ease-in-out,
    color 0.3s ease-in-out,
    background-color 0.3s ease-in-out;

  &::placeholder {
    color: rgba($color-content, 0.5);
  }

  &:focus {
    border-color: rgba($color-content, 0.75);
  }
}

.help-message {
  position: absolute;
  bottom: calc(-1.5 * 1em);
  left: 0;
  margin: 0;
  font-size: rem(14px);

  @include mappy-bp(md) {
    font-size: rem(16px);
  }
}
</style>
