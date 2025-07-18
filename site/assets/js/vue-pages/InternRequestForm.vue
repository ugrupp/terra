<template>
  <div class="form-wrapper">
    <div class="form-wrapper__left-container">
      <span
        class="step-number c-headline c-headline--padded c-headline--primary"
        >FRAGE 4 von 8</span
      >
      <h2 class="c-headline-secondary">Question</h2>
      <div class="form-wrapper__left-container__navigation-container">
        <button class="c-button c-button--transparent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15.756"
            height="10.066"
          >
            <g fill="none" stroke="currentColor" stroke-miterlimit="10">
              <path d="M15.756 5.033H.706M5.376 9.713l-4.67-4.68 4.67-4.68" />
            </g>
          </svg>
        </button>
        <button class="c-button c-button--transparent form-next-button">
          <span>weiter</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15.756"
            height="10.066"
          >
            <g fill="none" stroke="currentColor" stroke-miterlimit="10">
              <path d="M0 5.033h15.05M10.38.353l4.67 4.68-4.67 4.68" />
            </g>
          </svg>
        </button>
      </div>
    </div>
    <div class="form-wrapper__right-container">
      <form @submit="onSubmit">
        <div class="form-fields-container">
          <FormField
            v-slot="{ componentField }"
            name="username"
            :validate-on-blur="!isFieldDirty"
          >
            <FormItem>
              <FormLabel class="u-invisible">Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="shadcn"
                  v-bind="componentField"
                />
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
                <Textarea
                  placeholder="Ihre Anmerkungen"
                  v-bind="componentField"
                />
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

          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>Email</FormLabel>

              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Select a verified email to display"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="m@example.com">
                      m@example.comfrfrfrfr
                    </SelectItem>
                    <SelectItem value="m@google.com"> m@google.com </SelectItem>
                    <SelectItem value="m@support.com">
                      m@support.com
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" type="radio" name="type">
            <FormItem>
              <FormControl>
                <RadioGroup
                  class="radio-group radio-group--with-images"
                  v-bind="componentField"
                >
                  <FormItem class="radio-form-item">
                    <FormControl>
                      <RadioGroupItem
                        value="all"
                        image="/images/form/altbau.jpg"
                      />
                    </FormControl>
                    <FormLabel>All new messages</FormLabel>
                  </FormItem>
                  <FormItem class="radio-form-item">
                    <FormControl>
                      <RadioGroupItem
                        value="mentions"
                        disabled
                        image="/images/form/bodenbelag.jpg"
                      />
                    </FormControl>
                    <FormLabel>Direct messages and mentions</FormLabel>
                  </FormItem>
                  <FormItem class="radio-form-item">
                    <FormControl>
                      <RadioGroupItem
                        value="none"
                        image="/images/form/haus.jpg"
                      />
                    </FormControl>
                    <FormLabel>Nothing</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <button class="c-button c-button--primary form-submit-button">
          <span>Jetzt anfragen</span>
          <span class="form-submit-button__icon-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15.756"
              height="10.066"
            >
              <g fill="none" stroke="currentColor" stroke-miterlimit="10">
                <path d="M0 5.033h15.05M10.38.353l4.67 4.68-4.67 4.68" />
              </g>
            </svg>
          </span>
        </button>
      </form>
    </div>
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/vue-components/shadcn/select";
import { Textarea } from "@/vue-components/shadcn/textarea";

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2).max(50),
    message: z.string().min(2).max(500),
    type: z.enum(["all", "mentions", "none"], {
      required_error: "You need to select a notification type.",
    }),
    email: z
      .string({
        required_error: "Please select an email to display.",
      })
      .email(),
  }),
);

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
  console.log(values);
});
</script>

<style lang="scss">
.form-wrapper {
  padding-bottom: rem(60px);
  padding-top: rem(40px);

  @include mappy-bp(md) {
    display: flex;
    gap: rem(20px);
    padding-bottom: rem(100px);
    padding-top: rem(80px);
  }

  &__left-container {
    @include mappy-bp(md) {
      width: 50%;
    }

    .step-number {
      @include typi("form");
      position: relative;
      display: inline-block;
      margin-bottom: rem(25px);

      &:before {
        content: "";
        width: 0px;
        height: 0px;
        border-style: solid;
        border-width: rem(7px) rem(8px) 0 rem(8px);
        border-color: $color-primary transparent transparent transparent;
        transform: rotate(0deg);
        position: absolute;
        bottom: rem(-7px);
        left: rem(5px);
      }
    }

    &__navigation-container {
      margin-top: rem(30px);
      display: flex;
      gap: rem(15px);

      @include mappy-bp(md) {
        margin-top: rem(120px);
      }

      button {
        height: rem(30px);
        padding: 0 rem(7px);
      }

      .form-next-button {
        text-transform: none;
        font-weight: 400;
        display: flex;
        align-items: center;
        gap: rem(20px);

        .wf-active & {
          font-family: $font-family-base;
        }
      }
    }
  }

  &__right-container {
    margin-top: rem(50px);

    @include mappy-bp(md) {
      width: 50%;
      margin-top: 0;
    }

    .form-submit-button {
      @include typi("form-large");
      text-transform: none;
      font-weight: 400;
      display: flex;
      align-items: center;
      gap: rem(30px);
      height: rem(46px);
      padding: 0 rem(15px);
      margin-top: rem(60px);

      @include mappy-bp(xxl) {
        margin-top: 0;
        flex-shrink: 0;
        align-self: flex-end;
      }

      .wf-active & {
        font-family: $font-family-base;
      }

      &__icon-wrapper {
        border: 1px solid $color-white;
        width: rem(25px);
        height: rem(25px);
        display: flex;
        align-items: center;
        justify-content: center;

        @include mappy-bp(md) {
          width: rem(30px);
          height: rem(30px);
        }
      }
    }
  }
}

form {
  @include mappy-bp(xxl) {
    display: flex;
    gap: rem(40px);
  }
}

.form-fields-container > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1.5rem * var(--tw-space-y-reverse));
}

.radio-group {
  display: flex;
  flex-direction: column;

  &--with-images {
    .radio-form-item {
      align-items: end;

      label {
        display: flex;
        margin-bottom: rem(13px);

        @include mappy-bp(xs) {
          margin-bottom: rem(16px);
        }
      }
    }
  }
}

.radio-form-item {
  display: flex;
  align-items: center;
  column-gap: 0.75rem;

  & > button:not(:disabled) {
    + label {
      cursor: pointer;
    }
  }
}
</style>
