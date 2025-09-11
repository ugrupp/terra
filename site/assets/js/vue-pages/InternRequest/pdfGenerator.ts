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
  substrate_preparation_comments_bodenbelag: "Kommentare Untergrundvorbereitung",
  
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
  substrate_preparation_fussbodenheizung: "Untergrundvorbereitung Fußbodenheizung",
  substrate_preparation_method_fussbodenheizung: "Methode Untergrundvorbereitung",
  substrate_preparation_comments_fussbodenheizung: "Kommentare Untergrundvorbereitung",
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
  phone: "Telefon",
  comments: "Kommentare"
};

export function generatePDF(formValues: FormValues): void {
  const doc = new jsPDF();
  
  // Set font
  doc.setFont("helvetica");
  
  // Title
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Terra Bodenbeläge - Interne Anfrage", 20, 20);
  
  // Subtitle with date
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  const currentDate = new Date().toLocaleDateString("de-DE");
  doc.text(`Erstellt am: ${currentDate}`, 20, 30);
  
  let yPosition = 50;
  doc.setFontSize(10);
  
  // Helper function to add a section header
  const addSectionHeader = (title: string) => {
    if (yPosition > 260) {
      doc.addPage();
      yPosition = 20;
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(title, 20, yPosition);
    yPosition += 10;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
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
  if (formValues.first_name || formValues.last_name || formValues.email || formValues.phone) {
    addSectionHeader("Kontaktdaten");
    addField("first_name", formValues.first_name);
    addField("last_name", formValues.last_name);
    addField("email", formValues.email);
    addField("phone", formValues.phone);
    yPosition += 5;
  }
  
  // Location and Timing (at the top for better overview)
  if (formValues.city || formValues.postal_code || formValues.street || formValues.timing_preference) {
    addSectionHeader("Ort und Terminwunsch");
    addField("street", formValues.street);
    addField("postal_code", formValues.postal_code);
    addField("city", formValues.city);
    addField("timing_preference", formValues.timing_preference);
    yPosition += 5;
  }
  
  // Request Types Section
  if (formValues.request_type_bodenbelag || formValues.request_type_fussbodenheizung || formValues.request_type_refurbish_parquet) {
    addSectionHeader("Art der Anfrage");
    if (formValues.request_type_bodenbelag) addField("request_type_bodenbelag", true);
    if (formValues.request_type_fussbodenheizung) addField("request_type_fussbodenheizung", true);
    if (formValues.request_type_refurbish_parquet) addField("request_type_refurbish_parquet", true);
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
    
    // Substrate preparation
    addField("substrate_preparation_bodenbelag", formValues.substrate_preparation_bodenbelag);
    addField("substrate_preparation_method_bodenbelag", formValues.substrate_preparation_method_bodenbelag);
    addField("substrate_preparation_comments_bodenbelag", formValues.substrate_preparation_comments_bodenbelag);
    
    addField("installation_method", formValues.installation_method);
    addField("square_meters_bodenbelag", formValues.square_meters_bodenbelag);
    
    // Baseboards
    addField("baseboards_needed", formValues.baseboards_needed);
    addField("baseboard_type", formValues.baseboard_type);
    addField("baseboard_notes", formValues.baseboard_notes);
    
    // Room doors
    addField("room_doors_needed", formValues.room_doors_needed);
    addField("room_doors_quantity", formValues.room_doors_quantity);
    addField("room_doors_measurements", formValues.room_doors_measurements);
    addField("room_doors_execution", formValues.room_doors_execution);
    
    yPosition += 5;
  }
  
  // Fußbodenheizung Section
  if (formValues.request_type_fussbodenheizung) {
    addSectionHeader("Fußbodenheizung");
    addField("heating_system", formValues.heating_system);
    addField("underground_type", formValues.underground_type);
    addField("construction_year", formValues.construction_year);
    
    // Rooms
    addField("room1_fussbodenheizung", formValues.room1_fussbodenheizung);
    addField("room2_fussbodenheizung", formValues.room2_fussbodenheizung);
    addField("room3_fussbodenheizung", formValues.room3_fussbodenheizung);
    addField("room4_fussbodenheizung", formValues.room4_fussbodenheizung);
    addField("room5_fussbodenheizung", formValues.room5_fussbodenheizung);
    
    // Substrate preparation
    addField("substrate_preparation_fussbodenheizung", formValues.substrate_preparation_fussbodenheizung);
    addField("substrate_preparation_method_fussbodenheizung", formValues.substrate_preparation_method_fussbodenheizung);
    addField("substrate_preparation_comments_fussbodenheizung", formValues.substrate_preparation_comments_fussbodenheizung);
    
    addField("square_meters_fussbodenheizung", formValues.square_meters_fussbodenheizung);
    yPosition += 5;
  }
  
  // Parquet Refurbishment Section
  if (formValues.request_type_refurbish_parquet) {
    addSectionHeader("Parkett Aufbereitung");
    addField("parquet_refurbish_type", formValues.parquet_refurbish_type);
    addField("parquet_refurbish_how", formValues.parquet_refurbish_how);
    addField("parquet_refurbish_treatment", formValues.parquet_refurbish_treatment);
    addField("square_meters_parquet_refurbish", formValues.square_meters_parquet_refurbish);
    yPosition += 5;
  }
  
  // Comments
  if (formValues.comments) {
    addSectionHeader("Weitere Kommentare");
    addField("comments", formValues.comments);
  }
  
  // Save the PDF
  const fileName = `Terra_Anfrage_${currentDate.replace(/\./g, "_")}.pdf`;
  doc.save(fileName);
}