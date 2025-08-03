<template>
  <div class="form-wrapper">
    <div class="form-wrapper__left-container">
      <span
        class="step-number c-headline c-headline--padded c-headline--primary"
        >{{
          hasError
            ? "Fehler"
            : isSubmitted ||
                stepIndex === 0 ||
                (!values.request_type_bodenbelag &&
                  !values.request_type_fussbodenheizung)
              ? "Anfrage"
              : `Frage ${currentStepNumber} von ${totalStepsInPath}`
        }}</span
      >
      <h2 class="c-headline-secondary form-question">
        {{
          isSubmitted
            ? "Vielen Dank für Ihre Anfrage. Wir werden uns in Kürze bei Ihnen melden."
            : hasError
              ? errorMessage
              : currentStepQuestion
        }}
      </h2>
      <div
        v-if="stepIndex > 0 && !hasError"
        class="form-wrapper__left-container__navigation-container"
      >
        <button
          v-if="stepIndex > 1"
          class="c-button c-button--transparent"
          @click="prevStep"
        >
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
        <button
          v-if="stepIndex < steps.length"
          class="c-button c-button--transparent form-next-button"
          @click="handleNextStep()"
        >
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
    <div
      :class="[
        'form-wrapper__right-container',
        stepIndex === 0 || isSubmitted || hasError
          ? 'form-wrapper__right-container--start-form'
          : '',
      ]"
    >
      <form
        v-if="stepIndex > 0"
        @submit="
          (e) => {
            e.preventDefault();
            validate();
            if (stepIndex === steps.length && meta.valid) {
              onSubmit();
            }
          }
        "
      >
        <div class="form-fields-container">
          <FormField
            v-for="field in visibleFields"
            :key="field.id"
            v-slot="{ componentField, value, handleChange }"
            :name="field.id"
            :validate-on-blur="!isFieldDirty"
            :type="
              field.type === 'RADIO' || field.type === 'RADIO_IMAGE'
                ? 'radio'
                : field.type === 'CHECKBOX_IMAGE'
                  ? 'checkbox'
                  : null
            "
          >
            <FormItem>
              <!-- RADIO -->
              <template v-if="field.type === 'RADIO'">
                <p v-if="field.label" class="form-field-headline">
                  {{ field.label }}
                </p>
                <RadioGroup class="radio-group" v-bind="componentField">
                  <FormItem
                    v-for="(option, index) in field.values as FieldValue[]"
                    :key="index"
                    class="radio-form-item"
                  >
                    <FormControl>
                      <RadioGroupItem :value="option.value" />
                    </FormControl>
                    <FormLabel>{{ option.label }}</FormLabel>
                  </FormItem>
                </RadioGroup>
              </template>
              <!-- RADIO IMAGE -->
              <template v-if="field.type === 'RADIO_IMAGE'">
                <p v-if="field.label" class="form-field-headline">
                  {{ field.label }}
                </p>
                <RadioGroup
                  class="radio-group radio-group--with-images"
                  v-bind="componentField"
                >
                  <FormItem
                    v-for="(option, index) in field.values as FieldValue[]"
                    :key="index"
                    class="radio-form-item"
                  >
                    <FormControl>
                      <RadioGroupItem
                        :value="option.value"
                        :image="option.image"
                        :image-alt="option.imageAlt"
                      />
                    </FormControl>
                    <FormLabel>{{ option.label }}</FormLabel>
                  </FormItem>
                </RadioGroup>
              </template>
              <!-- CHECKBOX IMAGE -->
              <div
                v-if="field.type === 'CHECKBOX_IMAGE'"
                class="checkbox-form-item checkbox-form-item--with-images"
              >
                <FormControl>
                  <Checkbox
                    :model-value="value"
                    @update:model-value="handleChange"
                    :image="field.image"
                    :image-alt="field.imageAlt"
                  />
                </FormControl>
                <FormLabel>{{ field.label }}</FormLabel>
              </div>
              <!-- SELECT -->
              <template v-if="field.type === 'SELECT'">
                <FormLabel class="u-invisible">{{ field.label }}</FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue :placeholder="field.placeholder" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        v-for="(option, index) in field.values as FieldValue[]"
                        :key="index"
                        :value="option.value"
                      >
                        {{ option.label }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </template>
              <!--  Input -->
              <template v-if="field.type === 'INPUT'">
                <FormLabel class="u-invisible">{{ field.label }}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    :placeholder="field.placeholder"
                    v-bind="componentField"
                  />
                </FormControl>
              </template>
              <!--  Textarea -->
              <template v-if="field.type === 'TEXTAREA'">
                <FormLabel class="u-invisible">{{ field.label }}</FormLabel>
                <FormControl>
                  <Textarea
                    :placeholder="field.placeholder"
                    v-bind="componentField"
                  />
                </FormControl>
              </template>
              <FormMessage />
            </FormItem>
          </FormField>

          <!-- Datenschutz for contact step -->
          <div
            v-if="stepIndex === steps.length && !hasError"
            class="form-privacy-section"
          >
            <p class="form-privacy-text">
              Wir legen großen Wert auf den Schutz Ihrer Daten. Hier finden Sie
              unsere
              <a href="/datenschutz/" target="_blank">Datenschutzerklärung</a>.
            </p>
          </div>

          <!-- Honeypot -->
          <input type="text" name="strawberry_fields" class="u-invisible" />
        </div>

        <button
          v-if="stepIndex === steps.length && !hasError"
          type="submit"
          class="c-button c-button--primary form-submit-button"
        >
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
      <button
        v-if="stepIndex === 0 && !isSubmitted && !hasError"
        class="c-button c-button--primary form-submit-button"
        @click="onStartForm"
      >
        <span>Jetzt loslegen</span>
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
      <button
        v-if="isSubmitted"
        class="c-button c-button--primary form-submit-button"
        @click="goToHomepage"
      >
        <span>Zur Startseite</span>
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
      <button
        v-if="hasError"
        class="c-button c-button--primary form-submit-button"
        @click="retrySubmission"
      >
        <span>Erneut versuchen</span>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm, Form, Field, ErrorMessage } from "vee-validate";

