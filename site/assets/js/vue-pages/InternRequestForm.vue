<template>
  <div class="client-request-form">
    <div class="form-header">
      <p class="form-description">Intern request form</p>
    </div>

    <Form @submit="onSubmit">
      <Field name="email" type="email" :rules="validateEmail" />
      <TextInput
        name="name"
        type="text"
        label="Vorname"
        placeholder="Vorname"
      />
      <TextArea
        name="message"
        label="Ihre Anmerkungen"
        placeholder="Ihre Anmerkungen"
      />
      <ErrorMessage name="name" />
      <ErrorMessage name="email" />
      <button>Sign up</button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
import TextArea from "@/vue-components/forms/TextArea.vue";
import TextInput from "@/vue-components/forms/TextInput.vue";

const onSubmit = (values) => {
  console.log(values, null, 2);
};
const validateEmail = (value) => {
  // if the field is empty
  if (!value) {
    return "This field is required";
  }
  // if the field is not a valid email
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return "This field must be a valid email";
  }
  // All is good
  return true;
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

  .form-description {
    color: #666;
    font-size: 1.1rem;
  }
}
</style>
