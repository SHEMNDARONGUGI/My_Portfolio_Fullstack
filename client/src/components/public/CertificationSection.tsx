import { useEffect, useState } from "react";
import { getCertificates } from "../../Services/certificate.service";
import type { Certificate } from "../../types/certificate";
import CertificationCard from "./CertificationCard";

export default function CertificationSection() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const data = await getCertificates();
        setCertificates(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load certifications");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  if (loading) {
    return <p className="text-primary">Loading certifications...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <section id="certifications" className="px-4 py-10 md:px-8">
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
          Credentials
        </p>
        <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
          Certifications
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {certificates.map((certificate) => (
          <CertificationCard key={certificate._id} certificate={certificate} />
        ))}
      </div>
    </section>
  );
}
