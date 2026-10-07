export const WHATSAPP_NUMBER = "254722112807";
export const PHONE_DISPLAY = "+254 722 112 807";
export const EMAIL = "asterisk.construction.1@gmail.com";

const DEFAULT_MESSAGE =
  "Hello Asterisk Construction, I visited your website and would like to request a quotation for a construction project. Please guide me on the next steps.";

export function whatsappLink(message: string = DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function quotationLink(input: {
  projectType: string;
  budget: string;
  location: string;
  notes?: string;
}) {
  const lines = [
    "Hello Asterisk Construction, I would like to request a quotation.",
    `Project type: ${input.projectType}`,
    `Estimated budget: ${input.budget || "To be advised"}`,
    `Location: ${input.location || "To be advised"}`,
  ];
  if (input.notes?.trim()) lines.push(`Details: ${input.notes.trim()}`);
  lines.push("Please guide me on the next steps.");
  return whatsappLink(lines.join("\n"));
}
