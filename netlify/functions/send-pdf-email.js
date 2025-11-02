const { Resend } = require("resend");

// HTML escape helper function to prevent XSS
function escapeHtml(unsafe) {
  if (!unsafe) return "";
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate origin
function isValidOrigin(headers) {
  const origin = headers.origin || headers.referer || "";
  const allowedOrigins = [
    "https://terra-boden.de",
    "https://www.terra-boden.de",
    "http://localhost",
    "http://127.0.0.1",
  ];

  return allowedOrigins.some((allowed) => origin.startsWith(allowed));
}

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  // Validate origin
  if (!isValidOrigin(event.headers)) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: "Forbidden" }),
    };
  }

  // Check payload size (10MB limit)
  const contentLength = parseInt(event.headers["content-length"] || "0");
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  if (contentLength > MAX_SIZE) {
    return {
      statusCode: 413,
      body: JSON.stringify({ error: "Payload too large" }),
    };
  }

  // Check API key exists
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY environment variable is not set");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server configuration error" }),
    };
  }

  try {
    const { pdfBase64, fileName, formData, requestType } = JSON.parse(
      event.body,
    );

    // Validate required fields
    if (!pdfBase64 || !fileName) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Missing required fields",
        }),
      };
    }

    // Validate PDF size (additional check)
    if (pdfBase64.length > MAX_SIZE * 1.5) {
      // Base64 is ~33% larger
      return {
        statusCode: 413,
        body: JSON.stringify({ error: "PDF file too large" }),
      };
    }

    // Validate fileName doesn't contain path traversal
    if (
      fileName.includes("..") ||
      fileName.includes("/") ||
      fileName.includes("\\")
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid file name" }),
      };
    }

    // Validate requestType
    const validRequestTypes = ["client", "internal"];
    if (requestType && !validRequestTypes.includes(requestType)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid request type" }),
      };
    }

    // Determine if this is a client or internal request
    const isClientRequest =
      requestType === "client" || fileName.includes("Kundenanfrage");
    const requestTypeLabel = isClientRequest
      ? "Kundenanfrage"
      : "interne Anfrage";

    // Initialize Resend with API key
    const resend = new Resend(RESEND_API_KEY);

    // Create email body with form data summary (with XSS protection)
    const emailBody = `
      <h2>Neue ${escapeHtml(requestTypeLabel)} von Terra Bodenbeläge</h2>
      <p>Eine neue ${escapeHtml(requestTypeLabel)} wurde erstellt. Die Details finden Sie im angehängten PDF.</p>

      ${
        formData
          ? `
      <h3>Schnellübersicht:</h3>
      <ul>
        ${
          formData.first_name || formData.last_name
            ? `<li><strong>Name:</strong> ${escapeHtml(formData.first_name || "")} ${escapeHtml(
                formData.last_name || "",
              )}</li>`
            : ""
        }
        ${
          formData.email
            ? `<li><strong>E-Mail:</strong> ${escapeHtml(formData.email)}</li>`
            : ""
        }
        ${
          formData.phone
            ? `<li><strong>Telefon:</strong> ${escapeHtml(formData.phone)}</li>`
            : ""
        }
        ${
          formData.city
            ? `<li><strong>Stadt:</strong> ${escapeHtml(formData.city)}</li>`
            : ""
        }
        ${formData.request_type_bodenbelag ? `<li>✓ Bodenbelag</li>` : ""}
        ${
          formData.request_type_fussbodenheizung
            ? `<li>✓ Fußbodenheizung</li>`
            : ""
        }
        ${
          formData.request_type_refurbish_parquet
            ? `<li>✓ Parkett aufbereiten</li>`
            : ""
        }
      </ul>
      `
          : ""
      }

      <p>Bitte prüfen Sie das angehängte PDF für vollständige Details.</p>
    `;

    const data = await resend.emails.send({
      from: "Terra Bodenbeläge <anfragen@terra-boden.de>",
      to: ["cm@terra-boden.de"],
      subject: `Neue ${requestTypeLabel}`,
      html: emailBody,
      attachments: [
        {
          filename: fileName,
          content: pdfBase64,
        },
      ],
    });

    // Check if Resend returned an error
    if (data.error) {
      console.error("Resend API error:", data.error);
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Failed to send email",
        }),
      };
    }

    // If this is a client request, send a confirmation email to the customer
    if (isClientRequest && formData && formData.email) {
      // Validate customer email
      if (!isValidEmail(formData.email)) {
        console.error("Invalid customer email format:", formData.email);
        // Don't fail the whole request, just skip customer email
      } else {
        // Load logo image and convert to base64 for inline attachment
        const fs = require("fs");
        const path = require("path");
        let logoBase64 = "";

        try {
          const logoPath = path.join(
            process.cwd(),
            "site",
            "static",
            "signatur",
            "logo.png",
          );

          if (fs.existsSync(logoPath)) {
            const logoBuffer = fs.readFileSync(logoPath);
            logoBase64 = logoBuffer.toString("base64");
          }
        } catch (logoError) {
          console.error("Error loading logo:", logoError);
        }

        const customerEmailBody = `
          <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <h2 style="color: #00a65c;">Vielen Dank für Ihre Anfrage!</h2>
            <p>Ihre Anfrage ist bei uns eingegangen.</p>
            <p>Wir werden Ihre Anfrage schnellstmöglich bearbeiten, bei Zwischenfragen können Sie sich gerne bei uns melden unter <strong>07664 9273500</strong> oder <a href="mailto:cm@terra-boden.de" style="color: #00a65c;">cm@terra-boden.de</a>.</p>
            <p>Ihr TERRA Bodenbeläge Team</p>

            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">

            <div style="font-family: Arial, sans-serif; font-size: 12px; color: #666;">
              <img src="${logoBase64 ? "cid:terra-logo" : "https://terra-boden.de/signatur/logo.png"}" alt="TERRA Bodenbeläge" width="120" style="display: block; margin-bottom: 15px; width: 120px; height: auto;">
              <br>
              <div style="line-height: 1.5;">
                <strong style="color: #00a65c; font-size: 13px;">TERRA Bodenbeläge GmbH</strong><br>
                Gewerbestraße 9a<br>
                79112 Freiburg Opfingen<br>
                <br>
                <strong>telefon</strong> +49 7664 9273500<br>
                <strong>e-mail</strong> <a href="mailto:cm@terra-boden.de" style="color: #00a65c; text-decoration: none;">cm@terra-boden.de</a><br>
                <br>
                USt-IdNr. DE348946247<br>
                Geschäftsführer Claus Müller<br>
                <br>
                Registergericht Freiburg im Breisgau<br>
                Registernummer HRB 725493
              </div>
            </div>
          </div>
        `;

        // Prepare attachments array
        const customerAttachments = [
          {
            filename: fileName,
            content: pdfBase64,
          },
        ];

        // Add logo as inline attachment with correct Resend property name
        if (logoBase64) {
          customerAttachments.push({
            filename: "logo.png",
            content: logoBase64,
            contentId: "terra-logo",
          });
        }

        try {
          await resend.emails.send({
            from: "Terra Bodenbeläge <cm@terra-boden.de>",
            to: [formData.email],
            subject: "Vielen Dank für Ihre Anfrage - Terra Bodenbeläge",
            html: customerEmailBody,
            attachments: customerAttachments,
          });
        } catch (customerEmailError) {
          console.error(
            "Error sending customer confirmation:",
            customerEmailError,
          );
          // Don't fail the whole request if customer email fails
        }
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Email sent successfully",
      }),
    };
  } catch (error) {
    console.error("Error processing request:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to process request",
      }),
    };
  }
};
