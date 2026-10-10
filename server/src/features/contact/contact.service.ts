import nodemailer from "nodemailer";
import mongoose from "mongoose";
import { ContactMessage } from "./contact.model.js";
import type { ContactMessageData } from "./contact.schema.js";

export const sendContactMessage = async (
  message: ContactMessageData,
): Promise<void> => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  const recipient =
    process.env.CONTACT_EMAIL?.trim() || "shemndaro7@gmail.com";
  const port = Number(SMTP_PORT);

  if (
    !SMTP_HOST?.trim() ||
    !SMTP_USER?.trim() ||
    !SMTP_PASS ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65535
  ) {
    throw new Error("Contact form email delivery is not configured");
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: SMTP_USER,
    to: recipient,
    replyTo: message.email,
    subject: `Portfolio contact from ${message.name}`,
    text: `Name: ${message.name}\nEmail: ${message.email}\n\n${message.message}`,
  });
};

export const saveContactMessage = (message: ContactMessageData) =>
  ContactMessage.create(message);

export const updateEmailDeliveryStatus = async (
  id: mongoose.Types.ObjectId,
  status: "sent" | "failed",
): Promise<void> => {
  await ContactMessage.updateOne(
    { _id: id },
    { $set: { emailDeliveryStatus: status } },
  );
};

export const getContactMessages = () =>
  ContactMessage.find().sort({ createdAt: -1 }).lean();
