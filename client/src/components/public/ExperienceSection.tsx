import { useEffect, useState } from "react";
import { getExperiences } from "../../Services/experience.service";
import type { Experience } from "../../types/experience";
import ExperienceCard from "./ExperienceCard";

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await getExperiences();
        setExperiences(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load experience");
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (loading) {
    return <p className="text-primary">Loading experience...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <section id="experience" className="px-4 py-10 md:px-8">
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
          Career Journey
        </p>
        <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
          Experience
        </h2>
      </div>

      <div className="space-y-6">
        {experiences.map((experience) => (
          <ExperienceCard key={experience._id} experience={experience} />
        ))}
      </div>
    </section>
  );
}
