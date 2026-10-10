import type { Experience } from "../../types/experience";

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const period =
    experience.current
      ? `${experience.startDate} - Present`
      : `${experience.startDate} - ${experience.endDate}`;

  return (
    <article className="min-w-0 rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-lg shadow-black/5 transition-transform hover:-translate-y-1 sm:p-6">
      <div className="mb-4 flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            {experience.company}
          </p>
          <h3 className="mt-2 break-words text-xl font-semibold text-foreground sm:text-2xl">
            {experience.role}
          </h3>
        </div>

        <span className="w-fit max-w-full rounded-full border border-primary/30 bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
          {period}
        </span>
      </div>

      <p className="break-words text-base leading-7 text-muted-foreground">
        {experience.description}
      </p>

      {experience.technologies.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {experience.technologies.map((technology) => (
            <span
              key={technology}
              className="break-all rounded-full bg-muted px-3 py-1 text-sm text-tag-foreground"
            >
              {technology}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
