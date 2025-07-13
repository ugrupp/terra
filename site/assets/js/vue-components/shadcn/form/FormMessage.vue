<script lang="ts" setup>
import { ErrorMessage } from "vee-validate";
import { toValue } from "vue";
import { useFormField } from "./useFormField";

const { name, formMessageId } = useFormField();
</script>

<template>
  <ErrorMessage
    :id="formMessageId"
    as="p"
    :name="toValue(name)"
    class="error-message"
  />
</template>

<style lang="scss" scoped>
.error-message {
  color: $color-error;
  font-size: rem(14px);

  @include mappy-bp(md) {
    font-size: rem(16px);
  }
}
</style>