// Import types and configurations
import type { FormValues } from "./ClientRequest/types";
import { steps } from "./ClientRequest/formSteps";
import { formSchema } from "./ClientRequest/formSchema";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/vue-components/shadcn/form";
import { Checkbox } from "@/vue-components/shadcn/checkbox";
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

const stepIndex = ref(0);
const isSubmitted = ref(false);
const hasError = ref(false);
const errorMessage = ref("");

const initialValues: FormValues = {
  request_type_bodenbelag: undefined,
  request_type_fussbodenheizung: undefined,
  house_type: undefined,
  stockwerk: undefined,
  object_age: undefined,
  remove_old_covering: undefined,
  old_covering_type: undefined,
  floor_covering_type: undefined,
  installation_method: undefined,
  heating_system: undefined,
  underground_type: undefined,
  construction_year: undefined,
  square_meters_bodenbelag: undefined,
  square_meters_fussbodenheizung: undefined,
  city: undefined,
  postal_code: undefined,
  street: undefined,
  timing_preference: undefined,
  first_name: undefined,
  last_name: undefined,
  email: undefined,
  phone: undefined,
  comments: undefined,
};

const currentStepForSchema = computed(() => {
  if (stepIndex.value === 0) return 0;

  const currentStep = steps[stepIndex.value - 1];

  // Map step IDs to schema indices
  const schemaMap = {
    WHAT: 0,
    HOUSE_TYPE: 1,
    OBJECT: 2,
    FLOOR_COVERING_TYPE: 3,
    HOW: 4,
    HOW_MANY_METERS_BODENBELAG: 5,
    WHICH_SYSTEM: 6,
    UNDERGROUND: 7,
    YEAR_OF_CONSTRUCTION: 8,
    HOW_MANY_METERS_FUSSBODENHEIZUNG: 9,
    WHERE: 10,
    WHEN: 11,
    CONTACT: 12,
  };

  return schemaMap[currentStep.id] || 0;
});

const validationSchema = computed(() => {
  return toTypedSchema(formSchema[currentStepForSchema.value]);
});

const {
  handleSubmit,
  values,
  meta,
  validate,
  isFieldDirty,
  setFieldValue,
  resetForm,
} = useForm({
  // Our stepIndex 0 is not a step of the form and we need to skip it.
  // Not the cleanest code, sorry.
  validationSchema,
  initialValues,
  keepValuesOnUnmount: true,
});

