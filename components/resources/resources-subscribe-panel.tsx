"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { Bell, Check, ClipboardCheck, Mail } from "lucide-react";
import { Link } from "@/i18n/routing";
import { StatusPill } from "@/components/pages/shared/status-pill";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BENEFIT_KEYS = ["item1", "item2", "item3", "item4"] as const;
const CONTACT_EMAIL = "info@ankasustainability.com";

export function ResourcesSubscribePanel() {
  const t = useTranslations("resourcesPage");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="resources-subscribe-stack">
      <div id="lead-magnet" className="resource-lead-magnet scroll-mt-28">
        <div className="resource-lead-magnet-glow" aria-hidden="true" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <div className="resource-lead-icon" aria-hidden="true">
                <ClipboardCheck className="h-5 w-5 text-[#7c3aed]" />
              </div>
              <StatusPill variant="available" label={t("status.available")} />
            </div>
            <h2 className="resource-lead-title">{t("leadMagnet.title")}</h2>
            <p className="resource-lead-desc">{t("leadMagnet.description")}</p>
            <ul className="resource-lead-points mt-4 list-none">
              {BENEFIT_KEYS.slice(0, 2).map((key) => (
                <li key={key} className="resource-lead-point">
                  <Check className="h-3.5 w-3.5 shrink-0 text-[#7c3aed]" aria-hidden="true" />
                  {t(`leadMagnet.highlights.${key}`)}
                </li>
              ))}
            </ul>
          </div>
          <Link
            href="/demo"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "w-full shrink-0 lg:w-auto"
            )}
          >
            {t("leadMagnet.cta")}
          </Link>
        </div>
      </div>

      <div className="resource-subscribe-benefits">
        <div className="flex items-start gap-3">
          <div className="resource-benefits-icon" aria-hidden="true">
            <Bell className="h-5 w-5 text-[#7c3aed]" />
          </div>
          <div className="min-w-0">
            <h2 className="text-[clamp(1.125rem,1.5vw+0.5rem,1.375rem)] font-bold tracking-[-0.02em] text-[#071225]">
              {t("subscribeBenefits.title")}
            </h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {BENEFIT_KEYS.map((key) => (
                <li key={key} className="resource-benefit-item">
                  <span className="resource-value-dot" aria-hidden="true" />
                  {t(`subscribeBenefits.items.${key}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div id="subscribe" className="resource-subscribe-panel scroll-mt-28">
        <div className="resource-subscribe-panel-glow" aria-hidden="true" />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
          <div>
            <div className="resource-subscribe-icon" aria-hidden="true">
              <Mail className="h-5 w-5 text-[#7c3aed]" />
            </div>
            <h2 className="resource-subscribe-title">{t("subscribe.title")}</h2>
            <p className="resource-subscribe-desc">{t("subscribe.description")}</p>
            <p className="resource-contact-note mt-4">
              {t("subscribe.contactPrefix")}{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="resource-contact-link">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>

          <div className="resource-subscribe-form-wrap">
            {submitted ? (
              <p className="resource-subscribe-success" role="status">
                {t("subscribe.success")}
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="resource-subscribe-form">
                <div>
                  <label htmlFor="resource-email" className="resource-form-label">
                    {t("subscribe.emailLabel")}
                  </label>
                  <input
                    id="resource-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="resource-form-input"
                    placeholder={t("subscribe.emailPlaceholder")}
                  />
                </div>
                <div>
                  <label htmlFor="resource-interest" className="resource-form-label">
                    {t("subscribe.interestLabel")}
                  </label>
                  <select
                    id="resource-interest"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="resource-form-input"
                  >
                    <option value="">{t("subscribe.interestPlaceholder")}</option>
                    <option value="cbam">{t("subscribe.interests.cbam")}</option>
                    <option value="ppwr">{t("subscribe.interests.ppwr")}</option>
                    <option value="eudr">{t("subscribe.interests.eudr")}</option>
                    <option value="dpp">{t("subscribe.interests.dpp")}</option>
                    <option value="general">{t("subscribe.interests.general")}</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className={cn(buttonVariants({ variant: "default", size: "lg" }), "w-full sm:w-auto")}
                >
                  {t("subscribe.submit")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
