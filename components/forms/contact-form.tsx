"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  namespace?: "contact" | "demo";
  variant?: "default" | "premium";
  className?: string;
}

export function ContactForm({ namespace = "contact", variant = "default", className }: ContactFormProps) {
  const t = useTranslations(namespace);
  const tCommon = useTranslations("common");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const newErrors: Record<string, string> = {};

    const name = data.get("name") as string;
    const email = data.get("email") as string;

    if (!name?.trim()) newErrors.name = tCommon("errorRequired");
    if (!email?.trim()) {
      newErrors.email = tCommon("errorRequired");
    } else if (!validateEmail(email)) {
      newErrors.email = tCommon("errorEmail");
    }

    if (namespace === "contact") {
      const message = data.get("message") as string;
      if (!message?.trim()) newErrors.message = tCommon("errorRequired");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className={cn(
          variant === "premium" ? "demo-form-card" : "surface-card",
          "flex flex-col items-center p-10 text-center sm:p-12",
          className
        )}
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="mb-4 h-12 w-12 text-emerald-500" aria-hidden="true" />
        <h3 className="text-xl font-semibold text-navy">
          {t("form.successTitle")}
        </h3>
        <p className="body-sm mt-2">{t("form.successMessage")}</p>
      </div>
    );
  }

  const isPremium = variant === "premium" && namespace === "demo";

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(isPremium ? "demo-form-card" : "surface-card", "p-6 sm:p-8", className)}
      noValidate
      aria-label={namespace === "demo" ? t("hero.title") : t("hero.title")}
    >
      <div className={cn("grid gap-5", isPremium ? "sm:grid-cols-2 sm:gap-x-5 sm:gap-y-4" : "sm:grid-cols-2")}>
        <div className="space-y-2">
          <Label htmlFor={`${namespace}-name`}>{t("form.name")}</Label>
          <Input
            id={`${namespace}-name`}
            name="name"
            placeholder={t("form.namePlaceholder")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${namespace}-name-error` : undefined}
            autoComplete="name"
          />
          {errors.name && (
            <p id={`${namespace}-name-error`} className="text-xs text-destructive" role="alert">
              {errors.name}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${namespace}-email`}>{t("form.email")}</Label>
          <Input
            id={`${namespace}-email`}
            name="email"
            type="email"
            placeholder={t("form.emailPlaceholder")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${namespace}-email-error` : undefined}
            autoComplete="email"
          />
          {errors.email && (
            <p id={`${namespace}-email-error`} className="text-xs text-destructive" role="alert">
              {errors.email}
            </p>
          )}
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor={`${namespace}-company`}>{t("form.company")}</Label>
          <Input
            id={`${namespace}-company`}
            name="company"
            placeholder={t("form.companyPlaceholder")}
            autoComplete="organization"
          />
        </div>

        {namespace === "contact" && (
          <>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor={`${namespace}-subject`}>{t("form.subject")}</Label>
              <Input
                id={`${namespace}-subject`}
                name="subject"
                placeholder={t("form.subjectPlaceholder")}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor={`${namespace}-message`}>{t("form.message")}</Label>
              <Textarea
                id={`${namespace}-message`}
                name="message"
                placeholder={t("form.messagePlaceholder")}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? `${namespace}-message-error` : undefined}
              />
              {errors.message && (
                <p id={`${namespace}-message-error`} className="text-xs text-destructive" role="alert">
                  {errors.message}
                </p>
              )}
            </div>
          </>
        )}

        {namespace === "demo" && (
          <>
            <div className="space-y-2">
              <Label htmlFor={`${namespace}-country`}>{t("form.country")}</Label>
              <select
                id={`${namespace}-country`}
                name="country"
                className="form-field"
                defaultValue=""
              >
                <option value="" disabled>
                  {t("form.countryPlaceholder")}
                </option>
                {(
                  ["nl", "tr", "de", "fr", "be", "it", "es", "uk", "us", "other"] as const
                ).map((c) => (
                  <option key={c} value={c}>
                    {t(`form.countries.${c}`)}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${namespace}-interest`}>{t("form.interest")}</Label>
              <select
                id={`${namespace}-interest`}
                name="interest"
                className="form-field"
                defaultValue=""
              >
                <option value="" disabled>
                  {t("form.interestPlaceholder")}
                </option>
                {(
                  ["cbam", "ppwr", "eudr", "dpp", "supplier", "esg", "general"] as const
                ).map((i) => (
                  <option key={i} value={i}>
                    {t(`form.interests.${i}`)}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor={`${namespace}-message`}>{t("form.message")}</Label>
              <Textarea
                id={`${namespace}-message`}
                name="message"
                placeholder={t("form.messagePlaceholder")}
                className={isPremium ? "demo-form-textarea min-h-[140px]" : undefined}
              />
            </div>
          </>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className={cn(
          "mt-6 w-full sm:w-auto",
          isPremium && "demo-form-submit px-8 shadow-btn-gradient hover:shadow-btn-gradient-hover"
        )}
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? tCommon("submitting") : t("form.submit")}
      </Button>
    </form>
  );
}
