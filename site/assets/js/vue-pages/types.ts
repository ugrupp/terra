export interface FieldValue {
  value: string;
  label: string;
  image?: string;
  imageAlt?: string;
}

export interface Field {
  id: string;
  type:
    | "INPUT"
    | "TEXTAREA"
    | "SELECT"
    | "RADIO"
    | "RADIO_IMAGE"
    | "CHECKBOX"
    | "CHECKBOX_IMAGE"
    | "CHECKBOX_SINGLE";
  values?: FieldValue[];
  label?: string;
  placeholder?: string;
  image?: string;
  imageAlt?: string;
}