const prevStep = () => {
  if (stepIndex.value === 0) return;

  const currentStep = steps[stepIndex.value - 1];
  let prevStepId = currentStep.previousStep;

  if (currentStep.id === "WHERE") {
    if (!values.request_type_fussbodenheizung) {
      // Fußbodenheizung is not selected - comes after HOW_MANY_METERS_BODENBELAG
      prevStepId = "HOW_MANY_METERS_BODENBELAG";
    }
  }

  // Handle going back from Fußbodenheizung steps when both are selected
  if (currentStep.id === "WHICH_SYSTEM" && values.request_type_bodenbelag) {
    prevStepId = "HOW_MANY_METERS_BODENBELAG";
  }

  if (prevStepId) {
    stepIndex.value = steps.findIndex((step) => step.id === prevStepId) + 1;
  }
};

const nextStep = () => {
  if (stepIndex.value === steps.length) return;

  const currentStep = steps[stepIndex.value - 1];
  let nextStepId = currentStep.nextStep;

  // Handle dynamic navigation based on request types
  if (currentStep.id === "OBJECT") {
    if (!values.request_type_bodenbelag) {
      // Only Fußbodenheizung selected
      nextStepId = "WHICH_SYSTEM";
    }
  }

  // Navigation from Bodenbelag meters when only Bodenbelag is selected, go to WHERE
  if (
    currentStep.id === "HOW_MANY_METERS_BODENBELAG" &&
    !values.request_type_fussbodenheizung
  ) {
    nextStepId = "WHERE";
  }

  if (nextStepId) {
    stepIndex.value = steps.findIndex((step) => step.id === nextStepId) + 1;
  }
};

const handleNextStep = async () => {
  const result = await validate();
  if (result.valid) {
    nextStep();
  }
};

const shouldShowField = (field: Field) => {
  // Show the remove_old_covering field only if altbau is selected
  if (field.id === "remove_old_covering") {
    return values.object_age === "altbau";
  }
  // Show the old_covering_type field only if altbau is selected and remove_old_covering is "ja"
  if (field.id === "old_covering_type") {
    return (
      values.object_age === "altbau" && values.remove_old_covering === "ja"
    );
  }
  return true;
};

const visibleFields = computed(() => {
  if (stepIndex.value === 0) return [];

  const currentStep = steps[stepIndex.value - 1];

  // Filter out steps that don't belong to the current path
  if (
    currentStep.id === "FLOOR_COVERING_TYPE" ||
    currentStep.id === "HOW" ||
    currentStep.id === "HOW_MANY_METERS_BODENBELAG"
  ) {
    if (!values.request_type_bodenbelag) return [];
  }

  if (
    currentStep.id === "WHICH_SYSTEM" ||
    currentStep.id === "UNDERGROUND" ||
    currentStep.id === "YEAR_OF_CONSTRUCTION" ||
    currentStep.id === "HOW_MANY_METERS_FUSSBODENHEIZUNG"
  ) {
    if (!values.request_type_fussbodenheizung) return [];
  }

  return currentStep.fields.filter(shouldShowField);
});

// Calculate the correct step number and total for the current path
const currentPathSteps = computed(() => {
  if (!values.request_type_bodenbelag && !values.request_type_fussbodenheizung)
    return [];

  const sharedSteps = [
    "WHAT",
    "HOUSE_TYPE",
    "OBJECT",
    "WHERE",
    "WHEN",
    "CONTACT",
  ];

  const pathSteps = [...sharedSteps.slice(0, 3)]; // WHAT, HOUSE_TYPE, OBJECT

  // Add Bodenbelag-specific steps if selected
  if (values.request_type_bodenbelag) {
    pathSteps.push("FLOOR_COVERING_TYPE", "HOW", "HOW_MANY_METERS_BODENBELAG");
  }

  // Add Fußbodenheizung-specific steps if selected
  if (values.request_type_fussbodenheizung) {
    pathSteps.push(
      "WHICH_SYSTEM",
      "UNDERGROUND",
      "YEAR_OF_CONSTRUCTION",
      "HOW_MANY_METERS_FUSSBODENHEIZUNG",
    );
  }

  // Add remaining shared steps
  pathSteps.push(...sharedSteps.slice(3)); // WHERE, WHEN, CONTACT

  return pathSteps;
});

const currentStepNumber = computed(() => {
  if (stepIndex.value === 0) return 0;

  const currentStep = steps[stepIndex.value - 1];
  const pathSteps = currentPathSteps.value;

  return pathSteps.findIndex((stepId) => stepId === currentStep.id) + 1;
});

