import { useState, type FormEvent } from "react";
import { isAxiosError } from "axios";
import { ArrowLeft, LoaderCircle, LockKeyhole } from "lucide-react";
import { login } from "../../Services/auth.service";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ThemeToggle from "@/components/ThemeToggle";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(username, password);
      sessionStorage.setItem("dashboard-login-toast", "true");
      window.location.assign("/admin");
    } catch (error) {
      const message = isAxiosError<{ message?: string }>(error)
        ? error.response?.data.message
        : undefined;
      setError(message ?? "Unable to sign in. Check your credentials and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-background px-4 py-10 text-foreground">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        <a
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to portfolio
        </a>
        <Card className="border-border bg-card text-card-foreground">
          <CardHeader>
            <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <LockKeyhole size={22} />
            </div>
            <CardTitle className="text-2xl font-semibold">
              Admin sign in
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to manage your portfolio content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="h-10 border-input bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-10 border-input bg-background"
                />
              </div>
              {error && (
                <p role="alert" className="text-sm text-red-400">
                  {error}
                </p>
              )}
              <Button
                type="submit"
                disabled={submitting}
                className="h-10 w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {submitting && <LoaderCircle className="animate-spin" />}
                {submitting ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}