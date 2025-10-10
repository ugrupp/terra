import { Field } from "../types";

export type CLIENT_FORM_STEP_ID =
  | "WHAT"
  | "HOUSE_TYPE"
  | "OBJECT"
  | "FLOOR_COVERING_TYPE"
  | "HOW"
  | "HOW_MANY_METERS_BODENBELAG"
  | "WHICH_SYSTEM"
  | "UNDERGROUND"
  | "YEAR_OF_CONSTRUCTION"
  | "HOW_MANY_METERS_FUSSBODENHEIZUNG"
  | "PARQUET_REFURBISH_TYPE"
  | "PARQUET_REFURBISH_HOW"
  | "PARQUET_REFURBISH_TREATMENT"
  | "HOW_MANY_METERS_PARQUET_REFURBISH"
  | "WHERE"
  | "WHEN"
  | "CONTACT";

export interface Client_Form_Step {
  id: CLIENT_FORM_STEP_ID;
  question: string;
  fields: Field[];
}

export const SCHEMA_BODENBELAG: CLIENT_FORM_STEP_ID[] = [
  "WHAT",
  "HOUSE_TYPE",
  "OBJECT",
  "FLOOR_COVERING_TYPE",
  "HOW",
  "HOW_MANY_METERS_BODENBELAG",
  "WHERE",
  "WHEN",
  "CONTACT",
];

export const SCHEMA_FUSSBODENHEIZUNG: CLIENT_FORM_STEP_ID[] = [
  "WHAT",
  "HOUSE_TYPE",
  "OBJECT",
  "WHICH_SYSTEM",
  "UNDERGROUND",
  "YEAR_OF_CONSTRUCTION",
  "HOW_MANY_METERS_FUSSBODENHEIZUNG",
  "WHERE",
  "WHEN",
  "CONTACT",
];

export const SCHEMA_REFURBISH_PARQUET: CLIENT_FORM_STEP_ID[] = [
  "WHAT",
  "HOUSE_TYPE",
  "OBJECT",
  "PARQUET_REFURBISH_TYPE",
  "PARQUET_REFURBISH_HOW",
  "PARQUET_REFURBISH_TREATMENT",
  "HOW_MANY_METERS_PARQUET_REFURBISH",
  "WHERE",
  "WHEN",
  "CONTACT",
];

export const SCHEMA_BODENBELAG_AND_FUSSBODENHEIZUNG: CLIENT_FORM_STEP_ID[] = [
  "WHAT",
  "HOUSE_TYPE",
  "OBJECT",
  "FLOOR_COVERING_TYPE",
  "HOW",
  "HOW_MANY_METERS_BODENBELAG",
  "WHICH_SYSTEM",
  "UNDERGROUND",
  "YEAR_OF_CONSTRUCTION",
  "HOW_MANY_METERS_FUSSBODENHEIZUNG",
  "WHERE",
  "WHEN",
  "CONTACT",
];

export const SCHEMA_BODENBELAG_AND_REFURBISH_PARQUET: CLIENT_FORM_STEP_ID[] = [
  "WHAT",
  "HOUSE_TYPE",
  "OBJECT",
  "FLOOR_COVERING_TYPE",
  "HOW",
  "HOW_MANY_METERS_BODENBELAG",
  "PARQUET_REFURBISH_TYPE",
  "PARQUET_REFURBISH_HOW",
  "PARQUET_REFURBISH_TREATMENT",
  "HOW_MANY_METERS_PARQUET_REFURBISH",
  "WHERE",
  "WHEN",
  "CONTACT",
];

export const SCHEMA_FUSSBODENHEIZUNG_AND_REFURBISH_PARQUET: CLIENT_FORM_STEP_ID[] =
  [
    "WHAT",
    "HOUSE_TYPE",
    "OBJECT",
    "WHICH_SYSTEM",
    "UNDERGROUND",
    "YEAR_OF_CONSTRUCTION",
    "HOW_MANY_METERS_FUSSBODENHEIZUNG",
    "PARQUET_REFURBISH_TYPE",
    "PARQUET_REFURBISH_HOW",
    "PARQUET_REFURBISH_TREATMENT",
    "HOW_MANY_METERS_PARQUET_REFURBISH",
    "WHERE",
    "WHEN",
    "CONTACT",
  ];

export const SCHEMA_BODENBELAG_AND_FUSSBODENHEIZUNG_AND_REFURBISH_PARQUET: CLIENT_FORM_STEP_ID[] =
  [
    "WHAT",
    "HOUSE_TYPE",
    "OBJECT",
    "FLOOR_COVERING_TYPE",
    "HOW",
    "HOW_MANY_METERS_BODENBELAG",
    "WHICH_SYSTEM",
    "UNDERGROUND",
    "YEAR_OF_CONSTRUCTION",
    "HOW_MANY_METERS_FUSSBODENHEIZUNG",
    "PARQUET_REFURBISH_TYPE",
    "PARQUET_REFURBISH_HOW",
    "PARQUET_REFURBISH_TREATMENT",
    "HOW_MANY_METERS_PARQUET_REFURBISH",
    "WHERE",
    "WHEN",
    "CONTACT",
  ];

export interface FormValues {
  request_type_bodenbelag?: boolean;
  request_type_fussbodenheizung?: boolean;
  request_type_refurbish_parquet?: boolean;
  house_type?: string;
  stockwerk?: string;
  object_age?: string;
  remove_old_covering?: string;
  old_covering_type?: string;
  floor_covering_type?: string;
  installation_method?: string;
  square_meters_bodenbelag?: string;
  heating_system?: string;
  underground_type?: string;
  construction_year?: string;
  square_meters_fussbodenheizung?: string;
  parquet_refurbish_type?: string;
  parquet_refurbish_how?: string;
  parquet_refurbish_treatment?: string;
  square_meters_parquet_refurbish?: string;
  city?: string;
  postal_code?: string;
  street?: string;
  timing_preference?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  client_city?: string;
  client_postal_code?: string;
  client_street?: string;
  phone?: string;
  comments?: string;
}
