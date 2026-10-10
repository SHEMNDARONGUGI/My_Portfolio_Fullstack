import { useState, type FormEvent } from "react";
import { isAxiosError } from "axios";
import { LoaderCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "../../lib/api";

interface ContactResponse {
  success: boolean;
  message: string;
}

export default function ContactSection() {
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setFeedback(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await api.post<ContactResponse>("/contact", {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      });
      setFeedback({ type: "success", message: response.data.message });
      form.reset();
    } catch (error: unknown) {
      const message = isAxiosError<{ message?: string }>(error)
        ? error.response?.data.message ?? error.message
        : error instanceof Error
          ? error.message
          : "An unexpected error occurred.";
      setFeedback({
        type: "error",
        message: `Your message could not be sent. ${message}`,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="px-4 py-12 md:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
            Get in touch
          </p>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
            Contact me
          </h2>
          <p className="mt-3 text-muted-foreground">
            Have a project in mind or want to say hello? Send me a message.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-lg shadow-black/5 md:p-8"
        >
          <div className="space-y-2">
            <Label htmlFor="contact-name">Name</Label>
            <Input
              id="contact-name"
              name="name"
              autoComplete="name"
              maxLength={100}
              required
              disabled={sending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              required
              disabled={sending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-message">Message</Label>
            <textarea
              id="contact-message"
              name="message"
              maxLength={5000}
              required
              disabled={sending}
              rows={6}
              className="w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          {feedback && (
            <div
              role={feedback.type === "error" ? "alert" : "status"}
              className={`text-sm ${
                feedback.type === "success"
                  ? "text-primary"
                  : "text-destructive"
              }`}
            >
              <p>{feedback.message}</p>
              {feedback.type === "error" && (
                <a
                  href="mailto:shemndaro7@gmail.com"
                  className="mt-1 inline-block underline underline-offset-4"
                >
                  Email me directly
                </a>
              )}
            </div>
          )}
          <Button type="submit" disabled={sending}>
            {sending ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <Send />
            )}
            {sending ? "Sending..." : "Send message"}
          </Button>
        </form>
      </div>
    </section>
  );
}
