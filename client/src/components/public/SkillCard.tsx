import type { Skill } from "../../types/skill";

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <article className="min-w-0 rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-lg shadow-black/5 transition-transform hover:-translate-y-1 sm:p-6">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
        Expertise
      </p>
      <h3 className="mt-2 break-words text-xl font-semibold text-foreground sm:text-2xl">{skill.skill}</h3>
      <p className="mt-4 break-words text-base leading-7 text-muted-foreground">
        {skill.description}
      </p>
    </article>
  );
}
