import { useCallback, useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { LoaderCircle, Mail, MailCheck, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "../../lib/api";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  emailDeliveryStatus: "pending" | "sent" | "failed";
  createdAt: string;
}

interface ContactMessagesResponse {
  success: boolean;
  count: number;
  data: ContactMessage[];
}

const getErrorMessage = (error: unknown): string => {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data.message ?? error.message;
  }
  return error instanceof Error
    ? error.message
    : "An unexpected error occurred.";
};

export default function ContactInbox() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMessages = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await api.get<ContactMessagesResponse>("/contact", {
        signal,
      });
      setError("");
      setMessages(response.data.data);
    } catch (loadError) {
      if (signal?.aborted) return;
      setError(`Could not load contact messages: ${getErrorMessage(loadError)}`);
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void Promise.resolve().then(() => loadMessages(controller.signal));
    return () => controller.abort();
  }, [loadMessages]);

  return (
    <section id="messages" className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle>Contact messages</CardTitle>
            <CardDescription>
              Messages received through your public portfolio contact form.
            </CardDescription>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={loading}
            onClick={() => {
              setLoading(true);
              setError("");
              void loadMessages();
            }}
          >
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <RefreshCw />
            )}
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          {error && (
            <div
              role="alert"
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
            >
              <span>{error}</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setLoading(true);
                  setError("");
                  void loadMessages();
                }}
              >
                Try again
              </Button>
            </div>
          )}
          {loading ? (
            <div className="flex items-center gap-2 py-8 text-sm text-muted-foreground">
              <LoaderCircle className="size-4 animate-spin" />
              Loading messages...
            </div>
          ) : messages.length === 0 ? (
            <div className="rounded-xl border border-dashed p-8 text-center">
              <Mail className="mx-auto size-8 text-muted-foreground" />
              <p className="mt-3 font-medium">No messages yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Messages submitted through your portfolio will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {messages.length}{" "}
                {messages.length === 1 ? "message" : "messages"}
              </p>
              {messages.map((message) => (
                <article
                  key={message._id}
                  className="space-y-4 rounded-xl border p-4"
                >
                  <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-start">
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold">{message.name}</h3>
                      <a
                        href={`mailto:${message.email}`}
                        className="break-all text-sm text-primary underline-offset-4 hover:underline"
                      >
                        {message.email}
                      </a>
                    </div>
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                      <Badge
                        variant={
                          message.emailDeliveryStatus === "sent"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {message.emailDeliveryStatus === "sent" ? (
                          <MailCheck />
                        ) : (
                          <Mail />
                        )}
                        Email {message.emailDeliveryStatus}
                      </Badge>
                      <time
                        dateTime={message.createdAt}
                        className="text-xs text-muted-foreground"
                      >
                        {new Date(message.createdAt).toLocaleString()}
                      </time>
                    </div>
                  </div>
                  <p className="whitespace-pre-wrap break-words text-sm leading-6 text-muted-foreground">
                    {message.message}
                  </p>
                </article>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
