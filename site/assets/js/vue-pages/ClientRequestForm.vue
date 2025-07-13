<template>
  <div class="client-request-form">
    <div class="form-header">
      <h2>{{ formTitle }}</h2>
      <p class="form-description">{{ formDescription }}</p>
    </div>

    <form @submit.prevent="submitForm" class="request-form">
      <!-- Personal Information Section -->
      <fieldset class="form-section">
        <legend>Personal Information</legend>

        <div class="form-row">
          <div class="form-group">
            <label for="firstName">First Name *</label>
            <input
              id="firstName"
              type="text"
              v-model="formData.firstName"
              @blur="validateField('firstName')"
              :class="{ error: errors.firstName }"
              class="form-control"
              placeholder="Enter your first name"
              required
            />
            <div v-if="errors.firstName" class="error-message">
              {{ errors.firstName }}
            </div>
          </div>

          <div class="form-group">
            <label for="lastName">Last Name *</label>
            <input
              id="lastName"
              type="text"
              v-model="formData.lastName"
              @blur="validateField('lastName')"
              :class="{ error: errors.lastName }"
              class="form-control"
              placeholder="Enter your last name"
              required
            />
            <div v-if="errors.lastName" class="error-message">
              {{ errors.lastName }}
            </div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="email">Email Address *</label>
            <input
              id="email"
              type="email"
              v-model="formData.email"
              @blur="validateField('email')"
              :class="{ error: errors.email }"
              class="form-control"
              placeholder="Enter your email address"
              required
            />
            <div v-if="errors.email" class="error-message">
              {{ errors.email }}
            </div>
          </div>

          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              v-model="formData.phone"
              @blur="validateField('phone')"
              :class="{ error: errors.phone }"
              class="form-control"
              placeholder="Enter your phone number"
            />
            <div v-if="errors.phone" class="error-message">
              {{ errors.phone }}
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="company">Company (Optional)</label>
          <input
            id="company"
            type="text"
            v-model="formData.company"
            class="form-control"
            placeholder="Enter your company name"
          />
        </div>
      </fieldset>

      <!-- Project Information Section -->
      <fieldset class="form-section">
        <legend>Project Information</legend>

        <div class="form-group">
          <label for="projectType">Project Type *</label>
          <select
            id="projectType"
            v-model="formData.projectType"
            @change="validateField('projectType')"
            :class="{ error: errors.projectType }"
            class="form-control"
            required
          >
            <option value="">Select project type</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="renovation">Renovation</option>
            <option value="new_construction">New Construction</option>
          </select>
          <div v-if="errors.projectType" class="error-message">
            {{ errors.projectType }}
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="timeline">Project Timeline *</label>
            <select
              id="timeline"
              v-model="formData.timeline"
              @change="validateField('timeline')"
              :class="{ error: errors.timeline }"
              class="form-control"
              required
            >
              <option value="">Select timeline</option>
              <option value="immediate">Immediate (Within 1 month)</option>
              <option value="soon">Soon (1-3 months)</option>
              <option value="planning">Planning (3-6 months)</option>
              <option value="future">Future (6+ months)</option>
            </select>
            <div v-if="errors.timeline" class="error-message">
              {{ errors.timeline }}
            </div>
          </div>

          <div class="form-group">
            <label for="budget">Budget Range</label>
            <select id="budget" v-model="formData.budget" class="form-control">
              <option value="">Select budget range</option>
              <option value="under_1000">Under €1,000</option>
              <option value="1000_5000">€1,000 - €5,000</option>
              <option value="5000_10000">€5,000 - €10,000</option>
              <option value="10000_25000">€10,000 - €25,000</option>
              <option value="over_25000">Over €25,000</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="projectDescription">Project Description *</label>
          <textarea
            id="projectDescription"
            v-model="formData.projectDescription"
            @blur="validateField('projectDescription')"
            :class="{ error: errors.projectDescription }"
            class="form-control"
            rows="4"
            placeholder="Please describe your project in detail..."
            required
          ></textarea>
          <div v-if="errors.projectDescription" class="error-message">
            {{ errors.projectDescription }}
          </div>
        </div>
      </fieldset>

      <!-- Contact Preferences -->
      <fieldset class="form-section">
        <legend>Contact Preferences</legend>

        <div class="form-group">
          <label>Preferred Contact Method *</label>
          <div class="radio-group">
            <label class="radio-option">
              <input
                type="radio"
                v-model="formData.contactMethod"
                value="email"
                @change="validateField('contactMethod')"
              />
              <span>Email</span>
            </label>
            <label class="radio-option">
              <input
                type="radio"
                v-model="formData.contactMethod"
                value="phone"
                @change="validateField('contactMethod')"
              />
              <span>Phone</span>
            </label>
            <label class="radio-option">
              <input
                type="radio"
                v-model="formData.contactMethod"
                value="both"
                @change="validateField('contactMethod')"
              />
              <span>Both</span>
            </label>
          </div>
          <div v-if="errors.contactMethod" class="error-message">
            {{ errors.contactMethod }}
          </div>
        </div>

        <div class="form-group">
          <label class="checkbox-option">
            <input type="checkbox" v-model="formData.newsletter" />
            <span>Subscribe to our newsletter for updates and tips</span>
          </label>
        </div>
      </fieldset>

      <!-- Form Actions -->
      <div class="form-actions">
        <button
          type="submit"
          :disabled="isSubmitting || !isFormValid"
          class="btn btn-primary"
        >
          <span v-if="isSubmitting">Sending Request...</span>
          <span v-else>Send Request</span>
        </button>

        <button type="button" @click="resetForm" class="btn btn-secondary">
          Reset Form
        </button>
      </div>

      <!-- Success/Error Messages -->
      <div v-if="submitMessage" class="submit-message" :class="submitStatus">
        {{ submitMessage }}
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import { z } from "zod";

