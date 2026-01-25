import { jsPDF } from "jspdf";
import type { FormValues } from "./types";

// Define field labels for better PDF readability
const FIELD_LABELS: Record<string, string> = {
  // Request types
  request_type_bodenbelag: "Bodenbelag",
  request_type_fussbodenheizung: "Fußbodenheizung",
  request_type_refurbish_parquet: "Parkett aufbereiten",

  // House and object details
  house_type: "Haustyp",
  stockwerk: "Stockwerk",
  object_age: "Objektalter",
  remove_old_covering: "Alten Belag entfernen",
  old_covering_type: "Art des alten Belags",

  // Flooring details
  floor_covering_type: "Art des Bodenbelags",
  use_easylift_primer: "Easylift Primer als Grundierung",
  bodenbelag_type_1: "Bodenbelag Typ 1",
  bodenbelag_type_2: "Bodenbelag Typ 2",
  bodenbelag_type_3: "Bodenbelag Typ 3",
  bodenbelag_type_notes: "Anmerkungen Bodenbelag",

  // Rooms for flooring
  room1_bodenbelag: "Raum 1 (Bodenbelag)",
  room2_bodenbelag: "Raum 2 (Bodenbelag)",
  room3_bodenbelag: "Raum 3 (Bodenbelag)",
  room4_bodenbelag: "Raum 4 (Bodenbelag)",
  room5_bodenbelag: "Raum 5 (Bodenbelag)",

  // Substrate preparation
  substrate_preparation_bodenbelag: "Untergrundvorbereitung Bodenbelag",
  substrate_preparation_method_bodenbelag: "Methode Untergrundvorbereitung",
  substrate_preparation_comments_bodenbelag:
    "Kommentare Untergrundvorbereitung",

  // Installation
  installation_method: "Verlegeart",
  square_meters_bodenbelag: "Quadratmeter Bodenbelag",

  // Baseboards
  baseboards_needed: "Sockelleisten erforderlich",
  baseboard_type: "Art der Sockelleisten",
  baseboard_notes: "Anmerkungen Sockelleisten",

  // Room doors
  room_doors_needed: "Zimmertüren erforderlich",
  room_doors_quantity: "Anzahl Zimmertüren",
  room_doors_measurements: "Maße Zimmertüren",
  room_doors_execution: "Ausführung Zimmertüren",

  // Heating system
  heating_system: "Heizsystem",
  underground_type: "Untergrundtyp",
  construction_year: "Baujahr",

  // Rooms for heating
  room1_fussbodenheizung: "Raum 1 (Fußbodenheizung)",
  room2_fussbodenheizung: "Raum 2 (Fußbodenheizung)",
  room3_fussbodenheizung: "Raum 3 (Fußbodenheizung)",
  room4_fussbodenheizung: "Raum 4 (Fußbodenheizung)",
  room5_fussbodenheizung: "Raum 5 (Fußbodenheizung)",

  // Substrate preparation for heating
  substrate_preparation_fussbodenheizung:
    "Untergrundvorbereitung Fußbodenheizung",
  substrate_preparation_method_fussbodenheizung:
    "Methode Untergrundvorbereitung",
  substrate_preparation_comments_fussbodenheizung:
    "Kommentare Untergrundvorbereitung",
  square_meters_fussbodenheizung: "Quadratmeter Fußbodenheizung",

  // Parquet refurbishment
  parquet_refurbish_type: "Art der Parkettaufbereitung",
  parquet_refurbish_how: "Wie aufbereiten",
  parquet_refurbish_treatment: "Behandlung",
  square_meters_parquet_refurbish: "Quadratmeter Parkettaufbereitung",

  // Location and timing
  city: "Stadt",
  postal_code: "Postleitzahl",
  street: "Straße",
  timing_preference: "Terminwunsch",

  // Contact details
  first_name: "Vorname",
  last_name: "Nachname",
  email: "E-Mail",
  client_city: "Stadt",
  client_street: "Straße",
  client_postal_code: "Postleitzahl",
  phone: "Telefon",
  comments: "Kommentare",
  referral_source: "Wie sind Sie auf uns aufmerksam geworden?",
};

