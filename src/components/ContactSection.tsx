import { useRef, useState, type FormEvent } from "react";

import { sendContactMessage } from "@/lib/contact";

export function ContactSection() {
  const submitting = useRef(false);
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    submitting.current = true;
    setPending(true);
    setFeedback(null);
    try {
      const result = await sendContactMessage({
        data: {
          name: String(fields.get("name") ?? ""),
          email: String(fields.get("email") ?? ""),
          message: String(fields.get("message") ?? ""),
          website: String(fields.get("website") ?? ""),
        },
      });
      setFeedback(result);
      if (result.success) form.reset();
    } catch {
      setFeedback({
        success: false,
        message: "Your message could not be sent. Please try again later.",
      });
    } finally {
      submitting.current = false;
      setPending(false);
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t-2 border-foreground bg-muted/30"
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">
            Get in touch
          </p>
          <h2 id="contact-heading" className="font-display text-3xl font-extrabold">
            Contact me
          </h2>
          <p className="mt-3 max-w-md text-muted-foreground">
            Have a question, a suggestion or a resource to share? Send Lethabo Ratau a message.
          </p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <fieldset disabled={pending} className="space-y-4 disabled:opacity-70">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-semibold" htmlFor="contact-name">
                Your name
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  className="mt-2 block w-full rounded-md border border-input bg-background px-3 py-2 font-normal"
                />
              </label>
              <label className="block text-sm font-semibold" htmlFor="contact-email">
                Your email
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  className="mt-2 block w-full rounded-md border border-input bg-background px-3 py-2 font-normal"
                />
              </label>
            </div>
            <label className="block text-sm font-semibold" htmlFor="contact-message">
              Your message
              <textarea
                id="contact-message"
                name="message"
                required
                minLength={10}
                maxLength={5000}
                rows={5}
                placeholder="How can I help?"
                className="mt-2 block w-full resize-y rounded-md border border-input bg-background px-3 py-2 font-normal"
              />
            </label>
            <div hidden aria-hidden="true">
              <label htmlFor="contact-website">Leave this field empty</label>
              <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
            </div>
            <p className="text-xs text-muted-foreground">
              Your name, email and message will be used to respond to your enquiry.
            </p>
            <button
              type="submit"
              className="rounded-md bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:bg-primary disabled:cursor-wait"
            >
              {pending ? "Sending…" : "Send message"}
            </button>
          </fieldset>
          <div aria-live="polite" aria-atomic="true">
            {feedback && (
              <p
                role={feedback.success ? "status" : "alert"}
                className={feedback.success ? "text-sm text-primary" : "text-sm text-destructive"}
              >
                {feedback.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