// Define TypeScript interfaces
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  projectType:
    | "residential"
    | "commercial"
    | "renovation"
    | "new_construction"
    | "";
  timeline: "immediate" | "soon" | "planning" | "future" | "";
  budget:
    | "under_1000"
    | "1000_5000"
    | "5000_10000"
    | "10000_25000"
    | "over_25000"
    | "";
  projectDescription: string;
  contactMethod: "email" | "phone" | "both" | "";
  newsletter: boolean;
}

interface FormErrors {
  [key: string]: string;
}

type FieldName = keyof FormData;
type SubmitStatus = "success" | "error" | "";

// Zod schema for validation
const formSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^[+]?[\d\s\-()]*$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  company: z.string().optional(),
  projectType: z.enum(
    ["residential", "commercial", "renovation", "new_construction"],
    {
      errorMap: () => ({ message: "Project Type is required" }),
    },
  ),
  timeline: z.enum(["immediate", "soon", "planning", "future"], {
    errorMap: () => ({ message: "Project Timeline is required" }),
  }),
  budget: z
    .enum([
      "under_1000",
      "1000_5000",
      "5000_10000",
      "10000_25000",
      "over_25000",
    ])
    .optional()
    .or(z.literal("")),
  projectDescription: z.string().min(1, "Project Description is required"),
  contactMethod: z.enum(["email", "phone", "both"], {
    errorMap: () => ({ message: "Contact Method is required" }),
  }),
  newsletter: z.boolean(),
});

// Reactive data
const formTitle = ref("Client Request Form");
const formDescription = ref(
  "Tell us about your project and we'll get back to you with a personalized quote.",
);

const formData = reactive<FormData>({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  projectType: "",
  timeline: "",
  budget: "",
  projectDescription: "",
  contactMethod: "",
  newsletter: false,
});

const errors = reactive<FormErrors>({});
const isSubmitting = ref(false);
const submitMessage = ref("");
const submitStatus = ref<SubmitStatus>("");

// Computed properties
const isFormValid = computed((): boolean => {
  try {
    formSchema.parse(formData);
    return Object.keys(errors).length === 0;
  } catch {
    return false;
  }
});

// Field labels mapping
const fieldLabels: Record<FieldName, string> = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email Address",
  phone: "Phone Number",
  company: "Company",
  projectType: "Project Type",
  timeline: "Project Timeline",
  budget: "Budget Range",
  projectDescription: "Project Description",
  contactMethod: "Contact Method",
  newsletter: "Newsletter",
};

// Methods
const validateField = (fieldName: FieldName): boolean => {
  // Clear previous error
  delete errors[fieldName];

  try {
    // Get the field schema
    const fieldSchema = formSchema.shape[fieldName];
    if (fieldSchema) {
      fieldSchema.parse(formData[fieldName]);
    }
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      errors[fieldName] =
        error.errors[0]?.message || `${fieldLabels[fieldName]} is invalid`;
    }
    return false;
  }
};

const validateForm = (): boolean => {
  // Clear all errors
  Object.keys(errors).forEach((key) => delete errors[key]);

  try {
    formSchema.parse(formData);
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        const fieldName = err.path[0] as FieldName;
        if (fieldName) {
          errors[fieldName] = err.message;
        }
      });
    }
    return false;
  }
};

const submitForm = async (): Promise<void> => {
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;
  submitMessage.value = "";

  try {
    const response = await fetch("/submit-client-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      submitMessage.value =
        "Your request has been sent successfully! We'll get back to you soon.";
      submitStatus.value = "success";
      resetForm();
    } else {
      throw new Error("Failed to send request");
    }
  } catch (error) {
    console.error("Form submission error:", error);
    submitMessage.value =
      "Failed to send your request. Please try again or contact us directly.";
    submitStatus.value = "error";
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = (): void => {
  Object.assign(formData, {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    timeline: "",
    budget: "",
    projectDescription: "",
    contactMethod: "",
    newsletter: false,
  });

  Object.keys(errors).forEach((key) => delete errors[key]);
  submitMessage.value = "";
  submitStatus.value = "";
};
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

  h2 {
    color: #333;
    margin-bottom: 0.5rem;
  }

  .form-description {
    color: #666;
    font-size: 1.1rem;
  }
}

.form-section {
  border: none;
  padding: 0;
  margin-bottom: 2rem;

  legend {
    font-size: 1.25rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #007bff;
  }
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.form-group {
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
  }
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  &.error {
    border-color: #dc3545;
  }
}

.radio-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.radio-option,
.checkbox-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: normal;

  input {
    margin: 0;
  }
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
}

.btn {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.btn-primary {
  background-color: #007bff;
  color: white;

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
}

.btn-secondary {
  background-color: #6c757d;
  color: white;

  &:hover {
    background-color: #545b62;
  }
}

.submit-message {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.375rem;
  text-align: center;

  &.success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }

  &.error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }
}
</style>
