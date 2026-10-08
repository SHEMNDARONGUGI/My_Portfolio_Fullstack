import { useEffect, useState } from "react";
import { getEducations } from "../../Services/education.service";
import type { Education } from "../../types/education";
import EducationCard from "./EducationCard";

export default function EducationSection() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const data = await getEducations();
        setEducation(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load education");
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  if (loading) {
    return <p className="text-primary">Loading education...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <section id="education" className="px-4 py-10 md:px-8">
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
          Learning Path
        </p>
        <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
          Education
        </h2>
      </div>

      <div className="space-y-6">
        {education.map((item) => (
          <EducationCard key={item._id} education={item} />
        ))}
      </div>
    </section>
  );
}
