import type { RequestHandler } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  getContactMessages,
  saveContactMessage,
  sendContactMessage,
  updateEmailDeliveryStatus,
} from "./contact.service.js";

export const submitContactMessage: RequestHandler = asyncHandler(
  async (req, res): Promise<void> => {
    const savedMessage = await saveContactMessage(req.body);
    let emailSent = false;

    try {
      await sendContactMessage(req.body);
      emailSent = true;
    } catch (error: unknown) {
      const smtpError =
        typeof error === "object" && error !== null ? error : {};
      const errorDetails = {
        name:
          "name" in smtpError && typeof smtpError.name === "string"
            ? smtpError.name
            : "UnknownError",
        code:
          "code" in smtpError && typeof smtpError.code === "string"
            ? smtpError.code
            : undefined,
        responseCode:
          "responseCode" in smtpError &&
          typeof smtpError.responseCode === "number"
            ? smtpError.responseCode
            : undefined,
        command:
          "command" in smtpError && typeof smtpError.command === "string"
            ? smtpError.command
            : undefined,
      };
      console.error(
        "Contact message was saved, but email delivery failed:",
        errorDetails,
      );
    }

    await updateEmailDeliveryStatus(
      savedMessage._id,
      emailSent ? "sent" : "failed",
    );

    res.status(201).json({
      success: true,
      emailSent,
      message: emailSent
        ? "Thanks for reaching out! Your message was sent successfully."
        : "Thanks for reaching out! Your message was received and saved, but the email notification could not be delivered.",
    });
  },
);

export const listContactMessages: RequestHandler = asyncHandler(
  async (_req, res): Promise<void> => {
    const messages = await getContactMessages();
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  },
);
