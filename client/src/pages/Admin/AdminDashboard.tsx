import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import { isAxiosError, isCancel } from "axios";
import { toast } from "sonner";
import {
  ExternalLink,
  ImagePlus,
  LoaderCircle,
  LogOut,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import ThemeToggle from "@/components/ThemeToggle";
import ContactInbox from "@/components/admin/ContactInbox";
import { getCurrentUser, logout } from "../../Services/auth.service";
import { getImageUrl, uploadImage } from "../../Services/upload.service";
import api from "../../lib/api";

type FieldKind = "text" | "textarea" | "list" | "boolean" | "image";

interface AdminField {
  name: string;
  label: string;
  kind: FieldKind;
  required?: boolean;
}

interface CollectionConfig {
  id: string;
  title: string;
  itemLabel: string;
  endpoint: string;
  displayField: string;
  fields: AdminField[];
}

interface ContentRecord {
  _id: string;
  [key: string]: unknown;
}

interface CollectionResponse {
  success: boolean;
  count?: number;
  data: ContentRecord[] | ContentRecord;
}

type FieldValue = string | boolean;
type EditorValues = Record<string, FieldValue>;

const collections: CollectionConfig[] = [
  {
    id: "projects",
    title: "Projects",
    itemLabel: "Project",
    endpoint: "/projects",
    displayField: "title",
    fields: [
      { name: "title", label: "Title", kind: "text", required: true },
      {
        name: "description",
        label: "Description",
        kind: "textarea",
        required: true,
      },
      {
        name: "technologies",
        label: "Technologies (comma separated)",
        kind: "list",
      },
      { name: "githubUrl", label: "GitHub URL", kind: "text" },
      { name: "liveUrl", label: "Live demo URL", kind: "text" },
      { name: "imageUrl", label: "Project image", kind: "image" },
      { name: "featured", label: "Featured project", kind: "boolean" },
    ],
  },
  {
    id: "experience",
    title: "Experience",
    itemLabel: "Experience",
    endpoint: "/experience",
    displayField: "role",
    fields: [
      { name: "company", label: "Company", kind: "text", required: true },
      { name: "role", label: "Role", kind: "text", required: true },
      {
        name: "description",
        label: "Description",
        kind: "textarea",
        required: true,
      },
      { name: "startDate", label: "Start date", kind: "text", required: true },
      { name: "endDate", label: "End date", kind: "text" },
      {
        name: "technologies",
        label: "Technologies (comma separated)",
        kind: "list",
        required: true,
      },
      { name: "current", label: "Current role", kind: "boolean" },
    ],
  },
  {
    id: "education",
    title: "Education",
    itemLabel: "Education",
    endpoint: "/education",
    displayField: "course",
    fields: [
      {
        name: "institution",
        label: "Institution",
        kind: "text",
        required: true,
      },
      { name: "course", label: "Course", kind: "text", required: true },
      {
        name: "description",
        label: "Description",
        kind: "textarea",
        required: true,
      },
      {
        name: "skills",
        label: "Skills (comma separated)",
        kind: "list",
        required: true,
      },
      { name: "startDate", label: "Start date", kind: "text", required: true },
      { name: "endDate", label: "End date", kind: "text" },
      { name: "logoUrl", label: "Institution logo", kind: "image" },
    ],
  },
  {
    id: "certifications",
    title: "Certifications",
    itemLabel: "Certification",
    endpoint: "/certificate",
    displayField: "certTitle",
    fields: [
      {
        name: "certTitle",
        label: "Certificate title",
        kind: "text",
        required: true,
      },
      {
        name: "certSource",
        label: "Issuing institution",
        kind: "text",
        required: true,
      },
      {
        name: "description",
        label: "Description",
        kind: "textarea",
        required: true,
      },
      { name: "certLink", label: "Certificate URL", kind: "text" },
      { name: "imageUrl", label: "Certificate image", kind: "image" },
    ],
  },
  {
    id: "skills",
    title: "Skills",
    itemLabel: "Skill",
    endpoint: "/skill",
    displayField: "skill",
    fields: [
      { name: "skill", label: "Skill", kind: "text", required: true },
      {
        name: "description",
        label: "Description",
        kind: "textarea",
        required: true,
      },
    ],
  },
  {
    id: "services",
    title: "Services",
    itemLabel: "Service",
    endpoint: "/services",
    displayField: "title",
    fields: [
      { name: "title", label: "Service title", kind: "text", required: true },
      {
        name: "description",
        label: "Description",
        kind: "textarea",
        required: true,
      },
      {
        name: "features",
        label: "Features (comma separated)",
        kind: "list",
        required: true,
      },
      {
        name: "icon",
        label: "Icon (emoji or short text)",
        kind: "text",
        required: true,
      },
    ],
  },
];

const errorMessage = (error: unknown): string => {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data.message ?? error.message;
  }

  return error instanceof Error
    ? error.message
    : "An unexpected error occurred";
};

