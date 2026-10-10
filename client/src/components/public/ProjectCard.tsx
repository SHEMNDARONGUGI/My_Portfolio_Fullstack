import type { Project } from "../../types/project";
import { FaGithub } from "react-icons/fa";
import { getImageUrl } from "../../Services/upload.service";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="min-w-0 rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-lg shadow-black/5 transition-transform hover:-translate-y-1 sm:p-6">
      {project.imageUrl && (
        <img
          src={getImageUrl(project.imageUrl)}
          alt={project.title}
          className="mb-5 h-52 w-full rounded-xl object-cover"
        />
      )}

      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="break-words text-xl font-semibold text-foreground sm:text-2xl">{project.title}</h3>
      </div>

      <p className="break-words text-base leading-7 text-muted-foreground">{project.description}</p>

      {project.technologies.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="break-all rounded-full bg-muted px-3 py-1 text-sm text-tag-foreground"
            >
              {technology}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        {project.githubUrl && (
          <a
            className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary"
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
            GitHub
          </a>
        )}

        {project.liveUrl && (
          <a
            className="inline-flex items-center rounded-full border border-primary/30 bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition hover:bg-accent/80"
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
          >
            Live Demo
          </a>
        )}
      </div>
    </article>
  );
}
