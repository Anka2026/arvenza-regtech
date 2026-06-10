"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Linkedin } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { SafeImage } from "@/components/ui/safe-image";
import {
  isValidExternalUrl,
  LEADERSHIP_PORTRAIT_CANDIDATES,
} from "@/lib/company-leadership";
import { cn } from "@/lib/utils";

const BODY_KEYS = ["paragraph1", "paragraph2", "paragraph3"] as const;

function useLeadershipPortrait(): string | null {
  const [portraitSrc, setPortraitSrc] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      for (const src of LEADERSHIP_PORTRAIT_CANDIDATES) {
        try {
          const res = await fetch(src, { method: "HEAD" });
          if (!cancelled && res.ok) {
            setPortraitSrc(src);
            return;
          }
        } catch {
          /* try next candidate */
        }
      }
      if (!cancelled) setPortraitSrc(null);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return portraitSrc;
}

export function CompanyLeadershipSection() {
  const t = useTranslations("companyPage.leadership");
  const portraitSrc = useLeadershipPortrait();
  const linkedInUrl = t("linkedinUrl");
  const showLinkedIn = isValidExternalUrl(linkedInUrl);

  return (
    <FadeIn staticReveal>
      <section
        className="company-leadership-panel"
        aria-labelledby="company-leadership-heading"
      >
        <div className="company-leadership-panel-glow" aria-hidden="true" />

        <div className="relative min-w-0">
          <p className="eyebrow-pill">{t("eyebrow")}</p>
          <h2
            id="company-leadership-heading"
            className="mt-3 text-[clamp(1.25rem,1.75vw+0.5rem,1.75rem)] font-bold tracking-[-0.02em] text-[#071225]"
          >
            {t("title")}
          </h2>

          <div
            className={cn(
              "company-leadership-grid mt-6 lg:mt-7",
              portraitSrc && "company-leadership-grid-with-portrait"
            )}
          >
            {portraitSrc ? (
              <figure className="company-leadership-portrait mx-auto w-full max-w-[280px] lg:mx-0 lg:max-w-none">
                <div className="company-leadership-portrait-frame">
                  <SafeImage
                    src={portraitSrc}
                    alt={t("portraitAlt")}
                    width={440}
                    height={520}
                    className="company-leadership-portrait-image h-full w-full"
                    objectFit="cover"
                    objectPosition="center top"
                  />
                </div>
              </figure>
            ) : null}

            <div className="company-leadership-narrative min-w-0">
              <p className="company-leadership-name">{t("name")}</p>
              <p className="company-leadership-role">{t("role")}</p>
              <div className="company-leadership-body mt-4 space-y-3">
                {BODY_KEYS.map((key) => (
                  <p key={key} className="text-sm leading-relaxed text-[#475569] lg:text-[15px]">
                    {t(`body.${key}`)}
                  </p>
                ))}
              </div>
              {showLinkedIn ? (
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="company-leadership-linkedin mt-5 inline-flex"
                >
                  <Linkedin className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {t("linkedinLabel")}
                </a>
              ) : null}
            </div>

            <blockquote className="company-leadership-quote">
              <p className="company-leadership-quote-text">&ldquo;{t("quote")}&rdquo;</p>
              <footer className="company-leadership-quote-attribution">{t("quoteAttribution")}</footer>
            </blockquote>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
