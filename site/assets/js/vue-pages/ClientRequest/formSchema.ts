import { z } from "zod";

export const SCHEMA_MAP = {
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

export const formSchema = [
  z
    .object({
      request_type_bodenbelag: z.boolean().optional(),
      request_type_fussbodenheizung: z.boolean().optional(),
    })
    .refine(
      (data) => {
        // At least one checkbox must be selected
        return (
          data.request_type_bodenbelag || data.request_type_fussbodenheizung
        );
      },
      {
        message: "Bitte wählen Sie mindestens eine Option aus",
        path: ["request_type_fussbodenheizung"], // This will show the error on the second checkbox
      },
    ),
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
    installation_method: z.enum(["geklebt", "schwimmend"], {
      required_error: "Bitte wählen Sie eine Verlegeart aus",
    }),
  }),
  z.object({
    square_meters_bodenbelag: z
      .string({
        required_error: "Bitte geben Sie die Quadratmeter für Bodenbelag an",
      })
      .min(1, "Bitte geben Sie die Quadratmeter für Bodenbelag an")
      .refine((val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num > 0;
      }, "Bitte geben Sie eine gültige Zahl ein"),
  }),
  z.object({
    heating_system: z.enum(
      [
        "heatflow",
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
    square_meters_fussbodenheizung: z
      .string({
        required_error:
          "Bitte geben Sie die Quadratmeter für Fußbodenheizung an",
      })
      .min(1, "Bitte geben Sie die Quadratmeter für Fußbodenheizung an")
      .refine((val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num > 0;
      }, "Bitte geben Sie eine gültige Zahl ein"),
  }),
  z.object({
    city: z
      .string({
        required_error: "Bitte geben Sie den Ort ein",
      })
      .min(1, "Bitte geben Sie den Ort ein"),
    postal_code: z
      .string({
        required_error: "Bitte geben Sie die Postleitzahl ein",
      })
      .min(1, "Bitte geben Sie die Postleitzahl ein")
      .refine((val) => {
        return /^\d{5}$/.test(val);
      }, "Bitte geben Sie eine gültige Postleitzahl ein"),
    street: z
      .string({
        required_error: "Bitte geben Sie die Straße ein",
      })
      .min(1, "Bitte geben Sie die Straße ein"),
  }),
  z.object({
    timing_preference: z
      .string({
        required_error: "Bitte geben Sie Ihre Terminvorstellung ein",
      })
      .min(1, "Bitte geben Sie Ihre Terminvorstellung ein"),
  }),
  z.object({
    first_name: z
      .string({
        required_error: "Bitte geben Sie Ihren Vornamen ein",
      })
      .min(1, "Bitte geben Sie Ihren Vornamen ein"),
    last_name: z
      .string({
        required_error: "Bitte geben Sie Ihren Nachnamen ein",
      })
      .min(1, "Bitte geben Sie Ihren Nachnamen ein"),
    email: z
      .string({
        required_error: "Bitte geben Sie Ihre E-Mail-Adresse ein",
      })
      .min(1, "Bitte geben Sie Ihre E-Mail-Adresse ein")
      .email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
    phone: z.string().optional(),
    comments: z.string().optional(),
  }),
];
