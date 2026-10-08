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
    <article className="rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-lg shadow-black/5 transition-transform hover:-translate-y-1">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            {experience.company}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-foreground">
            {experience.role}
          </h3>
        </div>

        <span className="rounded-full border border-primary/30 bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
          {period}
        </span>
      </div>

      <p className="text-base leading-7 text-muted-foreground">
        {experience.description}
      </p>

      {experience.technologies.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {experience.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full bg-muted px-3 py-1 text-sm text-tag-foreground"
            >
              {technology}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
