const jsonBody = (schema: string) => ({
  required: true,
  content: {
    "application/json": {
      schema: { $ref: `#/components/schemas/${schema}` },
    },
  },
});

const successResponse = {
  description: "Successful response",
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/SuccessResponse" },
    },
  },
};

const unauthorizedResponse = {
  description: "Authentication is required",
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/ErrorResponse" },
    },
  },
};

const collectionPaths = (
  path: string,
  tag: string,
  itemSchema: string,
  createSchema: string,
  updateSchema: string,
) => ({
  [path]: {
    get: {
      tags: [tag],
      summary: `List ${itemSchema.toLowerCase()} records`,
      responses: { "200": successResponse },
    },
    post: {
      tags: [tag],
      summary: `Create a ${itemSchema.toLowerCase()}`,
      security: [{ cookieAuth: [] }],
      requestBody: jsonBody(createSchema),
      responses: {
        "201": successResponse,
        "400": { description: "Invalid request body" },
        "401": unauthorizedResponse,
      },
    },
  },
  [`${path}/{id}`]: {
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "string" },
      },
    ],
    get: {
      tags: [tag],
      summary: `Get a ${itemSchema.toLowerCase()}`,
      responses: {
        "200": successResponse,
        "404": { description: "Record not found" },
      },
    },
    patch: {
      tags: [tag],
      summary: `Update a ${itemSchema.toLowerCase()}`,
      security: [{ cookieAuth: [] }],
      requestBody: jsonBody(updateSchema),
      responses: {
        "200": successResponse,
        "400": { description: "Invalid request body" },
        "401": unauthorizedResponse,
        "404": { description: "Record not found" },
      },
    },
    delete: {
      tags: [tag],
      summary: `Delete a ${itemSchema.toLowerCase()}`,
      security: [{ cookieAuth: [] }],
      responses: {
        "200": successResponse,
        "401": unauthorizedResponse,
        "404": { description: "Record not found" },
      },
    },
  },
});