const totalStepsInPath = computed(() => {
  return currentPathSteps.value.length;
});

// Dynamic question text based on selected request types
const currentStepQuestion = computed(() => {
  if (stepIndex.value === 0) {
    return "Um Ihre Anfrage direkt bearbeiten zu können, bitte wir Sie folgende Fragen zu beantworten.";
  }

  const currentStep = steps[stepIndex.value - 1];

  // Dynamic question for HOUSE_TYPE step
  if (currentStep.id === "HOUSE_TYPE") {
    if (
      values.request_type_bodenbelag &&
      values.request_type_fussbodenheizung
    ) {
      return "Wo wollen Sie Ihren neuen Bodenbelag verlegen und Ihre neue Fußbodenheizung einbauen?";
    } else if (values.request_type_bodenbelag) {
      return "Wo wollen Sie Ihren neuen Bodenbelag verlegen?";
    } else if (values.request_type_fussbodenheizung) {
      return "Wo wollen Sie Ihre neue Fußbodenheizung einbauen?";
    }
  }

  // Use default question for all other steps
  return currentStep.question;
});

// Reset conditional fields when switching from altbau to neubau
watch(
  () => values.object_age,
  (newValue, oldValue) => {
    if (oldValue === "altbau" && newValue === "neubau") {
      setFieldValue("remove_old_covering", undefined);
      setFieldValue("old_covering_type", undefined);
    }
  },
);

// Reset old_covering_type when switching from "ja" to "nein"
watch(
  () => values.remove_old_covering,
  (newValue, oldValue) => {
    if (oldValue === "ja" && newValue === "nein") {
      setFieldValue("old_covering_type", undefined);
    }
  },
);

// Reset Bodenbelag-related fields when unchecking Bodenbelag
watch(
  () => values.request_type_bodenbelag,
  (newValue, oldValue) => {
    if (oldValue === true && newValue === false) {
      setFieldValue("floor_covering_type", undefined);
      setFieldValue("installation_method", undefined);
      setFieldValue("square_meters_bodenbelag", undefined);
    }
  },
);

// Reset Fußbodenheizung-related fields when unchecking Fußbodenheizung
watch(
  () => values.request_type_fussbodenheizung,
  (newValue, oldValue) => {
    if (oldValue === true && newValue === false) {
      setFieldValue("heating_system", undefined);
      setFieldValue("underground_type", undefined);
      setFieldValue("construction_year", undefined);
      setFieldValue("square_meters_fussbodenheizung", undefined);
    }
  },
);

const onStartForm = () => {
  stepIndex.value = 1;
};

const onSubmit = async () => {
  try {
    // Reset error state
    hasError.value = false;
    errorMessage.value = "";

    const formData = new FormData();

    // Add all form values to FormData
    Object.keys(values).forEach((key) => {
      if (values[key] !== undefined && values[key] !== null) {
        formData.append(key, values[key]);
      }
    });

    // Submit to Formspark
    const response = await fetch("https://submit-form.com/PKajTUBnF", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("Form submitted successfully!");
      isSubmitted.value = true;
    } else {
      throw new Error("Form submission failed");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    hasError.value = true;
    errorMessage.value =
      "Es gab ein Problem beim Senden Ihrer Anfrage. Bitte versuchen Sie es erneut.";
  }
};

const retrySubmission = () => {
  // Reset error state and go back to the last step
  hasError.value = false;
  errorMessage.value = "";
  // User stays on the current step and can try submitting again
};

const goToHomepage = () => {
  // Navigate to homepage - adjust this based on your routing setup
  window.location.href = "/";
};
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

    .form-question {
      max-width: rem(300px);
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

    &--start-form {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      gap: rem(40px);
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

.form-field-headline {
  @include typi("form-large");
  @include font-smoothing;
  margin-bottom: rem(20px);
}

.form-fields-container {
  flex-grow: 1;

  > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(1.5rem * var(--tw-space-y-reverse));
  }
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

.checkbox-form-item,
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

.checkbox-form-item--with-images {
  align-items: end;

  label {
    display: flex;
    margin-bottom: rem(13px);

    @include mappy-bp(xs) {
      margin-bottom: rem(16px);
    }
  }
}

.form-privacy-section {
  margin-top: rem(30px);
}

.form-privacy-text {
  a {
    color: $color-primary;
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
}
</style>
