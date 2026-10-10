import assert from "node:assert/strict";
import test from "node:test";
import { contactMessageSchema } from "../src/features/contact/contact.schema.js";
import { loginSchema } from "../src/features/auth/auth.schema.js";
import { createProjectSchema } from "../src/features/projects/project.schema.js";
import { createExperienceSchema } from "../src/features/experience/exp.schema.js";
import { createEducationSchema } from "../src/features/education/edu.schema.js";
import { createCertificationSchema } from "../src/features/certification/cert.schema.js";
import { createServiceSchema } from "../src/features/services/service.schema.js";
import { createSkillSchema } from "../src/features/skills/skills.schema.js";

test("login validation accepts credentials and rejects missing passwords", () => {
  assert.equal(
    loginSchema.safeParse({ username: "admin", password: "secret" }).success,
    true,
  );
  assert.equal(loginSchema.safeParse({ username: "admin" }).success, false);
});

test("project validation applies defaults and rejects invalid URLs", () => {
  const parsed = createProjectSchema.safeParse({
    title: "Portfolio",
    description: "A personal portfolio",
  });

  assert.equal(parsed.success, true);
  if (parsed.success) {
    assert.deepEqual(parsed.data.technologies, []);
    assert.equal(parsed.data.featured, false);
  }

  assert.equal(
    createProjectSchema.safeParse({
      title: "Portfolio",
      description: "A personal portfolio",
      liveUrl: "not a URL",
    }).success,
    false,
  );
});

test("experience, education, certification, service and skill schemas validate required fields", () => {
  assert.equal(
    createExperienceSchema.safeParse({
      company: "Example",
      role: "Developer",
      description: "Build software",
      startDate: "2024",
      technologies: ["TypeScript"],
    }).success,
    true,
  );
  assert.equal(
    createEducationSchema.safeParse({
      institution: "Example University",
      course: "Computer Science",
      description: "Degree",
      skills: ["Programming"],
      startDate: "2020",
    }).success,
    true,
  );
  assert.equal(
    createCertificationSchema.safeParse({
      certSource: "Example",
      certTitle: "Web Development",
      description: "Completion",
    }).success,
    true,
  );
  assert.equal(
    createServiceSchema.safeParse({
      title: "Web development",
      description: "Web apps",
      icon: "code",
    }).success,
    true,
  );
  assert.equal(
    createSkillSchema.safeParse({
      skill: "TypeScript",
      description: "Typed JavaScript",
    }).success,
    true,
  );
});

test("contact validation trims content and rejects invalid or oversized submissions", () => {
  const parsed = contactMessageSchema.safeParse({
    name: "  Alex Example  ",
    email: "alex@example.com",
    message: "  Hello there  ",
  });

  assert.equal(parsed.success, true);
  if (parsed.success) {
    assert.equal(parsed.data.name, "Alex Example");
    assert.equal(parsed.data.message, "Hello there");
  }

  assert.equal(
    contactMessageSchema.safeParse({
      name: "Alex",
      email: "invalid",
      message: "Hello",
    }).success,
    false,
  );
  assert.equal(
    contactMessageSchema.safeParse({
      name: "Alex",
      email: "alex@example.com",
      message: "x".repeat(5001),
    }).success,
    false,
  );
});
