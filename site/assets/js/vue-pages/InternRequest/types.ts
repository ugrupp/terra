import { Field } from "../types";

export type INTERN_FORM_STEP_ID =
  | "WHAT"
  | "HOUSE_TYPE"
  | "OBJECT"
  | "FLOOR_COVERING_TYPE"
  | "BODENBELAG_TYPE"
  | "ROOMS_BODENBELAG"
  | "SUBSTRATE_PREPARATION_BODENBELAG"
  | "HOW"
  | "HOW_MANY_METERS_BODENBELAG"
  | "BASEBOARDS"
  | "ROOM_DOORS"
  | "WHICH_SYSTEM"
  | "UNDERGROUND"
  | "YEAR_OF_CONSTRUCTION"
  | "ROOMS_FUSSBODENHEIZUNG"
  | "SUBSTRATE_PREPARATION_FUSSBODENHEIZUNG"
  | "HOW_MANY_METERS_FUSSBODENHEIZUNG"
  | "PARQUET_REFURBISH_TYPE"
  | "PARQUET_REFURBISH_HOW"
  | "PARQUET_REFURBISH_TREATMENT"
  | "HOW_MANY_METERS_PARQUET_REFURBISH"
  | "WHERE"
  | "WHEN"
  | "CONTACT";

export interface Intern_Form_Step {
  id: INTERN_FORM_STEP_ID;
  question: string;
  fields: Field[];
}

export const SCHEMA_BODENBELAG: INTERN_FORM_STEP_ID[] = [
  "CONTACT",
  "WHAT",
  "HOUSE_TYPE",
  "OBJECT",
  "FLOOR_COVERING_TYPE",
  "BODENBELAG_TYPE",
  "ROOMS_BODENBELAG",
  "SUBSTRATE_PREPARATION_BODENBELAG",
  "HOW",
  "HOW_MANY_METERS_BODENBELAG",
  "BASEBOARDS",
  "ROOM_DOORS",
  "WHERE",
  "WHEN",
];

export const SCHEMA_FUSSBODENHEIZUNG: INTERN_FORM_STEP_ID[] = [
  "CONTACT",
  "WHAT",
  "HOUSE_TYPE",
  "OBJECT",
  "WHICH_SYSTEM",
  "UNDERGROUND",
  "YEAR_OF_CONSTRUCTION",
  "ROOMS_FUSSBODENHEIZUNG",
  "SUBSTRATE_PREPARATION_FUSSBODENHEIZUNG",
  "HOW_MANY_METERS_FUSSBODENHEIZUNG",
  "WHERE",
  "WHEN",
];

export const SCHEMA_REFURBISH_PARQUET: INTERN_FORM_STEP_ID[] = [
  "CONTACT",
  "WHAT",
  "HOUSE_TYPE",
  "OBJECT",
  "PARQUET_REFURBISH_TYPE",
  "PARQUET_REFURBISH_HOW",
  "PARQUET_REFURBISH_TREATMENT",
  "HOW_MANY_METERS_PARQUET_REFURBISH",
  "WHERE",
  "WHEN",
];

export const SCHEMA_BODENBELAG_AND_FUSSBODENHEIZUNG: INTERN_FORM_STEP_ID[] = [
  "CONTACT",
  "WHAT",
  "HOUSE_TYPE",
  "OBJECT",
  "FLOOR_COVERING_TYPE",
  "BODENBELAG_TYPE",
  "ROOMS_BODENBELAG",
  "SUBSTRATE_PREPARATION_BODENBELAG",
  "HOW",
  "HOW_MANY_METERS_BODENBELAG",
  "BASEBOARDS",
  "ROOM_DOORS",
  "WHICH_SYSTEM",
  "UNDERGROUND",
  "YEAR_OF_CONSTRUCTION",
  "ROOMS_FUSSBODENHEIZUNG",
  "SUBSTRATE_PREPARATION_FUSSBODENHEIZUNG",
  "HOW_MANY_METERS_FUSSBODENHEIZUNG",
  "WHERE",
  "WHEN",
];

