import { fireEvent, render, screen, waitFor, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ContactSection } from "@/components/ContactSection";
import { deliverContactMessage } from "@/lib/contact.server";
import { sendContactMessage } from "@/lib/contact";

vi.mock("@/lib/contact", () => ({ sendContactMessage: vi.fn() }));

const input = {
  name: "Visitor",
  email: "visitor@example.com",
  message: "Please share more learning resources.",
  website: "",
};

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("Contact delivery", () => {
  it("does not call an email service without credentials, with invalid input or with a honeypot filled", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    expect((await deliverContactMessage(input)).success).toBe(false);
    expect((await deliverContactMessage({ ...input, email: "invalid" })).success).toBe(false);
    expect((await deliverContactMessage({ ...input, website: "spam" })).success).toBe(false);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("uses the private server recipient and visitor Reply-To without returning provider details", async () => {
    vi.stubEnv("RESEND_API_KEY", "private-test-key");
    vi.stubEnv("CONTACT_TO_EMAIL", "private-inbox@example.com");
    vi.stubEnv("CONTACT_FROM_EMAIL", "contact@example.com");
    const fetch = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ id: "accepted" }), { status: 200 }));
    vi.stubGlobal("fetch", fetch);
    const result = await deliverContactMessage(input);
    expect(result.success).toBe(true);
    const body = JSON.parse(fetch.mock.calls[0]![1].body);
    expect(body.to).toEqual(["private-inbox@example.com"]);
    expect(body.reply_to).toBe(input.email);
    expect(JSON.stringify(result)).not.toContain("private-inbox");
    fetch.mockResolvedValue(new Response("private provider error", { status: 403 }));
    expect(await deliverContactMessage(input)).toEqual({
      success: false,
      message: "Message sending is currently unavailable. Please try again later.",
    });
  });
});

describe("Contact form", () => {
  it("preserves the visitor's message when sending fails and clears it only after success", async () => {
    vi.mocked(sendContactMessage).mockResolvedValueOnce({
      success: false,
      message: "Please try again later.",
    });
    render(<ContactSection />);
    fireEvent.change(screen.getByLabelText("Your name"), { target: { value: input.name } });
    fireEvent.change(screen.getByLabelText("Your email"), { target: { value: input.email } });
    fireEvent.change(screen.getByLabelText("Your message"), { target: { value: input.message } });
    fireEvent.submit(screen.getByRole("button", { name: "Send message" }).closest("form")!);
    await screen.findByRole("alert");
    expect(screen.getByLabelText("Your message")).toHaveValue(input.message);
    vi.mocked(sendContactMessage).mockResolvedValueOnce({
      success: true,
      message: "Your message has been sent.",
    });
    fireEvent.submit(screen.getByRole("button", { name: "Send message" }).closest("form")!);
    await waitFor(() => expect(screen.getByLabelText("Your message")).toHaveValue(""));
  });
});
