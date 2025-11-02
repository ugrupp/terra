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
  installation_method: "Verlegeart",
  square_meters_bodenbelag: "Quadratmeter Bodenbelag",

  // Heating system
  heating_system: "Heizsystem",
  underground_type: "Untergrundtyp",
  construction_year: "Baujahr",
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
  privacy_accepted: "Datenschutzerklärung akzeptiert",
};

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
  doc.text("Kundenanfrage", 20, 47);

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

  // Contact Information (at the top for better overview)
  if (
    formValues.first_name ||
    formValues.last_name ||
    formValues.email ||
    formValues.phone ||
    formValues.client_street ||
    formValues.client_postal_code ||
    formValues.client_city ||
    formValues.privacy_accepted
  ) {
    addSectionHeader("Kontaktdaten");
    addField("first_name", formValues.first_name);
    addField("last_name", formValues.last_name);
    addField("email", formValues.email);
    addField("client_street", formValues.client_street);
    addField("client_postal_code", formValues.client_postal_code);
    addField("client_city", formValues.client_city);
    addField("phone", formValues.phone);
    addField("privacy_accepted", formValues.privacy_accepted);
    yPosition += 5;
  }

  // Location and Timing (at the top for better overview)
  if (
    formValues.city ||
    formValues.postal_code ||
    formValues.street ||
    formValues.timing_preference
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
  if (formValues.house_type || formValues.stockwerk || formValues.object_age) {
    addSectionHeader("Objektdetails");
    addField("house_type", formValues.house_type);
    addField("stockwerk", formValues.stockwerk);
    addField("object_age", formValues.object_age);
    addField("remove_old_covering", formValues.remove_old_covering);
    addField("old_covering_type", formValues.old_covering_type);
    yPosition += 5;
  }

  // Bodenbelag Section
  if (formValues.request_type_bodenbelag) {
    addSectionHeader("Bodenbelag");
    addField("floor_covering_type", formValues.floor_covering_type);
    addField("installation_method", formValues.installation_method);
    addField("square_meters_bodenbelag", formValues.square_meters_bodenbelag);
    yPosition += 5;
  }

  // Fußbodenheizung Section
  if (formValues.request_type_fussbodenheizung) {
    addSectionHeader("Fußbodenheizung");
    addField("heating_system", formValues.heating_system);
    addField("underground_type", formValues.underground_type);
    addField("construction_year", formValues.construction_year);
    addField(
      "square_meters_fussbodenheizung",
      formValues.square_meters_fussbodenheizung,
    );
    yPosition += 5;
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
  if (formValues.comments) {
    addSectionHeader("Weitere Kommentare");
    addField("comments", formValues.comments);
  }

  // Return the doc and fileName for use by other functions
  const fileName = `Terra_Kundenanfrage_${currentDate.replace(/\./g, "_")}.pdf`;
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
