"use client";

import type { LucideIcon } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface ProductPreviewPlaceholderProps {
  alt: string;
  icon?: LucideIcon;
  className?: string;
}

export function ProductPreviewPlaceholder({
  alt,
  icon: Icon = LayoutDashboard,
  className,
}: ProductPreviewPlaceholderProps) {
  const t = useTranslations("platformModules.shared.previewPlaceholder");

  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#eef1f6] via-white to-[#7c3aed]/[0.06] px-6 py-8 text-center",
        className
      )}
      role="img"
      aria-label={alt}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.12),transparent_55%)]"
        aria-hidden="true"
      />
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-[#dde5f2]">
        <Icon className="h-7 w-7 text-[#7c3aed]/45" aria-hidden="true" />
      </div>
      {t.has("title") && (
        <p className="relative mt-4 text-sm font-semibold text-[#071225]">{t("title")}</p>
      )}
      {t.has("description") && (
        <p className="relative mt-2 max-w-xs text-xs leading-relaxed text-[#64748b] lg:text-sm">
          {t("description")}
        </p>
      )}
    </div>
  );
}
