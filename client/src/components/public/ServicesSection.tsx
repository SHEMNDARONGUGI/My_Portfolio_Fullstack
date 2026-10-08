import { useEffect, useState } from "react";
import { getServices } from "../../Services/service.service";
import type { ServiceItem } from "../../types/service";

export default function ServicesSection() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setServices(await getServices());
      } catch (error) {
        console.error(error);
        setError("Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <p className="text-primary">Loading services...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <section id="services" className="px-4 py-10 md:px-8">
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
          What I Offer
        </p>
        <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
          Services
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <article
            key={service._id}
            className="rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-lg shadow-black/5 transition-transform hover:-translate-y-1"
          >
            <div className="mb-4 text-3xl" aria-hidden="true">
              {service.icon}
            </div>
            <h3 className="text-2xl font-semibold text-foreground">
              {service.title}
            </h3>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              {service.description}
            </p>

            {service.features.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full bg-muted px-3 py-1 text-sm text-tag-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