const emptyValues = (config: CollectionConfig): EditorValues =>
  Object.fromEntries(
    config.fields.map((field) => [
      field.name,
      field.kind === "boolean" ? false : "",
    ]),
  );

const valuesFromRecord = (
  config: CollectionConfig,
  record: ContentRecord,
): EditorValues =>
  Object.fromEntries(
    config.fields.map((field) => {
      const value = record[field.name];
      if (field.kind === "boolean") {
        return [field.name, value === true];
      }
      if (field.kind === "list") {
        return [
          field.name,
          Array.isArray(value)
            ? value.filter((item) => typeof item === "string").join(", ")
            : "",
        ];
      }
      return [field.name, typeof value === "string" ? value : ""];
    }),
  );

function ContentManager({
  collectionId,
  onCollectionChange,
  onCountChange,
}: {
  collectionId: string;
  onCollectionChange: (id: string) => void;
  onCountChange: (id: string, count: number) => void;
}) {
  const [records, setRecords] = useState<ContentRecord[]>([]);
  const [values, setValues] = useState<EditorValues>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [error, setError] = useState("");
  const config = useMemo(
    () =>
      collections.find((item) => item.id === collectionId) ?? collections[0],
    [collectionId],
  );

  const loadRecords = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await api.get<CollectionResponse>(config.endpoint, {
        signal,
      });
      if (!Array.isArray(response.data.data)) {
        throw new Error(`Unexpected ${config.title.toLowerCase()} response`);
      }
      setRecords(response.data.data);
      onCountChange(config.id, response.data.data.length);
    } catch (loadError) {
      if (isCancel(loadError)) return;
      setError(
        `Could not load ${config.title.toLowerCase()}: ${errorMessage(loadError)}`,
      );
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, [config, onCountChange]);

  useEffect(() => {
    const controller = new AbortController();
    void Promise.resolve().then(() => loadRecords(controller.signal));
    return () => controller.abort();
  }, [loadRecords]);

  const startNew = () => {
    setEditingId(null);
    setValues(emptyValues(config));
    setError("");
  };

  const editRecord = (record: ContentRecord) => {
    setEditingId(record._id);
    setValues(valuesFromRecord(config, record));
    setError("");
  };

  const updateValue = (name: string, value: FieldValue) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleImageUpload = async (
    fieldName: string,
    file: File | undefined,
  ) => {
    if (!file) return;
    setUploadingField(fieldName);
    setError("");
    try {
      const imagePath = await uploadImage(file);
      updateValue(fieldName, imagePath);
    } catch (uploadError) {
      setError(`Image upload failed: ${errorMessage(uploadError)}`);
    } finally {
      setUploadingField(null);
    }
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    const payload: Record<string, unknown> = {};
    for (const field of config.fields) {
      const value = values[field.name];
      if (field.kind === "boolean") {
        payload[field.name] = value === true;
      } else if (field.kind === "list") {
        payload[field.name] =
          typeof value === "string"
            ? value
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
            : [];
      } else {
        payload[field.name] = value ?? "";
      }
    }

    try {
      if (editingId) {
        await api.patch(`${config.endpoint}/${editingId}`, payload);
      } else {
        await api.post(config.endpoint, payload);
      }
      setLoading(true);
      await loadRecords();
      startNew();
    } catch (saveError) {
      setError(
        `Could not save ${config.title.toLowerCase()}: ${errorMessage(saveError)}`,
      );
    } finally {
      setSaving(false);
    }
  };

  const removeRecord = async (record: ContentRecord) => {
    const displayValue = record[config.displayField];
    const name = typeof displayValue === "string" ? displayValue : config.title;
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;

    setError("");
    try {
      await api.delete(`${config.endpoint}/${record._id}`);
      if (editingId === record._id) startNew();
      setLoading(true);
      await loadRecords();
    } catch (deleteError) {
      setError(
        `Could not delete ${config.title.toLowerCase()}: ${errorMessage(deleteError)}`,
      );
    }
  };

  return (
    <section
      id="manager"
      className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,0.85fr)]"
    >
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Portfolio content</CardTitle>
            <CardDescription>
              Manage the records shown on your public portfolio.
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              aria-label="Choose content type"
              value={collectionId}
              onChange={(event) => {
                const nextCollection = collections.find(
                  (item) => item.id === event.target.value,
                );
                if (!nextCollection) return;
                onCollectionChange(nextCollection.id);
                setEditingId(null);
                setValues(emptyValues(nextCollection));
              }}
              className="h-9 rounded-lg border border-input bg-background px-3 text-sm"
            >
              {collections.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
            <Button type="button" onClick={startNew}>
              <Plus />
              New
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <p
              role="alert"
              className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
            >
              {error}
            </p>
          )}
          {loading ? (
            <div className="flex items-center gap-2 py-8 text-sm text-muted-foreground">
              <LoaderCircle className="size-4 animate-spin" />
              Loading {config.title.toLowerCase()}...
            </div>
          ) : records.length === 0 ? (
            <div className="rounded-xl border border-dashed p-8 text-center">
              <p className="font-medium">No {config.title.toLowerCase()} yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Create the first entry to show it on your portfolio.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {records.map((record) => {
                const displayValue = record[config.displayField];
                const title =
                  typeof displayValue === "string"
                    ? displayValue
                    : config.title;
                const secondary =
                  typeof record.description === "string"
                    ? record.description
                    : typeof record.company === "string"
                      ? record.company
                      : "";

                return (
                  <div
                    key={record._id}
                    className="flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <button
                      type="button"
                      onClick={() => editRecord(record)}
                      className="min-w-0 text-left"
                    >
                      <span className="block truncate font-medium">
                        {title}
                      </span>
                      {secondary && (
                        <span className="mt-1 block line-clamp-2 text-sm text-muted-foreground">
                          {secondary}
                        </span>
                      )}
                    </button>
                    <div className="flex shrink-0 gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => editRecord(record)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        aria-label={`Delete ${title}`}
                        onClick={() => void removeRecord(record)}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {editingId ? `Edit ${config.itemLabel}` : `Add ${config.itemLabel}`}
          </CardTitle>
          <CardDescription>
            Changes are saved directly to the portfolio API.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            {config.fields.map((field) => {
              const value = values[field.name];

              if (field.kind === "boolean") {
                return (
                  <label
                    key={field.name}
                    className="flex items-center gap-3 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={value === true}
                      onChange={(event) =>
                        updateValue(field.name, event.target.checked)
                      }
                      className="size-4 accent-primary"
                    />
                    {field.label}
                  </label>
                );
              }

              return (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={`field-${field.name}`}>{field.label}</Label>
                  {field.kind === "textarea" ? (
                    <textarea
                      id={`field-${field.name}`}
                      required={field.required}
                      value={typeof value === "string" ? value : ""}
                      onChange={(event) =>
                        updateValue(field.name, event.target.value)
                      }
                      className="min-h-24 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  ) : field.kind === "image" ? (
                    <div className="space-y-3">
                      <Input
                        id={`field-${field.name}`}
                        type="url"
                        placeholder="Paste an image URL or upload an image"
                        value={typeof value === "string" ? value : ""}
                        onChange={(event) =>
                          updateValue(field.name, event.target.value)
                        }
                      />
                      <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                        {uploadingField === field.name ? (
                          <LoaderCircle className="size-4 animate-spin" />
                        ) : (
                          <ImagePlus className="size-4" />
                        )}
                        {uploadingField === field.name
                          ? "Uploading image..."
                          : "Upload image (JPEG, PNG, GIF, WebP or AVIF; max 5 MB)"}
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/gif,image/webp,image/avif"
                          className="sr-only"
                          disabled={uploadingField !== null}
                          onChange={(event) => {
                            void handleImageUpload(
                              field.name,
                              event.target.files?.[0],
                            );
                            event.currentTarget.value = "";
                          }}
                        />
                      </label>
                      {typeof value === "string" && value && (
                        <img
                          src={getImageUrl(value)}
                          alt={`${field.label} preview`}
                          className="max-h-40 rounded-lg border object-contain"
                        />
                      )}
                    </div>
                  ) : (
                    <Input
                      id={`field-${field.name}`}
                      type="text"
                      required={field.required}
                      value={typeof value === "string" ? value : ""}
                      onChange={(event) =>
                        updateValue(field.name, event.target.value)
                      }
                    />
                  )}
                </div>
              );
            })}
            <div className="flex flex-wrap gap-2 pt-2">
              <Button
                type="submit"
                disabled={saving || uploadingField !== null}
              >
                {saving ? <LoaderCircle className="animate-spin" /> : <Save />}
                {saving ? "Saving..." : "Save changes"}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={startNew}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

export default function AdminDashboard() {
  const [selectedSection, setSelectedSection] = useState(collections[0].id);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const updateCount = useCallback((id: string, count: number) => {
    setCounts((current) => ({ ...current, [id]: count }));
  }, []);

  useEffect(() => {
    let active = true;

    const initialize = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (!active) return;
        if (currentUser.role !== "admin") {
          window.location.replace("/admin/login");
          return;
        }
        if (sessionStorage.getItem("dashboard-login-toast") === "true") {
          sessionStorage.removeItem("dashboard-login-toast");
          toast.success("Welcome back, Shem!", {
            description: "You’re signed in to your portfolio dashboard.",
          });
        }

        const results = await Promise.all(
          collections.map(async (config) => {
            const response = await api.get<CollectionResponse>(config.endpoint);
            if (!Array.isArray(response.data.data)) {
              throw new Error(
                `Unexpected ${config.title.toLowerCase()} response`,
              );
            }
            return [config.id, response.data.data.length] as const;
          }),
        );
        if (active) setCounts(Object.fromEntries(results));
      } catch (dashboardError) {
        if (!active) return;
        if (
          isAxiosError(dashboardError) &&
          dashboardError.response?.status === 401
        ) {
          window.location.replace("/admin/login");
          return;
        }
        setError(
          `Unable to load dashboard data: ${errorMessage(dashboardError)}`,
        );
      } finally {
        if (active) setLoading(false);
      }
    };

    void initialize();
    return () => {
      active = false;
    };
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    setError("");
    try {
      await logout();
      window.location.assign("/admin/login");
    } catch (logoutError) {
      setError(`Could not sign out: ${errorMessage(logoutError)}`);
      setLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center gap-3 bg-background">
        <LoaderCircle className="size-5 animate-spin" />
        <span>Loading admin dashboard...</span>
      </main>
    );
  }

  return (
    <TooltipProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 64)",
            "--header-height": "calc(var(--spacing) * 14)",
          } as CSSProperties
        }
      >
        <AppSidebar
          variant="inset"
          userName="Shem Ndaro"
          selectedSection={selectedSection}
          onSectionChange={setSelectedSection}
        />
        <SidebarInset>
          <header className="flex min-h-(--header-height) shrink-0 items-center justify-between gap-2 border-b px-3 py-2 sm:gap-3 sm:px-4 lg:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <SidebarTrigger className="shrink-0" />
              <Separator orientation="vertical" className="h-5" />
              <div className="min-w-0">
                <h1 className="truncate text-base font-semibold">
                  Portfolio dashboard
                </h1>
                <p className="hidden text-xs text-muted-foreground sm:block">
                  Manage the content displayed on your public site
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              <ThemeToggle />
              <Button asChild variant="outline" size="sm">
                <a href="/" target="_blank" rel="noreferrer">
                  <ExternalLink />
                  <span className="hidden sm:inline">View portfolio</span>
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={loggingOut}
                onClick={() => void handleLogout()}
              >
                {loggingOut ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <LogOut />
                )}
                <span className="hidden sm:inline">Sign out</span>
              </Button>
            </div>
          </header>
          <main className="min-w-0 flex-1 space-y-6 bg-muted/30 p-4 lg:p-6">
            {error && (
              <p
                role="alert"
                className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
              >
                {error}
              </p>
            )}
            <section id="overview" className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Welcome back
                </h2>
                <p className="text-sm text-muted-foreground">
                  Your portfolio content at a glance.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {collections.map((config) => (
                  <Card key={config.id} size="sm">
                    <CardHeader className="pb-2">
                      <CardDescription>{config.title}</CardDescription>
                      <CardTitle className="text-3xl">
                        {counts[config.id] ?? 0}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      Published entries
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
            {selectedSection === "messages" ? (
              <ContactInbox />
            ) : (
              <ContentManager
                key={selectedSection}
                collectionId={selectedSection}
                onCollectionChange={setSelectedSection}
                onCountChange={updateCount}
              />
            )}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
