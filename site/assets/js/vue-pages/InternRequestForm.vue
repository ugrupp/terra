<template>
  <div class="form-wrapper">
    <div class="form-wrapper__left-container">
      <!-- PDF Export Button - always visible, positioned below navigation -->
      <div v-if="!isSubmitted" class="form-pdf-export-container">
        <button
          class="c-button c-button--secondary form-pdf-button"
          type="button"
          @click="exportToPDF"
        >
          <span>Speichern als PDF</span>
          <span class="form-submit-button__icon-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="14 14 17 16"
              fill="currentColor"
            >
              <path
                d="M30 22.79v4.43a2.19 2.19 0 0 1-2.18 2.18H17.16A2.18 2.18 0 0 1 15 27.22v-4.5h-1v4.5a3.16 3.16 0 0 0 3.16 3.15h10.68A3.16 3.16 0 0 0 31 27.22v-4.43z"
              />
              <path
                fill="none"
                stroke="currentColor"
                stroke-miterlimit="10"
                d="M22.5 14.63v11.52M26.08 22.57l-3.58 3.58-3.58-3.58"
              />
            </svg>
          </span>
        </button>
      </div>
      <span
        class="step-number c-headline c-headline--padded c-headline--primary"
        >{{
          hasError
            ? "Fehler"
            : isSubmitted ||
                (!values.request_type_bodenbelag &&
                  !values.request_type_fussbodenheizung &&
                  !values.request_type_refurbish_parquet)
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
      <button
        v-if="hasError"
        class="c-button c-button--primary form-submit-button form-error-button"
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
      <button
        v-if="isSubmitted"
        class="c-button c-button--primary form-submit-button form-is-submitted-button"
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
    </div>
    <div
      :class="[
        'form-wrapper__right-container',
        isSubmitted || hasError
          ? 'form-wrapper__right-container--start-form'
          : '',
      ]"
    >
      <form v-if="!isSubmitted" @submit="onSubmit">
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
              <!-- CHECKBOX -->
              <template v-if="field.type === 'CHECKBOX'">
                <p v-if="field.label" class="form-field-headline">
                  {{ field.label }}
                </p>
                <div class="checkbox-group">
                  <FormItem
                    v-for="(option, index) in field.values as FieldValue[]"
                    :key="index"
                    class="checkbox-form-item"
                  >
                    <FormControl>
                      <Checkbox
                        :model-value="
                          Array.isArray(value) && value.includes(option.value)
                        "
                        @update:model-value="
                          (checked) => {
                            const currentValue = Array.isArray(value)
                              ? value
                              : [];
                            if (checked) {
                              handleChange([...currentValue, option.value]);
                            } else {
                              handleChange(
                                currentValue.filter((v) => v !== option.value),
                              );
                            }
                          }
                        "
                      />
                    </FormControl>
                    <FormLabel>{{ option.label }}</FormLabel>
                  </FormItem>
                </div>
              </template>
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

          <!-- Subject -->
          <input
            type="hidden"
            name="_email.subject"
            value="Neue Nachricht vom terra-boden.de internen Anfrageformular"
          />

          <!-- Honeypot -->
          <input
            type="text"
            name="strawberry_fields"
            class="u-invisible"
            tabindex="-1"
          />
        </div>

        <div class="form-wrapper__right-container__navigation-container">
          <button
            v-if="stepIndex > 0 && !hasError && !isSubmitted"
            class="c-button c-button--transparent navigation-button"
            type="button"
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
            v-if="stepIndex < steps.length - 1 && !hasError && !isSubmitted"
            class="c-button c-button--primary form-next-button navigation-button"
            type="button"
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
          <button
            v-if="stepIndex === steps.length - 1 && !hasError && !isSubmitted"
            type="submit"
            class="c-button c-button--primary form-submit-button"
            :disabled="submitting"
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
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { useFormspark } from "@formspark/vue-use-formspark";

// Import types and configurations
import { Field as FieldType, FieldValue } from "./types";
import {
  FormValues,
  SCHEMA_BODENBELAG,
  SCHEMA_FUSSBODENHEIZUNG,
  SCHEMA_REFURBISH_PARQUET,
  SCHEMA_BODENBELAG_AND_FUSSBODENHEIZUNG,
  SCHEMA_BODENBELAG_AND_REFURBISH_PARQUET,
  SCHEMA_FUSSBODENHEIZUNG_AND_REFURBISH_PARQUET,
  SCHEMA_BODENBELAG_AND_FUSSBODENHEIZUNG_AND_REFURBISH_PARQUET,
} from "./InternRequest/types";
import { steps } from "./InternRequest/formSteps";
import { formSchema, SCHEMA_MAP } from "./InternRequest/formSchema";

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
import { generatePDF } from "./InternRequest/pdfGenerator";

const stepIndex = ref(0);
const isSubmitted = ref(false);
const hasError = ref(false);
const errorMessage = ref("");

const [submit, submitting] = useFormspark({
  formId: "ORzo2onNg",
});

const initialValues: FormValues = {
  request_type_bodenbelag: undefined,
  request_type_fussbodenheizung: undefined,
  request_type_refurbish_parquet: undefined,
  house_type: undefined,
  stockwerk: undefined,
  object_age: undefined,
  remove_old_covering: undefined,
  old_covering_type: undefined,
  floor_covering_type: undefined,
  bodenbelag_type_1: undefined,
  bodenbelag_type_2: undefined,
  bodenbelag_type_3: undefined,
  bodenbelag_type_notes: undefined,
  room1_bodenbelag: undefined,
  room2_bodenbelag: undefined,
  room3_bodenbelag: undefined,
  room4_bodenbelag: undefined,
  room5_bodenbelag: undefined,
  substrate_preparation_bodenbelag: undefined,
  substrate_preparation_method_bodenbelag: [],
  substrate_preparation_comments_bodenbelag: undefined,
  installation_method: undefined,
  square_meters_bodenbelag: undefined,
  baseboards_needed: undefined,
  baseboard_type: undefined,
  baseboard_notes: undefined,
  room_doors_needed: undefined,
  room_doors_quantity: undefined,
  room_doors_measurements: undefined,
  room_doors_execution: undefined,
  heating_system: undefined,
  underground_type: undefined,
  construction_year: undefined,
  room1_fussbodenheizung: undefined,
  room2_fussbodenheizung: undefined,
  room3_fussbodenheizung: undefined,
  room4_fussbodenheizung: undefined,
  room5_fussbodenheizung: undefined,
  substrate_preparation_fussbodenheizung: undefined,
  substrate_preparation_method_fussbodenheizung: [],
  substrate_preparation_comments_fussbodenheizung: undefined,
  square_meters_fussbodenheizung: undefined,
  parquet_refurbish_type: undefined,
  parquet_refurbish_how: undefined,
  parquet_refurbish_treatment: undefined,
  square_meters_parquet_refurbish: undefined,
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

const CURRENT_SCHEMA = computed(() => {
  if (
    values.request_type_bodenbelag &&
    values.request_type_fussbodenheizung &&
    values.request_type_refurbish_parquet
  ) {
    return SCHEMA_BODENBELAG_AND_FUSSBODENHEIZUNG_AND_REFURBISH_PARQUET;
  } else if (
    values.request_type_bodenbelag &&
    values.request_type_fussbodenheizung
  ) {
    return SCHEMA_BODENBELAG_AND_FUSSBODENHEIZUNG;
  } else if (
    values.request_type_bodenbelag &&
    values.request_type_refurbish_parquet
  ) {
    return SCHEMA_BODENBELAG_AND_REFURBISH_PARQUET;
  } else if (
    values.request_type_fussbodenheizung &&
    values.request_type_refurbish_parquet
  ) {
    return SCHEMA_FUSSBODENHEIZUNG_AND_REFURBISH_PARQUET;
  } else if (values.request_type_bodenbelag) {
    return SCHEMA_BODENBELAG;
  } else if (values.request_type_fussbodenheizung) {
    return SCHEMA_FUSSBODENHEIZUNG;
  } else if (values.request_type_refurbish_parquet) {
    return SCHEMA_REFURBISH_PARQUET;
  } else return [];
});

const currentStepForSchema = computed(() => {
  const currentStep = steps[stepIndex.value];
  return SCHEMA_MAP[currentStep.id] || 0;
});

const validationSchema = computed(() => {
  return toTypedSchema(formSchema[currentStepForSchema.value]);
});

const { values, meta, validate, isFieldDirty, setFieldValue } = useForm({
  validationSchema,
  initialValues,
  keepValuesOnUnmount: true,
});

const prevStep = () => {
  if (stepIndex.value === 0) return;
  let prevStepId = CURRENT_SCHEMA.value[currentStepNumber.value - 2];
  if (prevStepId) {
    stepIndex.value = steps.findIndex((step) => step.id === prevStepId);
  }
};

const nextStep = () => {
  if (currentStepNumber.value === totalStepsInPath.value) return;
  let nextStepId = CURRENT_SCHEMA.value[currentStepNumber.value];
  if (nextStepId) {
    stepIndex.value = steps.findIndex((step) => step.id === nextStepId);
  }
};

const handleNextStep = async () => {
  const result = await validate();
  if (result.valid) {
    nextStep();
  }
};

const shouldShowField = (field: FieldType) => {
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
  // Show Bodenbelag substrate preparation method and comments only if substrate_preparation_bodenbelag is "ja"
  if (
    field.id === "substrate_preparation_method_bodenbelag" ||
    field.id === "substrate_preparation_comments_bodenbelag"
  ) {
    return values.substrate_preparation_bodenbelag === "ja";
  }
  // Show Fußbodenheizung substrate preparation method and comments only if substrate_preparation_fussbodenheizung is "ja"
  if (
    field.id === "substrate_preparation_method_fussbodenheizung" ||
    field.id === "substrate_preparation_comments_fussbodenheizung"
  ) {
    return values.substrate_preparation_fussbodenheizung === "ja";
  }
  // Show baseboard type and notes only if baseboards_needed is "ja"
  if (field.id === "baseboard_type" || field.id === "baseboard_notes") {
    return values.baseboards_needed === "ja";
  }
  // Show room doors fields only if room_doors_needed is "ja"
  if (
    field.id === "room_doors_quantity" ||
    field.id === "room_doors_measurements" ||
    field.id === "room_doors_execution"
  ) {
    return values.room_doors_needed === "ja";
  }
  return true;
};

const visibleFields = computed(() => {
  const currentStep = steps[stepIndex.value];

  // Filter out steps that don't belong to the current path
  if (
    currentStep.id === "FLOOR_COVERING_TYPE" ||
    currentStep.id === "BODENBELAG_TYPE" ||
    currentStep.id === "ROOMS_BODENBELAG" ||
    currentStep.id === "SUBSTRATE_PREPARATION_BODENBELAG" ||
    currentStep.id === "HOW" ||
    currentStep.id === "HOW_MANY_METERS_BODENBELAG" ||
    currentStep.id === "BASEBOARDS" ||
    currentStep.id === "ROOM_DOORS"
  ) {
    if (!values.request_type_bodenbelag) return [];
  }

  if (
    currentStep.id === "WHICH_SYSTEM" ||
    currentStep.id === "UNDERGROUND" ||
    currentStep.id === "YEAR_OF_CONSTRUCTION" ||
    currentStep.id === "ROOMS_FUSSBODENHEIZUNG" ||
    currentStep.id === "SUBSTRATE_PREPARATION_FUSSBODENHEIZUNG" ||
    currentStep.id === "HOW_MANY_METERS_FUSSBODENHEIZUNG"
  ) {
    if (!values.request_type_fussbodenheizung) return [];
  }

  if (
    currentStep.id === "PARQUET_REFURBISH_TYPE" ||
    currentStep.id === "PARQUET_REFURBISH_HOW" ||
    currentStep.id === "PARQUET_REFURBISH_TREATMENT" ||
    currentStep.id === "HOW_MANY_METERS_PARQUET_REFURBISH"
  ) {
    if (!values.request_type_refurbish_parquet) return [];
  }

  return currentStep.fields.filter(shouldShowField);
});

const currentStepNumber = computed(() => {
  const currentStep = steps[stepIndex.value];
  const pathSteps = CURRENT_SCHEMA.value;

  return pathSteps.findIndex((stepId) => stepId === currentStep.id) + 1;
});

const totalStepsInPath = computed(() => {
  return CURRENT_SCHEMA.value.length;
});

// Dynamic question text based on selected request types
const currentStepQuestion = computed(() => {
  const currentStep = steps[stepIndex.value];

  // Dynamic question for HOUSE_TYPE step
  if (currentStep.id === "HOUSE_TYPE") {
    if (
      values.request_type_bodenbelag &&
      values.request_type_fussbodenheizung &&
      values.request_type_refurbish_parquet
    ) {
      return "Wo wollen Sie Ihren neuen Bodenbelag verlegen, Ihre neue Fußbodenheizung einbauen und Ihr Parkett aufbereiten?";
    } else if (
      values.request_type_bodenbelag &&
      values.request_type_fussbodenheizung
    ) {
      return "Wo wollen Sie Ihren neuen Bodenbelag verlegen und Ihre neue Fußbodenheizung einbauen?";
    } else if (
      values.request_type_bodenbelag &&
      values.request_type_refurbish_parquet
    ) {
      return "Wo wollen Sie Ihren neuen Bodenbelag verlegen und Ihr Parkett aufbereiten?";
    } else if (
      values.request_type_fussbodenheizung &&
      values.request_type_refurbish_parquet
    ) {
      return "Wo wollen Sie Ihre neue Fußbodenheizung einbauen und Ihr Parkett aufbereiten?";
    } else if (values.request_type_bodenbelag) {
      return "Wo wollen Sie Ihren neuen Bodenbelag verlegen?";
    } else if (values.request_type_fussbodenheizung) {
      return "Wo wollen Sie Ihre neue Fußbodenheizung einbauen?";
    } else if (values.request_type_refurbish_parquet) {
      return "Wo wollen Sie Ihr Parkett aufbereiten?";
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

// Reset Bodenbelag substrate preparation method and comments when switching from "ja" to "nein"
watch(
  () => values.substrate_preparation_bodenbelag,
  (newValue, oldValue) => {
    if (oldValue === "ja" && newValue === "nein") {
      setFieldValue("substrate_preparation_method_bodenbelag", []);
      setFieldValue("substrate_preparation_comments_bodenbelag", undefined);
    }
  },
);

// Reset Fußbodenheizung substrate preparation method and comments when switching from "ja" to "nein"
watch(
  () => values.substrate_preparation_fussbodenheizung,
  (newValue, oldValue) => {
    if (oldValue === "ja" && newValue === "nein") {
      setFieldValue("substrate_preparation_method_fussbodenheizung", []);
      setFieldValue(
        "substrate_preparation_comments_fussbodenheizung",
        undefined,
      );
    }
  },
);

// Reset baseboard type and notes when switching from "ja" to "nein"
watch(
  () => values.baseboards_needed,
  (newValue, oldValue) => {
    if (oldValue === "ja" && newValue === "nein") {
      setFieldValue("baseboard_type", undefined);
      setFieldValue("baseboard_notes", undefined);
    }
  },
);

// Reset room doors related fields when switching from "ja" to "nein"
watch(
  () => values.room_doors_needed,
  (newValue, oldValue) => {
    if (oldValue === "ja" && newValue === "nein") {
      setFieldValue("room_doors_quantity", undefined);
      setFieldValue("room_doors_measurements", undefined);
      setFieldValue("room_doors_execution", undefined);
    }
  },
);

// Reset Bodenbelag-related fields when unchecking Bodenbelag
watch(
  () => values.request_type_bodenbelag,
  (newValue, oldValue) => {
    if (oldValue === true && newValue === false) {
      setFieldValue("floor_covering_type", undefined);
      setFieldValue("bodenbelag_type_1", undefined);
      setFieldValue("bodenbelag_type_2", undefined);
      setFieldValue("bodenbelag_type_3", undefined);
      setFieldValue("bodenbelag_type_notes", undefined);
      setFieldValue("room1_bodenbelag", undefined);
      setFieldValue("room2_bodenbelag", undefined);
      setFieldValue("room3_bodenbelag", undefined);
      setFieldValue("room4_bodenbelag", undefined);
      setFieldValue("room5_bodenbelag", undefined);
      setFieldValue("substrate_preparation_bodenbelag", undefined);
      setFieldValue("substrate_preparation_method_bodenbelag", []);
      setFieldValue("substrate_preparation_comments_bodenbelag", undefined);
      setFieldValue("installation_method", undefined);
      setFieldValue("square_meters_bodenbelag", undefined);
      setFieldValue("baseboards_needed", undefined);
      setFieldValue("baseboard_type", undefined);
      setFieldValue("baseboard_notes", undefined);
      setFieldValue("room_doors_needed", undefined);
      setFieldValue("room_doors_quantity", undefined);
      setFieldValue("room_doors_measurements", undefined);
      setFieldValue("room_doors_execution", undefined);
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
      setFieldValue("room1_fussbodenheizung", undefined);
      setFieldValue("room2_fussbodenheizung", undefined);
      setFieldValue("room3_fussbodenheizung", undefined);
      setFieldValue("room4_fussbodenheizung", undefined);
      setFieldValue("room5_fussbodenheizung", undefined);
      setFieldValue("substrate_preparation_fussbodenheizung", undefined);
      setFieldValue("substrate_preparation_method_fussbodenheizung", []);
      setFieldValue(
        "substrate_preparation_comments_fussbodenheizung",
        undefined,
      );
      setFieldValue("square_meters_fussbodenheizung", undefined);
    }
  },
);

// Reset RefurbishParquet-related fields when unchecking Fußbodenheizung
watch(
  () => values.request_type_refurbish_parquet,
  (newValue, oldValue) => {
    if (oldValue === true && newValue === false) {
      setFieldValue("parquet_refurbish_type", undefined);
      setFieldValue("parquet_refurbish_how", undefined);
      setFieldValue("parquet_refurbish_treatment", undefined);
      setFieldValue("square_meters_parquet_refurbish", undefined);
    }
  },
);

const onSubmit = async (e) => {
  e.preventDefault();
  validate();
  if (stepIndex.value === steps.length - 1 && meta.value.valid) {
    try {
      // Reset error state
      hasError.value = false;
      errorMessage.value = "";
      await submit({ ...values });
      isSubmitted.value = true;
    } catch (error) {
      hasError.value = true;
      errorMessage.value =
        "Es gab ein Problem beim Senden Ihrer Anfrage. Bitte versuchen Sie es erneut.";
    }
  }
};

const retrySubmission = () => {
  // Reset error state and go back to the last step
  hasError.value = false;
  errorMessage.value = "";
  // User stays on the current step and can try submitting again
};

const exportToPDF = () => {
  generatePDF(values);
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

    &__navigation-container {
      margin-top: rem(60px);
      display: flex;
      align-items: center;
      gap: rem(15px);

      .navigation-button {
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
}

form {
  flex-grow: 1;
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

.form-submit-button {
  @include typi("form-large");
  text-transform: none;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: rem(30px);
  height: rem(46px);
  padding: 0 rem(15px);

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

.checkbox-group {
  display: grid;
  gap: rem(30px);
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

.form-error-button,
.form-is-submitted-button {
  margin-top: rem(20px);
}

.form-pdf-export-container {
  margin-bottom: rem(20px);
  display: flex;
  justify-content: flex-start;
}

.form-pdf-button {
  @include typi("form");
  font-size: rem(12px);
  text-transform: none;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: rem(8px);
  height: rem(30px);

  .wf-active & {
    font-family: $font-family-base;
  }

  &:focus-visible {
    outline: 2px solid $color-content;
    outline-offset: rem(1px);
  }

  .form-submit-button__icon-wrapper {
    border: none;
    width: auto;
    height: auto;
  }

  svg {
    width: rem(13px);
    height: rem(13px);
  }
}
</style>
