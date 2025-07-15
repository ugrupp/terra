<template>
  <div class="client-request-form">
    <div class="form-header">
      <p class="form-description">Intern request form</p>
    </div>

    <form @submit="onSubmit">
      <FormField
        v-slot="{ componentField }"
        name="username"
        :validate-on-blur="!isFieldDirty"
      >
        <FormItem>
          <FormLabel class="u-invisible">Username</FormLabel>
          <FormControl>
            <Input type="text" placeholder="shadcn" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        name="message"
        :validate-on-blur="!isFieldDirty"
      >
        <FormItem>
          <FormLabel class="u-invisible">Ihre Anmerkungen</FormLabel>
          <FormControl>
            <Textarea placeholder="Ihre Anmerkungen" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" type="radio" name="type">
        <FormItem>
          <FormControl>
            <RadioGroup class="radio-group" v-bind="componentField">
              <FormItem class="radio-form-item">
                <FormControl>
                  <RadioGroupItem value="all" />
                </FormControl>
                <FormLabel>All new messages</FormLabel>
              </FormItem>
              <FormItem class="radio-form-item">
                <FormControl>
                  <RadioGroupItem value="mentions" disabled />
                </FormControl>
                <FormLabel>Direct messages and mentions</FormLabel>
              </FormItem>
              <FormItem class="radio-form-item">
                <FormControl>
                  <RadioGroupItem value="none" />
                </FormControl>
                <FormLabel>Nothing</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <button>Sign up</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm, Form, Field, ErrorMessage } from "vee-validate";
import * as z from "zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/vue-components/shadcn/form";
import { Input } from "@/vue-components/shadcn/input";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/vue-components/shadcn/radio-group";
import { Textarea } from "@/vue-components/shadcn/textarea";

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2).max(50),
    message: z.string().min(2).max(500),
    type: z.enum(["all", "mentions", "none"], {
      required_error: "You need to select a notification type.",
    }),
  }),
);

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
  console.log(values);
});
</script>

<style lang="scss" scoped>
.client-request-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;

  .form-description {
    color: #666;
    font-size: 1.1rem;
  }
}

form > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1.5rem * var(--tw-space-y-reverse));
}

.radio-group {
  display: flex;
  flex-direction: column;
}

.radio-form-item {
  display: flex;
  align-items: center;
  column-gap: 0.75rem;

  & > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(0px * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(0px * var(--tw-space-y-reverse));
  }
}
</style>
