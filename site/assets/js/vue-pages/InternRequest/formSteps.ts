import { Intern_Form_Step } from "./types";

export const steps: Intern_Form_Step[] = [
  {
    id: "WHAT",
    question: "Um was geht es?",
    fields: [
      {
        id: "request_type_bodenbelag",
        type: "CHECKBOX_IMAGE",
        label: "Bodenbelag",
        image: "/images/form/bodenbelag.jpg",
        imageAlt: "Bodenbelag",
      },
      {
        id: "request_type_fussbodenheizung",
        type: "CHECKBOX_IMAGE",
        label: "Fußbodenheizung",
        image: "/images/form/fussbodenheizung.jpg",
        imageAlt: "Fußbodenheizung",
      },
      {
        id: "request_type_refurbish_parquet",
        type: "CHECKBOX_IMAGE",
        label: "Parkett aufbereiten",
        image: "/images/form/parkett-aufbereiten.jpg",
        imageAlt: "Parkett aufbereiten",
      },
    ],
  },
  {
    id: "HOUSE_TYPE",
    question: "Wo wollen Sie Ihren neuen Bodenbelag verlegen?",
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
        placeholder: "Welches Stockwerk? *",
        label: "Welches Stockwerk?",
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
        label: "Sollen wir die Entfernung des Altbelags für Sie übernehmen? *",
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
        label: "Welchen Altbelag haben Sie? *",
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
    fields: [
      {
        id: "floor_covering_type",
        type: "SELECT",
        placeholder: "Bitte Bodenbelag auswählen *",
        label: "Bitte Bodenbelag auswählen",
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
    id: "BODENBELAG_TYPE",
    question: "Welchen Bodenbelag wünschen Sie sich?",
    fields: [
      {
        id: "bodenbelag_type_1",
        type: "INPUT",
        placeholder: "Bodenbelag #1 *",
        label: "Bodenbelag #1",
      },
      {
        id: "bodenbelag_type_2",
        type: "INPUT",
        placeholder: "Bodenbelag #2",
        label: "Bodenbelag #2",
      },
      {
        id: "bodenbelag_type_3",
        type: "INPUT",
        placeholder: "Bodenbelag #3",
        label: "Bodenbelag #3",
      },
      {
        id: "bodenbelag_type_notes",
        type: "TEXTAREA",
        placeholder: "Anmerkungen",
        label: "Anmerkungen",
      },
    ],
  },
  {
    id: "ROOMS_BODENBELAG",
    question: "Bodenbelag: Um welche Räume geht es?",
    fields: [
      {
        id: "room1_bodenbelag",
        type: "INPUT",
        placeholder: "Raum #1 *",
        label: "Raum #1",
      },
      {
        id: "room2_bodenbelag",
        type: "INPUT",
        placeholder: "Raum #2",
        label: "Raum #2",
      },
      {
        id: "room3_bodenbelag",
        type: "INPUT",
        placeholder: "Raum #3",
        label: "Raum #3",
      },
      {
        id: "room4_bodenbelag",
        type: "INPUT",
        placeholder: "Raum #4",
        label: "Raum #4",
      },
      {
        id: "room5_bodenbelag",
        type: "INPUT",
        placeholder: "Raum #5",
        label: "Raum #5",
      },
    ],
  },
  {
    id: "SUBSTRATE_PREPARATION_BODENBELAG",
    question: "Bodenbelag: Soll der Untergrund vorbereitet werden?",
    fields: [
      {
        id: "substrate_preparation_bodenbelag",
        type: "RADIO",
        label: "Soll der Untergrund vorbereitet werden? *",
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
        id: "substrate_preparation_method_bodenbelag",
        type: "CHECKBOX",
        label: "Wie soll der Untergrund vorbereitet werden? *",
        values: [
          {
            value: "schleifen",
            label: "schleifen",
          },
          {
            value: "grundieren",
            label: "grundieren",
          },
          {
            value: "spachteln",
            label: "spachteln",
          },
        ],
      },
      {
        id: "substrate_preparation_comments_bodenbelag",
        type: "TEXTAREA",
        placeholder: "Anmerkungen",
        label: "Anmerkungen",
      },
    ],
  },
  {
    id: "HOW",
    question: "Bodenbelag: Wie soll verlegt werden?",
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
    id: "HOW_MANY_METERS_BODENBELAG",
    question: "Bodenbelag: Wieviel m² benötigen Sie?",
    fields: [
      {
        id: "square_meters_bodenbelag",
        type: "INPUT",
        placeholder: "Bitte m² für Bodenbelag eingeben *",
        label: "Bitte m² für Bodenbelag eingeben",
      },
    ],
  },
  {
    id: "BASEBOARDS",
    question: "Bodenbelag: Werden Sockelleisten benötigt?",
    fields: [
      {
        id: "baseboards_needed",
        type: "RADIO",
        label: "Werden Sockelleisten benötigt? *",
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
        id: "baseboard_type",
        type: "RADIO",
        label: "Welche Sockelleisten? *",
        values: [
          {
            value: "sockelleiste_cube_weiss_16x58",
            label: "Sockelleiste Cube weiß 16x58",
          },
          {
            value: "sockelleiste_cube_weiss_16x40",
            label: "Sockelleiste Cube weiß 16x40",
          },
          {
            value: "sockelleiste_eiche_furnier_16x58",
            label: "Sockelleiste Eiche Furnier 16x58",
          },
          {
            value: "sockelleiste_eiche_furnier_16x40",
            label: "Sockelleiste Eiche Furnier 16x40",
          },
        ],
      },
      {
        id: "baseboard_notes",
        type: "TEXTAREA",
        placeholder: "Anmerkungen",
        label: "Anmerkungen",
      },
    ],
  },
  {
    id: "ROOM_DOORS",
    question: "Bodenbelag: Werden Zimmertüren benötigt?",
    fields: [
      {
        id: "room_doors_needed",
        type: "RADIO",
        label: "Werden Zimmertüren benötigt? *",
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
        id: "room_doors_quantity",
        type: "INPUT",
        placeholder: "Anzahl *",
        label: "Anzahl",
      },
      {
        id: "room_doors_measurements",
        type: "TEXTAREA",
        placeholder: "Maße *",
        label: "Maße",
      },
      {
        id: "room_doors_execution",
        type: "TEXTAREA",
        placeholder: "Ausführung *",
        label: "Ausführung",
      },
    ],
  },
  {
    id: "WHICH_SYSTEM",
    question: "Fußbodenheizung: Welches System soll eingebaut werden?",
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
    question: "Fußbodenheizung: Welchen Untergrund haben Sie?",
    fields: [
      {
        id: "underground_type",
        type: "SELECT",
        placeholder: "Bitte Untergrund auswählen *",
        label: "Bitte Untergrund auswählen",
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
    fields: [
      {
        id: "construction_year",
        type: "INPUT",
        placeholder: "Baujahr eingeben *",
        label: "Baujahr eingeben",
      },
    ],
  },
  {
    id: "ROOMS_FUSSBODENHEIZUNG",
    question: "Fußbodenheizung: Um welche Räume geht es?",
    fields: [
      {
        id: "room1_fussbodenheizung",
        type: "INPUT",
        placeholder: "Raum #1 *",
        label: "Raum #1",
      },
      {
        id: "room2_fussbodenheizung",
        type: "INPUT",
        placeholder: "Raum #2",
        label: "Raum #2",
      },
      {
        id: "room3_fussbodenheizung",
        type: "INPUT",
        placeholder: "Raum #3",
        label: "Raum #3",
      },
      {
        id: "room4_fussbodenheizung",
        type: "INPUT",
        placeholder: "Raum #4",
        label: "Raum #4",
      },
      {
        id: "room5_fussbodenheizung",
        type: "INPUT",
        placeholder: "Raum #5",
        label: "Raum #5",
      },
    ],
  },
  {
    id: "SUBSTRATE_PREPARATION_FUSSBODENHEIZUNG",
    question: "Fußbodenheizung: Soll der Untergrund vorbereitet werden?",
    fields: [
      {
        id: "substrate_preparation_fussbodenheizung",
        type: "RADIO",
        label: "Soll der Untergrund vorbereitet werden? *",
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
        id: "substrate_preparation_method_fussbodenheizung",
        type: "CHECKBOX",
        label: "Wie soll der Untergrund vorbereitet werden? *",
        values: [
          {
            value: "schleifen",
            label: "schleifen",
          },
          {
            value: "grundieren",
            label: "grundieren",
          },
          {
            value: "spachteln",
            label: "spachteln",
          },
        ],
      },
      {
        id: "substrate_preparation_comments_fussbodenheizung",
        type: "TEXTAREA",
        placeholder: "Anmerkungen",
        label: "Anmerkungen",
      },
    ],
  },
  {
    id: "HOW_MANY_METERS_FUSSBODENHEIZUNG",
    question: "Fußbodenheizung: Wieviel m² benötigen Sie?",
    fields: [
      {
        id: "square_meters_fussbodenheizung",
        type: "INPUT",
        placeholder: "Bitte m² für Fußbodenheizung eingeben *",
        label: "Bitte m² für Fußbodenheizung eingeben",
      },
    ],
  },
  {
    id: "PARQUET_REFURBISH_TYPE",
    question: "Parkett aufbereiten: Welchen Parkettboden haben Sie?",
    fields: [
      {
        id: "parquet_refurbish_type",
        type: "SELECT",
        placeholder: "Bitte Holzart auswählen *",
        label: "Bitte Holzart auswählen",
        values: [
          {
            value: "ahorn",
            label: "Ahorn",
          },
          {
            value: "buche",
            label: "Buche",
          },
          {
            value: "eiche",
            label: "Eiche",
          },
        ],
      },
    ],
  },
  {
    id: "PARQUET_REFURBISH_HOW",
    question: "Wie soll Ihr Parkett aufbereitet werden?",
    fields: [
      {
        id: "parquet_refurbish_how",
        type: "RADIO_IMAGE",
        values: [
          {
            value: "schleifen",
            label: "schleifen",
            image: "/images/form/parkett-schleifen.jpg",
            imageAlt: "schleifen",
          },
          {
            value: "grundreinigen",
            label: "grundreinigen",
            image: "/images/form/parkett-grundreinigen.jpg",
            imageAlt: "grundreinigen",
          },
        ],
      },
    ],
  },
  {
    id: "PARQUET_REFURBISH_TREATMENT",
    question: "Parkett aufbereiten: Wie soll die Oberfläche behandelt werden?",
    fields: [
      {
        id: "parquet_refurbish_treatment",
        type: "RADIO_IMAGE",
        values: [
          {
            value: "ölen",
            label: "ölen",
            image: "/images/form/oelen.jpg",
            imageAlt: "ölen",
          },
          {
            value: "lackieren",
            label: "lackieren",
            image: "/images/form/lackieren.jpg",
            imageAlt: "lackieren",
          },
        ],
      },
    ],
  },
  {
    id: "HOW_MANY_METERS_PARQUET_REFURBISH",
    question: "Parkett aufbereiten: Wieviel m² benötigen Sie?",
    fields: [
      {
        id: "square_meters_parquet_refurbish",
        type: "INPUT",
        placeholder: "Bitte m² für Parkett aufbereiten eingeben *",
        label: "Bitte m² für Parkett aufbereiten eingeben",
      },
    ],
  },
  {
    id: "WHERE",
    question: "Wo befindet sich Ihr Bauvorhaben?",
    fields: [
      {
        id: "city",
        type: "INPUT",
        placeholder: "Ort *",
        label: "Ort",
      },
      {
        id: "postal_code",
        type: "INPUT",
        placeholder: "Postleitzahl *",
        label: "Postleitzahl",
      },
      {
        id: "street",
        type: "INPUT",
        placeholder: "Straße *",
        label: "Straße",
      },
    ],
  },
  {
    id: "WHEN",
    question: "Wann soll die Arbeit stattfinden?",
    fields: [
      {
        id: "timing_preference",
        type: "INPUT",
        placeholder: "Tragen Sie Ihre Terminvorstellung ein *",
        label: "Tragen Sie Ihre Terminvorstellung ein",
      },
    ],
  },
  {
    id: "CONTACT",
    question: "Wie dürfen wir Sie kontaktieren?",
    fields: [
      {
        id: "first_name",
        type: "INPUT",
        placeholder: "Vorname *",
        label: "Vorname",
      },
      {
        id: "last_name",
        type: "INPUT",
        placeholder: "Nachname *",
        label: "Nachname",
      },
      {
        id: "email",
        type: "INPUT",
        placeholder: "E-Mail *",
        label: "E-Mail",
      },
      {
        id: "client_city",
        type: "INPUT",
        placeholder: "Ort *",
        label: "Ort",
      },
      {
        id: "client_postal_code",
        type: "INPUT",
        placeholder: "Postleitzahl *",
        label: "Postleitzahl",
      },
      {
        id: "client_street",
        type: "INPUT",
        placeholder: "Straße *",
        label: "Straße",
      },
      {
        id: "phone",
        type: "INPUT",
        placeholder: "Telefon",
        label: "Telefon",
      },
      {
        id: "comments",
        type: "TEXTAREA",
        placeholder: "Ihre Anmerkungen",
        label: "Ihre Anmerkungen",
      },
    ],
  },
];
