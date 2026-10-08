import type { Certificate } from "../../types/certificate";
import { getImageUrl } from "../../Services/upload.service";

interface CertificationCardProps {
  certificate: Certificate;
}

export default function CertificationCard({
  certificate,
}: CertificationCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-lg shadow-black/5 transition-transform hover:-translate-y-1">
      {certificate.imageUrl && (
        <img
          src={getImageUrl(certificate.imageUrl)}
          alt={certificate.certTitle}
          className="mb-5 h-40 w-full rounded-xl object-cover"
        />
      )}

      <div className="mb-4">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          {certificate.certSource}
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-foreground">
          {certificate.certTitle}
        </h3>
      </div>

      <p className="text-base leading-7 text-muted-foreground">
        {certificate.description}
      </p>

      {certificate.certLink && (
        <div className="mt-6">
          <a
            href={certificate.certLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-primary/30 bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition hover:bg-accent/80"
          >
            View Certificate
          </a>
        </div>
      )}
    </article>
  );
}
