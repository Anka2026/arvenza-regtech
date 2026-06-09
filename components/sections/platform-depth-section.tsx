"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Section, SectionHeader } from "@/components/ui/section";
import { FadeIn } from "@/components/ui/fade-in";
import { SafeImage } from "@/components/ui/safe-image";
import {
  MODULE_SCREENSHOTS,
  type ModuleScreenshotKey,
} from "@/lib/assets";
import {
  Calculator,
  Monitor,
  TreePine,
  Package,
  Fingerprint,
  Users,
  BarChart3,
  Sprout,
  ArrowUpRight,
} from "lucide-react";

const CBAM_MODULE_KEYS = new Set(["cbamCalc", "cbamConsole"]);

function moduleHref(key: string): "/platform/cbam" | "/platform" {
  return CBAM_MODULE_KEYS.has(key) ? "/platform/cbam" : "/platform";
}
const moduleKeys: {
  key: ModuleScreenshotKey;
  icon: typeof Calculator;
}[] = [
  { key: "cbamCalc", icon: Calculator },
  { key: "cbamConsole", icon: Monitor },
  { key: "eudr", icon: TreePine },
  { key: "ppwr", icon: Package },
  { key: "dpp", icon: Fingerprint },
  { key: "supplier", icon: Users },
  { key: "esg", icon: BarChart3 },
  { key: "agri", icon: Sprout },
];

export function PlatformDepthSection() {
  const t = useTranslations("home.platformDepth");

  return (
    <Section id="modules" ariaLabelledby="modules-heading">
      <FadeIn>
        <SectionHeader
          id="modules-heading"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />
      </FadeIn>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {moduleKeys.map(({ key, icon: Icon }, i) => (
          <FadeIn key={key} delay={i * 0.04}>
            <Link
              href={moduleHref(key)}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-white shadow-soft transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-card-hover"
            >
              <span className="accent-bar" aria-hidden="true" />

              {/* Screenshot preview */}
              <div className="relative aspect-[16/9] overflow-hidden border-b border-border/50 bg-navy-dark">
                <SafeImage
                  src={MODULE_SCREENSHOTS[key]}
                  alt=""
                  fill
                  objectFit="object-top"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-lilac-50/80">
                    <Icon className="h-3.5 w-3.5 text-primary/80" strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <span className="text-[11px] font-semibold tabular-nums text-muted-foreground/35">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mb-2 text-[14px] font-semibold leading-snug text-navy transition-colors group-hover:text-primary">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="body-sm flex-1 text-[12px]">
                  {t(`items.${key}.description`)}
                </p>
                <ArrowUpRight
                  className="mt-4 h-3.5 w-3.5 text-muted-foreground/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                  aria-hidden="true"
                />
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
