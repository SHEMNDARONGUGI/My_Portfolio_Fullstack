import { Code2, Lightbulb, Rocket } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Full-stack foundations",
    description:
      "Building practical applications across user interfaces, APIs and data.",
  },
  {
    icon: Lightbulb,
    title: "Curious by nature",
    description:
      "Continuously developing my skills in cloud, DevOps, networking and system design.",
  },
  {
    icon: Rocket,
    title: "Learning by building",
    description:
      "Turning real problems into useful products and improving with every iteration.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="grid items-center gap-10 px-4 py-14 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:px-8 md:py-20"
    >
      <div className="mx-auto w-full max-w-sm">
        <div className="overflow-hidden rounded-3xl border border-border bg-card p-2 shadow-xl shadow-black/10">
          <img
            src="/shem-ndaro.png"
            alt="Shem Ndaro speaking at an event"
            className="aspect-square w-full rounded-2xl object-cover"
            fetchPriority="high"
          />
        </div>
      </div>

      <div>
        <h1
          id="about-title"
          className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          About Me
        </h1>
        <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
          <p>
            I’m a Computer Science student and aspiring software engineer who
            enjoys building reliable, scalable and user-focused software.
          </p>
          <p>
            I work across the stack, turning ideas into practical applications
            with{" "}
            <strong className="font-semibold text-foreground">
              TypeScript, Node.js, Express, React, MongoDB and REST APIs
            </strong>
            . I’m also growing my skills in cloud computing, DevOps, networking,
            system design and data-driven development.
          </p>
          <p>
            I believe the best way to learn engineering is to build real
            products, solve real problems and keep improving. My goal is to
            become a well-rounded engineer who can design, build, test and
            deploy software people can rely on.
          </p>
          <p>
            Away from the keyboard, I’m usually learning something new,
            exploring technology or working on my next project.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {highlights.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-2xl border border-border bg-card p-4"
            >
              <Icon aria-hidden="true" className="size-5 text-primary" />
              <h2 className="mt-3 text-sm font-semibold text-foreground">
                {title}
              </h2>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