export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Portfolio API",
    version: "1.0.0",
    description:
      "API for portfolio content, administration, contact submissions, and image uploads.",
  },
  servers: [{ url: "/", description: "Current server" }],
  tags: [
    { name: "Health" },
    { name: "Authentication" },
    { name: "Projects" },
    { name: "Experience" },
    { name: "Education" },
    { name: "Skills" },
    { name: "Certifications" },
    { name: "Services" },
    { name: "Contact" },
    { name: "Uploads" },
  ],
  paths: {
    "/": {
      get: {
        tags: ["Health"],
        summary: "Check that the API is running",
        responses: {
          "200": {
            description: "API is running",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string" } },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/auth/super-admin": {
      post: {
        tags: ["Authentication"],
        summary: "Sign in as the portfolio administrator",
        requestBody: jsonBody("LoginRequest"),
        responses: {
          "200": { description: "Signed in; sets an HTTP-only token cookie" },
          "401": { description: "Invalid credentials" },
          "429": { description: "Too many sign-in attempts" },
        },
      },
    },
    "/api/v1/auth/me": {
      get: {
        tags: ["Authentication"],
        summary: "Get the signed-in administrator",
        security: [{ cookieAuth: [] }],
        responses: {
          "200": successResponse,
          "401": unauthorizedResponse,
        },
      },
    },
    "/api/v1/auth/logout": {
      post: {
        tags: ["Authentication"],
        summary: "Sign out",
        security: [{ cookieAuth: [] }],
        responses: {
          "200": successResponse,
          "401": unauthorizedResponse,
        },
      },
    },
    ...collectionPaths(
      "/api/v1/projects",
      "Projects",
      "Project",
      "ProjectInput",
      "ProjectUpdateInput",
    ),
    ...collectionPaths(
      "/api/v1/experience",
      "Experience",
      "Experience",
      "ExperienceInput",
      "ExperienceUpdateInput",
    ),
    ...collectionPaths(
      "/api/v1/education",
      "Education",
      "Education",
      "EducationInput",
      "EducationUpdateInput",
    ),
    ...collectionPaths(
      "/api/v1/skill",
      "Skills",
      "Skill",
      "SkillInput",
      "SkillUpdateInput",
    ),
    ...collectionPaths(
      "/api/v1/certificate",
      "Certifications",
      "Certification",
      "CertificationInput",
      "CertificationUpdateInput",
    ),
    ...collectionPaths(
      "/api/v1/services",
      "Services",
      "Service",
      "ServiceInput",
      "ServiceUpdateInput",
    ),
    "/api/v1/contact": {
      get: {
        tags: ["Contact"],
        summary: "List contact messages (administrator only)",
        security: [{ cookieAuth: [] }],
        responses: {
          "200": successResponse,
          "401": unauthorizedResponse,
          "403": { description: "Administrator access required" },
        },
      },
      post: {
        tags: ["Contact"],
        summary: "Submit a contact message",
        requestBody: jsonBody("ContactMessageInput"),
        responses: {
          "201": {
            description: "Message saved; includes email delivery status",
          },
          "400": { description: "Invalid contact message" },
          "429": { description: "Too many messages submitted" },
        },
      },
    },
    "/api/v1/uploads": {
      post: {
        tags: ["Uploads"],
        summary: "Upload a portfolio image (administrator only)",
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                required: ["image"],
                properties: {
                  image: { type: "string", format: "binary" },
                },
              },
            },
          },
        },
        responses: {
          "200": successResponse,
          "401": unauthorizedResponse,
          "413": { description: "Image exceeds the upload size limit" },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "token",
      },
    },
    schemas: {
      SuccessResponse: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
          count: { type: "integer" },
          data: {},
        },
      },
      ErrorResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          message: { type: "string" },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["username", "password"],
        properties: {
          username: { type: "string" },
          password: { type: "string", format: "password" },
        },
      },
      ProjectInput: {
        type: "object",
        required: ["title", "description"],
        properties: {
          title: { type: "string" },
          description: { type: "string" },
          technologies: { type: "array", items: { type: "string" } },
          githubUrl: { type: "string", format: "uri" },
          liveUrl: { type: "string", format: "uri" },
          imageUrl: { type: "string" },
          featured: { type: "boolean" },
        },
      },
      ProjectUpdateInput: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: { type: "string" },
          technologies: { type: "array", items: { type: "string" } },
          githubUrl: { type: "string", format: "uri" },
          liveUrl: { type: "string", format: "uri" },
          imageUrl: { type: "string" },
          featured: { type: "boolean" },
        },
      },
      ExperienceInput: {
        type: "object",
        required: ["company", "role", "description", "startDate", "technologies"],
        properties: {
          company: { type: "string" },
          role: { type: "string" },
          description: { type: "string" },
          startDate: { type: "string" },
          endDate: { type: "string" },
          technologies: { type: "array", items: { type: "string" } },
          current: { type: "boolean" },
        },
      },
      ExperienceUpdateInput: {
        type: "object",
        properties: {
          company: { type: "string" },
          role: { type: "string" },
          description: { type: "string" },
          startDate: { type: "string" },
          endDate: { type: "string" },
          technologies: { type: "array", items: { type: "string" } },
          current: { type: "boolean" },
        },
      },
      EducationInput: {
        type: "object",
        required: ["institution", "course", "description", "skills", "startDate"],
        properties: {
          institution: { type: "string" },
          course: { type: "string" },
          description: { type: "string" },
          skills: { type: "array", items: { type: "string" } },
          startDate: { type: "string" },
          endDate: { type: "string" },
          logoUrl: { type: "string" },
        },
      },
      EducationUpdateInput: {
        type: "object",
        properties: {
          institution: { type: "string" },
          course: { type: "string" },
          description: { type: "string" },
          skills: { type: "array", items: { type: "string" } },
          startDate: { type: "string" },
          endDate: { type: "string" },
          logoUrl: { type: "string" },
        },
      },
      SkillInput: {
        type: "object",
        required: ["skill", "description"],
        properties: {
          skill: { type: "string" },
          description: { type: "string" },
        },
      },
      SkillUpdateInput: {
        type: "object",
        properties: {
          skill: { type: "string" },
          description: { type: "string" },
        },
      },
      CertificationInput: {
        type: "object",
        required: ["certSource", "certTitle", "description"],
        properties: {
          certSource: { type: "string" },
          certTitle: { type: "string" },
          description: { type: "string" },
          certLink: { type: "string", format: "uri" },
          imageUrl: { type: "string" },
        },
      },
      CertificationUpdateInput: {
        type: "object",
        properties: {
          certSource: { type: "string" },
          certTitle: { type: "string" },
          description: { type: "string" },
          certLink: { type: "string", format: "uri" },
          imageUrl: { type: "string" },
        },
      },
      ServiceInput: {
        type: "object",
        required: ["title", "description", "icon"],
        properties: {
          title: { type: "string" },
          description: { type: "string" },
          features: { type: "array", items: { type: "string" } },
          icon: { type: "string" },
        },
      },
      ServiceUpdateInput: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: { type: "string" },
          features: { type: "array", items: { type: "string" } },
          icon: { type: "string" },
        },
      },
      ContactMessageInput: {
        type: "object",
        required: ["name", "email", "message"],
        properties: {
          name: { type: "string", maxLength: 100 },
          email: { type: "string", format: "email", maxLength: 254 },
          message: { type: "string", maxLength: 5000 },
        },
      },
    },
  },
} as const;
