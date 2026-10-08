import type { Skill } from "../../types/skill";

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-lg shadow-black/5 transition-transform hover:-translate-y-1">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
        Expertise
      </p>
      <h3 className="mt-2 text-2xl font-semibold text-foreground">{skill.skill}</h3>
      <p className="mt-4 text-base leading-7 text-muted-foreground">
        {skill.description}
      </p>
    </article>
  );
}
