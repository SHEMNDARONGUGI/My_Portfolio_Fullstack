import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-16 text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <section className="relative w-full max-w-xl text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
          <Compass aria-hidden="true" className="size-8" />
        </div>
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Page not found
        </p>
        <h1 className="mt-3 text-7xl font-bold tracking-tight sm:text-9xl">
          404
        </h1>
        <p className="mt-5 text-xl font-semibold">
          Looks like you’ve taken a wrong turn.
        </p>
        <p className="mx-auto mt-3 max-w-md leading-7 text-muted-foreground">
          The page you’re looking for doesn’t exist or may have moved. Head back
          to my portfolio to find your way.
        </p>
        <Button asChild size="lg" className="mt-8">
          <a href="/">
            <ArrowLeft aria-hidden="true" />
            Back to portfolio
          </a>
        </Button>
      </section>
    </main>
  );
}
