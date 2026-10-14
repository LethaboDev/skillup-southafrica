import { createServerFn } from "@tanstack/react-start";

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data)
  .handler(async ({ data }) => {
    const { deliverContactMessage } = await import("./contact.server");
    return deliverContactMessage(data);
  });