// Floor order for sorting (logical sequence)
const FLOOR_ORDER = ["eg", "1.og", "2.og", "3.og", "4.og", "5.og"];

// Format stockwerk values: sort logically, uppercase, and return with appropriate label
function formatStockwerk(
  stockwerk: string[] | undefined,
): { label: string; value: string } | null {
  if (!stockwerk || stockwerk.length === 0) return null;

  // Sort in logical order
  const sorted = [...stockwerk].sort(
    (a, b) => FLOOR_ORDER.indexOf(a) - FLOOR_ORDER.indexOf(b),
  );

  // Convert to uppercase
  const uppercase = sorted.map((s) => s.toUpperCase());

  return {
    label: stockwerk.length === 1 ? "Stockwerk" : "Stockwerke",
    value: uppercase.join(", "),
  };
}

// Helper function to build the PDF document
async function buildPDFDocument(formValues: FormValues) {
  const doc = new jsPDF();

  // Brand color
  const primaryColor = "#00a65c";
  const darkGray = "#473d38";

  // Add very small green header background
  doc.setFillColor(primaryColor);
  doc.rect(0, 0, 210, 5, "F");

  // Add logo below the green header with more spacing
  try {
    const logoImg = new Image();
    logoImg.src = "/signatur/logo.png";

    await new Promise((resolve, reject) => {
      logoImg.onload = () => resolve(true);
      logoImg.onerror = () => reject(new Error("Failed to load logo"));
      // Set timeout in case image doesn't load
      setTimeout(() => reject(new Error("Logo load timeout")), 3000);
    });

    doc.addImage(logoImg, "PNG", 20, 15, 40, 20);
  } catch (error) {
    // Fallback to text if image fails to load
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(primaryColor);
    doc.text("TERRA", 20, 25);
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("Bodenbeläge", 20, 33);
  }

  // Document title
  doc.setTextColor(darkGray);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Interne Anfrage", 20, 47);

  // Date and time
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  const now = new Date();
  const currentDate = now.toLocaleDateString("de-DE");
  const currentTime = now.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
  doc.text(`Erstellt am: ${currentDate} um ${currentTime} Uhr`, 20, 55);

  let yPosition = 69;
  doc.setFontSize(10);

  // Helper function to add a section header
  const addSectionHeader = (title: string) => {
    if (yPosition > 260) {
      doc.addPage();
      yPosition = 20;
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(primaryColor);
    doc.text(title, 20, yPosition);
    yPosition += 2;
    // Add a subtle line under the section header
    doc.setDrawColor(primaryColor);
    doc.setLineWidth(0.5);
    doc.line(20, yPosition, 190, yPosition);
    yPosition += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(darkGray);
  };

  // Helper function to add a field
  const addField = (key: string, value: any) => {
    if (!value) return;
    if (typeof value === "string" && !value.trim()) return;

    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
    }

    const label = FIELD_LABELS[key] || key;
    let displayValue = "";

    if (typeof value === "boolean") {
      displayValue = value ? "Ja" : "Nein";
    } else if (Array.isArray(value)) {
      displayValue = value.join(", ");
    } else {
      displayValue = String(value);
    }

    // Split long text into multiple lines
    const maxWidth = 170;
    const lines = doc.splitTextToSize(`${label}: ${displayValue}`, maxWidth);

    for (const line of lines) {
      doc.text(line, 20, yPosition);
      yPosition += 5;
    }
    yPosition += 2;
  };

  // Helper function to add a field with custom label
  const addFieldWithLabel = (label: string, value: string) => {
    if (!value) return;

    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
    }

    const maxWidth = 170;
    const lines = doc.splitTextToSize(`${label}: ${value}`, maxWidth);

    for (const line of lines) {
      doc.text(line, 20, yPosition);
      yPosition += 5;
    }
    yPosition += 2;
  };

  // Contact Information (at the top for better overview)
  if (
    formValues.first_name?.trim() ||
    formValues.last_name?.trim() ||
    formValues.email?.trim() ||
    formValues.phone?.trim() ||
    formValues.client_street?.trim() ||
    formValues.client_postal_code?.trim() ||
    formValues.client_city?.trim() ||
    formValues.referral_source?.trim()
  ) {
    addSectionHeader("Kontaktdaten");
    addField("first_name", formValues.first_name);
    addField("last_name", formValues.last_name);
    addField("email", formValues.email);
    addField("client_street", formValues.client_street);
    addField("client_postal_code", formValues.client_postal_code);
    addField("client_city", formValues.client_city);
    addField("phone", formValues.phone);
    addField("referral_source", formValues.referral_source);
    yPosition += 5;
  }

  // Location and Timing (at the top for better overview)
  if (
    formValues.city?.trim() ||
    formValues.postal_code?.trim() ||
    formValues.street?.trim() ||
    formValues.timing_preference?.trim()
  ) {
    addSectionHeader("Bauvorhaben und Terminwunsch");
    addField("street", formValues.street);
    addField("postal_code", formValues.postal_code);
    addField("city", formValues.city);
    addField("timing_preference", formValues.timing_preference);
    yPosition += 5;
  }

  // Request Types Section
  if (
    formValues.request_type_bodenbelag ||
    formValues.request_type_fussbodenheizung ||
    formValues.request_type_refurbish_parquet
  ) {
    addSectionHeader("Art der Anfrage");
    if (formValues.request_type_bodenbelag)
      addField("request_type_bodenbelag", true);
    if (formValues.request_type_fussbodenheizung)
      addField("request_type_fussbodenheizung", true);
    if (formValues.request_type_refurbish_parquet)
      addField("request_type_refurbish_parquet", true);
    yPosition += 5;
  }

  // House and Object Details
  if (
    formValues.house_type?.trim() ||
    (formValues.stockwerk && formValues.stockwerk.length > 0) ||
    formValues.object_age?.trim()
  ) {
    addSectionHeader("Objektdetails");
    addField("house_type", formValues.house_type);
    // Custom formatting for stockwerk (sorted, uppercase, singular/plural)
    const stockwerkFormatted = formatStockwerk(formValues.stockwerk);
    if (stockwerkFormatted) {
      addFieldWithLabel(stockwerkFormatted.label, stockwerkFormatted.value);
    }
    addField("object_age", formValues.object_age);
    addField("remove_old_covering", formValues.remove_old_covering);
    addField("old_covering_type", formValues.old_covering_type);
    yPosition += 5;
  }

  // Bodenbelag Section
  if (formValues.request_type_bodenbelag) {
    addSectionHeader("Bodenbelag");
    addField("installation_method", formValues.installation_method);
    addField("square_meters_bodenbelag", formValues.square_meters_bodenbelag);

    addField("floor_covering_type", formValues.floor_covering_type);
    // Show Easylift Primer only when Vinyl is selected, always as Ja/Nein
    if (formValues.floor_covering_type === "vinyl") {
      addFieldWithLabel(
        FIELD_LABELS["use_easylift_primer"],
        formValues.use_easylift_primer ? "Ja" : "Nein",
      );
    }
    addField("bodenbelag_type_1", formValues.bodenbelag_type_1);
    addField("bodenbelag_type_2", formValues.bodenbelag_type_2);
    addField("bodenbelag_type_3", formValues.bodenbelag_type_3);
    addField("bodenbelag_type_notes", formValues.bodenbelag_type_notes);

    // Rooms
    addField("room1_bodenbelag", formValues.room1_bodenbelag);
    addField("room2_bodenbelag", formValues.room2_bodenbelag);
    addField("room3_bodenbelag", formValues.room3_bodenbelag);
    addField("room4_bodenbelag", formValues.room4_bodenbelag);
    addField("room5_bodenbelag", formValues.room5_bodenbelag);

    yPosition += 5;

    // Substrate preparation
    if (formValues.substrate_preparation_bodenbelag?.trim()) {
      addSectionHeader("Untergrundvorbereitung Bodenbelag");
      addField(
        "substrate_preparation_bodenbelag",
        formValues.substrate_preparation_bodenbelag,
      );

      // Only show method and comments if substrate preparation is "ja"
      if (formValues.substrate_preparation_bodenbelag?.trim() === "ja") {
        addField(
          "substrate_preparation_method_bodenbelag",
          formValues.substrate_preparation_method_bodenbelag,
        );
        addField(
          "substrate_preparation_comments_bodenbelag",
          formValues.substrate_preparation_comments_bodenbelag,
        );
      }

      yPosition += 5;
    }

    // Baseboards
    if (formValues.baseboards_needed?.trim()) {
      addSectionHeader("Sockelleisten Bodenbelag");
      addField("baseboards_needed", formValues.baseboards_needed);
      // Only show baseboard details if baseboards are needed
      if (formValues.baseboards_needed?.trim() === "ja") {
        addField("baseboard_type", formValues.baseboard_type);
        addField("baseboard_notes", formValues.baseboard_notes);
      }

      yPosition += 5;
    }

    // Room doors
    if (formValues.room_doors_needed?.trim()) {
      addSectionHeader("Zimmertüren Bodenbelag");
      addField("room_doors_needed", formValues.room_doors_needed);
      // Only show room door details if room doors are needed
      if (formValues.room_doors_needed?.trim() === "ja") {
        addField("room_doors_quantity", formValues.room_doors_quantity);
        addField("room_doors_measurements", formValues.room_doors_measurements);
        addField("room_doors_execution", formValues.room_doors_execution);
      }

      yPosition += 5;
    }
  }

  // Fußbodenheizung Section
  if (formValues.request_type_fussbodenheizung) {
    addSectionHeader("Fußbodenheizung");
    addField("heating_system", formValues.heating_system);
    addField("underground_type", formValues.underground_type);
    addField(
      "square_meters_fussbodenheizung",
      formValues.square_meters_fussbodenheizung,
    );
    addField("construction_year", formValues.construction_year);

    // Rooms
    addField("room1_fussbodenheizung", formValues.room1_fussbodenheizung);
    addField("room2_fussbodenheizung", formValues.room2_fussbodenheizung);
    addField("room3_fussbodenheizung", formValues.room3_fussbodenheizung);
    addField("room4_fussbodenheizung", formValues.room4_fussbodenheizung);
    addField("room5_fussbodenheizung", formValues.room5_fussbodenheizung);

    yPosition += 5;

    // Substrate preparation
    if (formValues.substrate_preparation_fussbodenheizung?.trim()) {
      addSectionHeader("Untergrundvorbereitung Fußbodenheizung");
      addField(
        "substrate_preparation_fussbodenheizung",
        formValues.substrate_preparation_fussbodenheizung,
      );
      // Only show method and comments if substrate preparation is "ja"
      if (formValues.substrate_preparation_fussbodenheizung?.trim() === "ja") {
        addField(
          "substrate_preparation_method_fussbodenheizung",
          formValues.substrate_preparation_method_fussbodenheizung,
        );
        addField(
          "substrate_preparation_comments_fussbodenheizung",
          formValues.substrate_preparation_comments_fussbodenheizung,
        );
      }

      yPosition += 5;
    }
  }

  // Parquet Refurbishment Section
  if (formValues.request_type_refurbish_parquet) {
    addSectionHeader("Parkett Aufbereitung");
    addField("parquet_refurbish_type", formValues.parquet_refurbish_type);
    addField("parquet_refurbish_how", formValues.parquet_refurbish_how);
    addField(
      "parquet_refurbish_treatment",
      formValues.parquet_refurbish_treatment,
    );
    addField(
      "square_meters_parquet_refurbish",
      formValues.square_meters_parquet_refurbish,
    );
    yPosition += 5;
  }

  // Comments
  if (formValues.comments?.trim()) {
    addSectionHeader("Weitere Kommentare");
    addField("comments", formValues.comments);
  }

  // Return the doc and fileName for use by other functions
  const fileName = `Terra_Anfrage_${currentDate.replace(/\./g, "_")}.pdf`;
  return { doc, fileName };
}

// Export function to generate and download PDF
export async function generatePDF(formValues: FormValues): Promise<void> {
  const { doc, fileName } = await buildPDFDocument(formValues);
  doc.save(fileName);
}

// Export function to get PDF data for sending via email
export async function generatePDFData(formValues: FormValues): Promise<{
  base64: string;
  fileName: string;
}> {
  const { doc, fileName } = await buildPDFDocument(formValues);

  // Get PDF as base64 string
  const pdfBase64 = doc.output("datauristring").split(",")[1];

  return {
    base64: pdfBase64,
    fileName: fileName,
  };
}
