import { z } from "zod";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1)
    .max(100)
    .refine((value) => !/[\r\n]/.test(value)),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(200).default(""),
});

const unavailable = {
  success: false,
  message: "Message sending is currently unavailable. Please try again later.",
};
let windowStarted = 0;
let attempts = 0;

export async function deliverContactMessage(input: unknown) {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please enter your name, a valid email and a message of 10–5,000 characters.",
    };
  }
  if (parsed.data.website) {
    return { success: false, message: "Your message could not be sent." };
  }

  // Read only at request time. These settings never use the browser-visible VITE_ prefix.
  const key = process.env["RESEND_API_KEY"];
  const recipient = process.env["CONTACT_TO_EMAIL"];
  const sender = process.env["CONTACT_FROM_EMAIL"];
  if (!key || !recipient || !sender) return unavailable;

  // A small per-instance send budget; production should also limit requests at the host.
  const now = Date.now();
  if (now - windowStarted >= 60 * 60 * 1000) {
    windowStarted = now;
    attempts = 0;
  }
  if (attempts >= 20)
    return { success: false, message: "Too many messages right now. Please try again later." };
  attempts++;

  const { name, email, message } = parsed.data;
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: "SkillUp South Africa — contact message",
        text: `Name: ${name}\nReply email: ${email}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return unavailable;
    return {
      success: true,
      message: "Your message has been sent. Thank you for getting in touch!",
    };
  } catch {
    return unavailable;
  }
}
