<template>
  <div class="form-wrapper">
    <div class="form-wrapper__left-container">
      <span
        class="step-number c-headline c-headline--padded c-headline--primary"
        >{{
          hasError
            ? "Fehler"
            : isSubmitted || stepIndex === 0 || !values.request_type
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
              : stepIndex === 0
                ? "Um Ihre Anfrage direkt bearbeiten zu können, bitte wir Sie folgende Fragen zu beantworten."
                : steps[stepIndex - 1].question
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
          :disabled="!meta.valid"
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
            v-slot="{ componentField }"
            :name="field.id"
            :validate-on-blur="!isFieldDirty"
            :type="
              field.type === 'RADIO' || field.type === 'RADIO_IMAGE'
                ? 'radio'
                : null
            "
          >
            <FormItem>
              <FormLabel v-if="field.label" class="u-invisibled">{{
                field.label
              }}</FormLabel>
              <FormControl>
                <!-- RADIO -->
                <RadioGroup
                  v-if="field.type === 'RADIO'"
                  class="radio-group"
                  v-bind="componentField"
                >
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
                <!-- RADIO IMAGE -->
                <RadioGroup
                  v-if="field.type === 'RADIO_IMAGE'"
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
                <!-- SELECT -->
                <Select v-if="field.type === 'SELECT'" v-bind="componentField">
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
                <!--  Input -->
                <Input
                  v-if="field.type === 'INPUT'"
                  type="text"
                  :placeholder="field.placeholder"
                  v-bind="componentField"
                />
                <!--  Textarea -->
                <Textarea
                  v-if="field.type === 'TEXTAREA'"
                  :placeholder="field.placeholder"
                  v-bind="componentField"
                />
              </FormControl>
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

type STEP_ID =
  | "WHAT"
  | "HOUSE_TYPE"
  | "OBJECT"
  | "FLOOR_COVERING_TYPE"
  | "HOW"
  | "WHICH_SYSTEM"
  | "UNDERGROUND"
  | "YEAR_OF_CONSTRUCTION"
  | "HOW_MANY_METERS"
  | "WHERE"
  | "WHEN"
  | "CONTACT";

interface FieldValue {
  value: string;
  label: string;
  image?: string;
  imageAlt?: string;
  nextStep?: STEP_ID;
}

interface Field {
  id: string;
  type: "INPUT" | "TEXTAREA" | "SELECT" | "RADIO" | "RADIO_IMAGE";
  values?: FieldValue[];
  label?: string;
  placeholder?: string;
}

interface Step {
  id: STEP_ID;
  question: string;
  nextStep: STEP_ID | undefined;
  previousStep: STEP_ID | undefined;
  fields: Field[];
}

const stepIndex = ref(0);
const isSubmitted = ref(false);
const hasError = ref(false);
const errorMessage = ref("");

const steps: Step[] = [
  {
    id: "WHAT",
    question: "Um was geht es?",
    nextStep: "HOUSE_TYPE",
    previousStep: undefined,
    fields: [
      {
        id: "request_type",
        type: "RADIO_IMAGE",
        values: [
          {
            value: "bodenbelag",
            label: "Bodenbelag",
            image: "/images/form/bodenbelag.jpg",
            imageAlt: "Bodenbelag",
          },
          {
            value: "fussbodenheizung",
            label: "Fußbodenheizung",
            image: "/images/form/fussbodenheizung.jpg",
            imageAlt: "Fußbodenheizung",
          },
        ],
      },
    ],
  },
  {
    id: "HOUSE_TYPE",
    question: "Wo wollen Sie Ihren neuen Bodenbelag verlegen?",
    nextStep: "OBJECT",
    previousStep: "WHAT",
    fields: [
      {
        id: "house_type",
        type: "RADIO_IMAGE",
        values: [
          {
            value: "haus",
            label: "Haus",
            image: "/images/form/haus.jpg",
            imageAlt: "Haus",
          },
          {
            value: "wohnung",
            label: "Wohnung",
            image: "/images/form/wohnung.jpg",
            imageAlt: "Wohnung",
          },
        ],
      },
      {
        id: "stockwerk",
        type: "SELECT",
        placeholder: "Welches Stockwerk?",
        values: [
          {
            value: "eg",
            label: "EG",
          },
          {
            value: "1.og",
            label: "1.OG",
          },
          {
            value: "2.og",
            label: "2.OG",
          },
          {
            value: "3.og",
            label: "3.OG",
          },
          {
            value: "4.og",
            label: "4.OG",
          },
          {
            value: "5.og",
            label: "5.OG",
          },
        ],
      },
    ],
  },
  {
    id: "OBJECT",
    question: "Um was für ein Objekt handelt es sich?",
    nextStep: "FLOOR_COVERING_TYPE",
    previousStep: "HOUSE_TYPE",
    fields: [
      {
        id: "object_age",
        type: "RADIO_IMAGE",
        values: [
          {
            value: "neubau",
            label: "Neubau",
            image: "/images/form/neubau.jpg",
            imageAlt: "Neubau",
          },
          {
            value: "altbau",
            label: "Altbau",
            image: "/images/form/altbau.jpg",
            imageAlt: "Altbau",
          },
        ],
      },
      {
        id: "remove_old_covering",
        type: "RADIO",
        label: "Sollen wir die Entfernung des Altbelags für Sie übernehmen?",
        values: [
          {
            value: "ja",
            label: "Ja",
          },
          {
            value: "nein",
            label: "Nein",
          },
        ],
      },
      {
        id: "old_covering_type",
        type: "RADIO",
        label: "Welchen Altbelag haben Sie?",
        values: [
          {
            value: "parkett",
            label: "Parkett",
          },
          {
            value: "vinyl",
            label: "Vinyl",
          },
          {
            value: "fliesen",
            label: "Fliesen",
          },
          {
            value: "laminat",
            label: "Laminat",
          },
          {
            value: "teppich",
            label: "Teppich",
          },
        ],
      },
    ],
  },
  {
    id: "FLOOR_COVERING_TYPE",
    question: "Welchen Bodenbelag wünschen Sie sich?",
    nextStep: "HOW",
    previousStep: "OBJECT",
    fields: [
      {
        id: "floor_covering_type",
        type: "SELECT",
        placeholder: "Bitte Bodenbelag auswählen",
        values: [
          {
            value: "parkett",
            label: "Parkett",
          },
          {
            value: "vinyl",
            label: "Vinyl",
          },
          {
            value: "gussboden",
            label: "Gussboden",
          },
          {
            value: "teppich",
            label: "Teppich",
          },
        ],
      },
    ],
  },
  {
    id: "HOW",
    question: "Wie soll verlegt werden?",
    nextStep: "HOW_MANY_METERS",
    previousStep: "FLOOR_COVERING_TYPE",
    fields: [
      {
        id: "installation_method",
        type: "RADIO_IMAGE",
        values: [
          {
            value: "geklebt",
            label: "geklebt",
            image: "/images/form/geklebt.jpg",
            imageAlt: "geklebt",
          },
          {
            value: "schwimmend",
            label: "schwimmend",
            image: "/images/form/schwimmend.jpg",
            imageAlt: "schwimmend",
          },
        ],
      },
    ],
  },
  {
    id: "WHICH_SYSTEM",
    question: "Welches System soll eingebaut werden?",
    nextStep: "UNDERGROUND",
    previousStep: "OBJECT",
    fields: [
      {
        id: "heating_system",
        type: "RADIO_IMAGE",
        values: [
          {
            value: "heatflow",
            label: "HEATFlow-System",
            image: "/images/form/heatflow-system.jpg",
            imageAlt: "HEATFlow-System",
          },
          {
            value: "noppenplattensystem",
            label: "Noppenplattensystem",
            image: "/images/form/blanke-permatop.jpg",
            imageAlt: "Noppenplattensystem",
          },
          {
            value: "noppenplattensystem_bekotec",
            label: "Noppenplattensystem SCHLÜTER BEKOTEC",
            image: "/images/form/schlueter-bekotec.jpg",
            imageAlt: "Noppenplattensystem SCHLÜTER BEKOTEC",
          },
          {
            value: "klettsystem",
            label: "Klettsystem",
            image: "/images/form/tempus-flat-klett.jpg",
            imageAlt: "Klettsystem",
          },
          {
            value: "holzfaserplatte",
            label: "Holzfaserplatte",
            image: "/images/form/tempus-dry-nature.jpg",
            imageAlt: "Holzfaserplatte",
          },
        ],
      },
    ],
  },
  {
    id: "UNDERGROUND",
    question: "Welchen Untergrund haben Sie?",
    nextStep: "YEAR_OF_CONSTRUCTION",
    previousStep: "WHICH_SYSTEM",
    fields: [
      {
        id: "underground_type",
        type: "SELECT",
        placeholder: "Bitte Untergrund auswählen",
        values: [
          {
            value: "zementestrich",
            label: "Zementestrich",
          },
          {
            value: "anhydritestrich",
            label: "Anhydritestrich",
          },
          {
            value: "gussasphaltestrich",
            label: "Gussasphaltestrich",
          },
          {
            value: "beton",
            label: "Beton",
          },
          {
            value: "fermacell",
            label: "Fermacell",
          },
          {
            value: "osb_platten",
            label: "OSB-Platten",
          },
        ],
      },
    ],
  },
  {
    id: "YEAR_OF_CONSTRUCTION",
    question: "Welches Baujahr hat das Objekt?",
    nextStep: "HOW_MANY_METERS",
    previousStep: "UNDERGROUND",
    fields: [
      {
        id: "construction_year",
        type: "INPUT",
        placeholder: "Baujahr eingeben",
      },
    ],
  },
  {
    id: "HOW_MANY_METERS",
    question: "Wieviel m² benötigen Sie?",
    nextStep: "WHERE",
    previousStep: "HOW",
    fields: [
      {
        id: "square_meters",
        type: "INPUT",
        placeholder: "Bitte m² eingeben",
      },
    ],
  },
  {
    id: "WHERE",
    question: "Wo befindet sich Ihr Bauvorhaben?",
    nextStep: "WHEN",
    previousStep: "HOW_MANY_METERS",
    fields: [
      {
        id: "city",
        type: "INPUT",
        placeholder: "Ort",
      },
      {
        id: "postal_code",
        type: "INPUT",
        placeholder: "Postleitzahl",
      },
      {
        id: "street",
        type: "INPUT",
        placeholder: "Straße",
      },
    ],
  },
  {
    id: "WHEN",
    question: "Wann soll verlegt werden?",
    nextStep: "CONTACT",
    previousStep: "WHERE",
    fields: [
      {
        id: "timing_preference",
        type: "TEXTAREA",
        placeholder: "Tragen Sie Ihre Terminvorstellung ein",
      },
    ],
  },
  {
    id: "CONTACT",
    question: "Wie dürfen wir Sie kontaktieren?",
    nextStep: undefined,
    previousStep: "WHEN",
    fields: [
      {
        id: "first_name",
        type: "INPUT",
        placeholder: "Vorname",
      },
      {
        id: "last_name",
        type: "INPUT",
        placeholder: "Nachname",
      },
      {
        id: "email",
        type: "INPUT",
        placeholder: "E-Mail",
      },
      {
        id: "phone",
        type: "INPUT",
        placeholder: "Telefon",
      },
      {
        id: "comments",
        type: "TEXTAREA",
        placeholder: "Ihre Anmerkungen",
      },
    ],
  },
];

const initialValues = {
  request_type: undefined,
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
  square_meters: undefined,
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

const formSchema = [
  z.object({
    request_type: z.enum(["bodenbelag", "fussbodenheizung"], {
      required_error: "Bitte wählen Sie eine Option aus",
    }),
  }),
  z.object({
    house_type: z.enum(["haus", "wohnung"], {
      required_error: "Bitte wählen Sie eine Option aus",
    }),
    stockwerk: z.enum(["eg", "1.og", "2.og", "3.og", "4.og", "5.og"], {
      required_error: "Bitte wählen Sie ein Stockwerk aus",
    }),
  }),
  z
    .object({
      object_age: z.enum(["neubau", "altbau"], {
        required_error: "Bitte wählen Sie eine Option aus",
      }),
      remove_old_covering: z
        .enum(["ja", "nein"], {
          required_error: "Bitte wählen Sie eine Option aus",
        })
        .optional(),
      old_covering_type: z
        .enum(["parkett", "vinyl", "fliesen", "laminat", "teppich"], {
          required_error: "Bitte wählen Sie den Altbelag aus",
        })
        .optional(),
    })
    .refine(
      (data) => {
        // If altbau is selected, remove_old_covering is required
        if (data.object_age === "altbau") {
          return data.remove_old_covering !== undefined;
        }
        return true;
      },
      {
        message: "Bitte wählen Sie eine Option aus",
        path: ["remove_old_covering"],
      },
    )
    .refine(
      (data) => {
        // If altbau is selected and remove_old_covering is "ja", old_covering_type is required
        if (data.object_age === "altbau" && data.remove_old_covering === "ja") {
          return data.old_covering_type !== undefined;
        }
        return true;
      },
      {
        message: "Bitte wählen Sie den Altbelag aus",
        path: ["old_covering_type"],
      },
    ),
  z.object({
    floor_covering_type: z.enum(["parkett", "vinyl", "gussboden", "teppich"], {
      required_error: "Bitte wählen Sie einen Bodenbelag aus",
    }),
  }),
  z.object({
    heating_system: z.enum(
      [
        "heatflow",
        "noppenplattensystem",
        "noppenplattensystem_bekotec",
        "klettsystem",
        "holzfaserplatte",
      ],
      {
        required_error: "Bitte wählen Sie ein Heizsystem aus",
      },
    ),
  }),
  z.object({
    underground_type: z.enum(
      [
        "zementestrich",
        "anhydritestrich",
        "gussasphaltestrich",
        "beton",
        "fermacell",
        "osb_platten",
      ],
      {
        required_error: "Bitte wählen Sie einen Untergrund aus",
      },
    ),
  }),
  z.object({
    construction_year: z
      .string()
      .min(1, "Bitte geben Sie das Baujahr ein")
      .refine((val) => {
        const year = parseInt(val);
        return !isNaN(year) && year > 1800 && year <= new Date().getFullYear();
      }, "Bitte geben Sie ein gültiges Baujahr ein"),
  }),
  z.object({
    installation_method: z.enum(["geklebt", "schwimmend"], {
      required_error: "Bitte wählen Sie eine Verlegeart aus",
    }),
  }),
  z.object({
    square_meters: z
      .string()
      .min(1, "Bitte geben Sie die Quadratmeter an")
      .refine((val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num > 0;
      }, "Bitte geben Sie eine gültige Zahl ein"),
  }),
  z.object({
    city: z.string().min(1, "Bitte geben Sie den Ort ein"),
    postal_code: z
      .string()
      .min(1, "Bitte geben Sie die Postleitzahl ein")
      .refine((val) => {
        return /^\d{5}$/.test(val);
      }, "Bitte geben Sie eine gültige Postleitzahl ein"),
    street: z.string().min(1, "Bitte geben Sie die Straße ein"),
  }),
  z.object({
    timing_preference: z
      .string()
      .min(1, "Bitte geben Sie Ihre Terminvorstellung ein"),
  }),
  z.object({
    first_name: z.string().min(1, "Bitte geben Sie Ihren Vornamen ein"),
    last_name: z.string().min(1, "Bitte geben Sie Ihren Nachnamen ein"),
    email: z
      .string()
      .min(1, "Bitte geben Sie Ihre E-Mail-Adresse ein")
      .email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
    phone: z.string().min(1, "Bitte geben Sie Ihre Telefonnummer ein"),
    comments: z.string().optional(),
  }),
];

const currentStepForSchema = computed(() => {
  if (stepIndex.value === 0) return 0;

  const currentStep = steps[stepIndex.value - 1];

  // Map step IDs to schema indices
  const schemaMap = {
    WHAT: 0,
    HOUSE_TYPE: 1,
    OBJECT: 2,
    FLOOR_COVERING_TYPE: 3,
    WHICH_SYSTEM: 4,
    UNDERGROUND: 5,
    YEAR_OF_CONSTRUCTION: 6,
    HOW: 7,
    HOW_MANY_METERS: 8,
    WHERE: 9,
    WHEN: 10,
    CONTACT: 11,
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

  // Handle dynamic navigation based on request type
  if (
    currentStep.id === "FLOOR_COVERING_TYPE" ||
    currentStep.id === "WHICH_SYSTEM"
  ) {
    prevStepId = "OBJECT";
  }

  if (currentStep.id === "HOW_MANY_METERS") {
    // Determine previous step based on request type
    if (values.request_type === "bodenbelag") {
      prevStepId = "HOW";
    } else if (values.request_type === "fussbodenheizung") {
      prevStepId = "YEAR_OF_CONSTRUCTION";
    }
  }

  if (prevStepId) {
    stepIndex.value = steps.findIndex((step) => step.id === prevStepId) + 1;
  }
};

const nextStep = () => {
  if (stepIndex.value === steps.length) return;

  const currentStep = steps[stepIndex.value - 1];
  let nextStepId = currentStep.nextStep;

  // Handle dynamic navigation based on request type
  if (currentStep.id === "OBJECT") {
    if (values.request_type === "bodenbelag") {
      nextStepId = "FLOOR_COVERING_TYPE";
    } else if (values.request_type === "fussbodenheizung") {
      nextStepId = "WHICH_SYSTEM";
    }
  }

  // Handle dynamic navigation for HOW_MANY_METERS previousStep
  if (currentStep.id === "HOW_MANY_METERS") {
    // This step can be reached from either HOW or YEAR_OF_CONSTRUCTION
    // Navigation to next step remains the same (WHERE)
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
  if (currentStep.id === "FLOOR_COVERING_TYPE" || currentStep.id === "HOW") {
    if (values.request_type !== "bodenbelag") return [];
  }

  if (
    currentStep.id === "WHICH_SYSTEM" ||
    currentStep.id === "UNDERGROUND" ||
    currentStep.id === "YEAR_OF_CONSTRUCTION"
  ) {
    if (values.request_type !== "fussbodenheizung") return [];
  }

  return currentStep.fields.filter(shouldShowField);
});

// Calculate the correct step number and total for the current path
const currentPathSteps = computed(() => {
  if (!values.request_type) return [];

  const sharedSteps = [
    "WHAT",
    "HOUSE_TYPE",
    "OBJECT",
    "HOW_MANY_METERS",
    "WHERE",
    "WHEN",
    "CONTACT",
  ];

  if (values.request_type === "bodenbelag") {
    return [
      ...sharedSteps.slice(0, 3),
      "FLOOR_COVERING_TYPE",
      "HOW",
      ...sharedSteps.slice(3),
    ];
  } else if (values.request_type === "fussbodenheizung") {
    return [
      ...sharedSteps.slice(0, 3),
      "WHICH_SYSTEM",
      "UNDERGROUND",
      "YEAR_OF_CONSTRUCTION",
      ...sharedSteps.slice(3),
    ];
  }

  return sharedSteps;
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
