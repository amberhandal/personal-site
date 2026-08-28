"use server";

import React from "react";
import { Resend } from "resend";
import { validateString, getErrorMessage } from "@/lib/utils";
import ContactFormEmail from "@/email/contact-form-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  // simple server-side validation
  if (!validateString(senderEmail, 500)) {
    return {
      error: "Invalid sender email",
    };
  }
  if (!validateString(message, 5000)) {
    return {
      error: "Invalid message",
    };
  }

  try {
    // Resend v3 reports API failures in the returned `error`, not by throwing,
    // so this has to be checked explicitly or failures look like successes.
    const { data, error } = await resend.emails.send({
      from: "Contact Form <contact@amberhandal.com>",
      to: "amberhandal.dev@gmail.com",
      subject: "Message from contact form",
      reply_to: senderEmail,
      react: React.createElement(ContactFormEmail, {
        message: message,
        senderEmail: senderEmail,
      }),
    });

    if (error) {
      console.error("Resend send failed:", error);
      return {
        error: getErrorMessage(error),
      };
    }

    return {
      data,
    };
  } catch (error: unknown) {
    // network/transport failures still throw
    console.error("Resend send threw:", error);
    return {
      error: getErrorMessage(error),
    };
  }
};