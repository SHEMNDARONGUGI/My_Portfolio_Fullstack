import type { Education } from "../../types/education";
import { getImageUrl } from "../../Services/upload.service";

interface EducationCardProps {
  education: Education;
}

export default function EducationCard({ education }: EducationCardProps) {
  const period = education.endDate
    ? `${education.startDate} - ${education.endDate}`
    : `${education.startDate} - Present`;

  return (
    <article className="min-w-0 rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-lg shadow-black/5 transition-transform hover:-translate-y-1 sm:p-6">
      <div className="mb-4 flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          {education.logoUrl && (
            <div className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-border bg-background p-2 sm:size-[4.5rem]">
              <img
                src={getImageUrl(education.logoUrl)}
                alt={`${education.institution} logo`}
                className="size-full object-contain"
                loading="lazy"
              />
            </div>
          )}
          <div className="min-w-0">
            <p className="break-words text-sm font-medium uppercase tracking-[0.2em] text-primary">
              {education.institution}
            </p>
            <h3 className="mt-2 break-words text-xl font-semibold text-foreground sm:text-2xl">
              {education.course}
            </h3>
          </div>
        </div>

        <span className="ml-20 w-fit max-w-full rounded-full border border-primary/30 bg-accent px-3 py-1 text-xs font-medium text-accent-foreground sm:ml-0">
          {period}
        </span>
      </div>

      <p className="break-words text-base leading-7 text-muted-foreground">
        {education.description}
      </p>

      {education.skills.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {education.skills.map((skill) => (
            <span
              key={skill}
              className="break-all rounded-full bg-muted px-3 py-1 text-sm text-tag-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