export const SCHEMA_BODENBELAG_AND_REFURBISH_PARQUET: INTERN_FORM_STEP_ID[] = [
  "CONTACT",
  "WHAT",
  "HOUSE_TYPE",
  "OBJECT",
  "FLOOR_COVERING_TYPE",
  "BODENBELAG_TYPE",
  "ROOMS_BODENBELAG",
  "SUBSTRATE_PREPARATION_BODENBELAG",
  "HOW",
  "HOW_MANY_METERS_BODENBELAG",
  "BASEBOARDS",
  "ROOM_DOORS",
  "PARQUET_REFURBISH_TYPE",
  "PARQUET_REFURBISH_HOW",
  "PARQUET_REFURBISH_TREATMENT",
  "HOW_MANY_METERS_PARQUET_REFURBISH",
  "WHERE",
  "WHEN",
];

export const SCHEMA_FUSSBODENHEIZUNG_AND_REFURBISH_PARQUET: INTERN_FORM_STEP_ID[] =
  [
    "CONTACT",
    "WHAT",
    "HOUSE_TYPE",
    "OBJECT",
    "WHICH_SYSTEM",
    "UNDERGROUND",
    "YEAR_OF_CONSTRUCTION",
    "ROOMS_FUSSBODENHEIZUNG",
    "SUBSTRATE_PREPARATION_FUSSBODENHEIZUNG",
    "HOW_MANY_METERS_FUSSBODENHEIZUNG",
    "PARQUET_REFURBISH_TYPE",
    "PARQUET_REFURBISH_HOW",
    "PARQUET_REFURBISH_TREATMENT",
    "HOW_MANY_METERS_PARQUET_REFURBISH",
    "WHERE",
    "WHEN",
  ];

export const SCHEMA_BODENBELAG_AND_FUSSBODENHEIZUNG_AND_REFURBISH_PARQUET: INTERN_FORM_STEP_ID[] =
  [
    "CONTACT",
    "WHAT",
    "HOUSE_TYPE",
    "OBJECT",
    "FLOOR_COVERING_TYPE",
    "BODENBELAG_TYPE",
    "ROOMS_BODENBELAG",
    "SUBSTRATE_PREPARATION_BODENBELAG",
    "HOW",
    "HOW_MANY_METERS_BODENBELAG",
    "BASEBOARDS",
    "ROOM_DOORS",
    "WHICH_SYSTEM",
    "UNDERGROUND",
    "YEAR_OF_CONSTRUCTION",
    "ROOMS_FUSSBODENHEIZUNG",
    "SUBSTRATE_PREPARATION_FUSSBODENHEIZUNG",
    "HOW_MANY_METERS_FUSSBODENHEIZUNG",
    "PARQUET_REFURBISH_TYPE",
    "PARQUET_REFURBISH_HOW",
    "PARQUET_REFURBISH_TREATMENT",
    "HOW_MANY_METERS_PARQUET_REFURBISH",
    "WHERE",
    "WHEN",
  ];

export interface FormValues {
  request_type_bodenbelag?: boolean;
  request_type_fussbodenheizung?: boolean;
  request_type_refurbish_parquet?: boolean;
  house_type?: string;
  stockwerk?: string[];
  object_age?: string;
  remove_old_covering?: string;
  old_covering_type?: string[];
  floor_covering_type?: string;
  bodenbelag_type_1?: string;
  bodenbelag_type_2?: string;
  bodenbelag_type_3?: string;
  bodenbelag_type_notes?: string;
  room1_bodenbelag?: string;
  room2_bodenbelag?: string;
  room3_bodenbelag?: string;
  room4_bodenbelag?: string;
  room5_bodenbelag?: string;
  substrate_preparation_bodenbelag?: string;
  substrate_preparation_method_bodenbelag?: string[];
  substrate_preparation_comments_bodenbelag?: string;
  installation_method?: string;
  square_meters_bodenbelag?: string;
  baseboards_needed?: string;
  baseboard_type?: string;
  baseboard_notes?: string;
  room_doors_needed?: string;
  room_doors_quantity?: string;
  room_doors_measurements?: string;
  room_doors_execution?: string;
  heating_system?: string;
  underground_type?: string;
  construction_year?: string;
  room1_fussbodenheizung?: string;
  room2_fussbodenheizung?: string;
  room3_fussbodenheizung?: string;
  room4_fussbodenheizung?: string;
  room5_fussbodenheizung?: string;
  substrate_preparation_fussbodenheizung?: string;
  substrate_preparation_method_fussbodenheizung?: string[];
  substrate_preparation_comments_fussbodenheizung?: string;
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
  referral_source?: string;
}
