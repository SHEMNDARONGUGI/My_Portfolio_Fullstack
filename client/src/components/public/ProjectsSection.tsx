import { useEffect, useState } from "react";
import { getProjects } from "../../Services/project.service";
import type { Project } from "../../types/project";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <p className="text-primary">Loading projects...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <section id="projects" className="px-4 py-10 md:px-8">
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
          Work & Builds
        </p>
        <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
          Projects
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </section>
  );
}
