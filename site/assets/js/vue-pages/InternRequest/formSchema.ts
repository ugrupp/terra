import { z } from "zod";

export const SCHEMA_MAP = {
  WHAT: 0,
  HOUSE_TYPE: 1,
  OBJECT: 2,
  FLOOR_COVERING_TYPE: 3,
  BODENBELAG_TYPE: 4,
  ROOMS_BODENBELAG: 5,
  SUBSTRATE_PREPARATION_BODENBELAG: 6,
  HOW: 7,
  HOW_MANY_METERS_BODENBELAG: 8,
  BASEBOARDS: 9,
  ROOM_DOORS: 10,
  WHICH_SYSTEM: 11,
  UNDERGROUND: 12,
  YEAR_OF_CONSTRUCTION: 13,
  ROOMS_FUSSBODENHEIZUNG: 14,
  SUBSTRATE_PREPARATION_FUSSBODENHEIZUNG: 15,
  HOW_MANY_METERS_FUSSBODENHEIZUNG: 16,
  PARQUET_REFURBISH_TYPE: 17,
  PARQUET_REFURBISH_HOW: 18,
  PARQUET_REFURBISH_TREATMENT: 19,
  HOW_MANY_METERS_PARQUET_REFURBISH: 20,
  WHERE: 21,
  WHEN: 22,
  CONTACT: 23,
};

export const formSchema = [
  z
    .object({
      request_type_bodenbelag: z.boolean().optional(),
      request_type_fussbodenheizung: z.boolean().optional(),
      request_type_refurbish_parquet: z.boolean().optional(),
    })
    .refine(
      (data) => {
        // At least one checkbox must be selected
        return (
          data.request_type_bodenbelag ||
          data.request_type_fussbodenheizung ||
          data.request_type_refurbish_parquet
        );
      },
      {
        message: "Bitte wählen Sie mindestens eine Option aus",
        path: ["request_type_refurbish_parquet"], // This will show the error on the third and last checkbox
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
    bodenbelag_type_1: z
      .string({
        required_error: "Bitte geben Sie den ersten Bodenbelag ein",
      })
      .min(1, "Bitte geben Sie den ersten Bodenbelag ein"),
    bodenbelag_type_2: z.string().optional(),
    bodenbelag_type_3: z.string().optional(),
    bodenbelag_type_notes: z.string().optional(),
  }),
  z.object({
    room1_bodenbelag: z
      .string({
        required_error: "Bitte geben Sie Informationen zum ersten Raum ein",
      })
      .min(1, "Bitte geben Sie Informationen zum ersten Raum ein"),
    room2_bodenbelag: z.string().optional(),
    room3_bodenbelag: z.string().optional(),
    room4_bodenbelag: z.string().optional(),
    room5_bodenbelag: z.string().optional(),
  }),
  z
    .object({
      substrate_preparation_bodenbelag: z.enum(["ja", "nein"], {
        required_error: "Bitte wählen Sie eine Option aus",
      }),
      substrate_preparation_method_bodenbelag: z
        .enum(["schleifen", "grundieren", "spachteln"], {
          required_error: "Bitte wählen Sie eine Vorbereitungsmethode aus",
        })
        .optional(),
      substrate_preparation_comments_bodenbelag: z.string().optional(),
    })
    .refine(
      (data) => {
        // If "ja" is selected, substrate_preparation_method is required
        if (data.substrate_preparation_bodenbelag === "ja") {
          return data.substrate_preparation_method_bodenbelag !== undefined;
        }
        return true;
      },
      {
        message: "Bitte wählen Sie eine Vorbereitungsmethode aus",
        path: ["substrate_preparation_method_bodenbelag"],
      },
    ),
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
  z
    .object({
      baseboards_needed: z.enum(["ja", "nein"], {
        required_error: "Bitte wählen Sie eine Option aus",
      }),
      baseboard_type: z
        .enum(
          [
            "sockelleiste_cube_weiss_16x58",
            "sockelleiste_cube_weiss_16x40",
            "sockelleiste_eiche_furnier_16x58",
            "sockelleiste_eiche_furnier_16x40",
          ],
          {
            required_error: "Bitte wählen Sie eine Sockelleiste aus",
          },
        )
        .optional(),
      baseboard_notes: z.string().optional(),
    })
    .refine(
      (data) => {
        // If "ja" is selected, baseboard_type is required
        if (data.baseboards_needed === "ja") {
          return data.baseboard_type !== undefined;
        }
        return true;
      },
      {
        message: "Bitte wählen Sie eine Sockelleiste aus",
        path: ["baseboard_type"],
      },
    ),
  z
    .object({
      room_doors_needed: z.enum(["ja", "nein"], {
        required_error: "Bitte wählen Sie eine Option aus",
      }),
      room_doors_quantity: z.string().optional(),
      room_doors_measurements: z.string().optional(),
      room_doors_execution: z.string().optional(),
    })
    .refine(
      (data) => {
        // If "ja" is selected, quantity, measurements, and execution are required
        if (data.room_doors_needed === "ja") {
          return (
            data.room_doors_quantity !== undefined &&
            data.room_doors_measurements !== undefined &&
            data.room_doors_execution !== undefined
          );
        }
        return true;
      },
      {
        message: "Bitte geben Sie die Anzahl der Türen ein",
        path: ["room_doors_quantity"],
      },
    ),
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
    room1_fussbodenheizung: z
      .string({
        required_error: "Bitte geben Sie Informationen zum ersten Raum ein",
      })
      .min(1, "Bitte geben Sie Informationen zum ersten Raum ein"),
    room2_fussbodenheizung: z.string().optional(),
    room3_fussbodenheizung: z.string().optional(),
    room4_fussbodenheizung: z.string().optional(),
    room5_fussbodenheizung: z.string().optional(),
  }),
  z
    .object({
      substrate_preparation_fussbodenheizung: z.enum(["ja", "nein"], {
        required_error: "Bitte wählen Sie eine Option aus",
      }),
      substrate_preparation_method_fussbodenheizung: z
        .enum(["schleifen", "grundieren", "spachteln"], {
          required_error: "Bitte wählen Sie eine Vorbereitungsmethode aus",
        })
        .optional(),
      substrate_preparation_comments_fussbodenheizung: z.string().optional(),
    })
    .refine(
      (data) => {
        // If "ja" is selected, substrate_preparation_method is required
        if (data.substrate_preparation_fussbodenheizung === "ja") {
          return (
            data.substrate_preparation_method_fussbodenheizung !== undefined
          );
        }
        return true;
      },
      {
        message: "Bitte wählen Sie eine Vorbereitungsmethode aus",
        path: ["substrate_preparation_method_fussbodenheizung"],
      },
    ),
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
    parquet_refurbish_type: z.enum(["ahorn", "buche", "eiche"], {
      required_error: "Bitte wählen Sie einen Holztyp aus",
    }),
  }),
  z.object({
    parquet_refurbish_how: z.enum(["schleifen", "grundreinigen"], {
      required_error: "Bitte wählen Sie eine Behandlungsmethode aus",
    }),
  }),
  z.object({
    parquet_refurbish_treatment: z.enum(["ölen", "lackieren"], {
      required_error: "Bitte wählen Sie eine Behandlungsmethode aus",
    }),
  }),
  z.object({
    square_meters_parquet_refurbish: z
      .string({
        required_error:
          "Bitte geben Sie die Quadratmeter für Parquetsaufbereitung an",
      })
      .min(1, "Bitte geben Sie die Quadratmeter für Parquetsaufbereitung an")
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
