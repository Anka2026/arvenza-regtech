import type { Locale } from "@/i18n/routing";

export type IndustrySectorKey =
  | "steelAluminium"
  | "automotive"
  | "packagingFmcg"
  | "electronicsBatteries"
  | "agricultureFood"
  | "importersExporters";

export type IndustryNavKey =
  | "steelAluminium"
  | "automotive"
  | "packagingFmcg"
  | "electronics"
  | "agriculture"
  | "importers";

const INDUSTRY_SECTOR_ANCHORS: Record<Locale, Record<IndustrySectorKey, string>> = {
  en: {
    steelAluminium: "steel-aluminium",
    automotive: "automotive",
    packagingFmcg: "packaging-fmcg",
    electronicsBatteries: "electronics-batteries",
    agricultureFood: "agriculture-food",
    importersExporters: "importers-exporters",
  },
  tr: {
    steelAluminium: "celik-aluminyum",
    automotive: "otomotiv",
    packagingFmcg: "ambalaj-tuketim",
    electronicsBatteries: "elektronik-piller",
    agricultureFood: "tarim-gida",
    importersExporters: "ithalatci-ihracatci",
  },
  nl: {
    steelAluminium: "staal-aluminium",
    automotive: "automotive",
    packagingFmcg: "verpakking-fmcg",
    electronicsBatteries: "elektronica-batterijen",
    agricultureFood: "landbouw-voeding",
    importersExporters: "importeurs-exporteurs",
  },
};

const NAV_TO_SECTOR: Record<IndustryNavKey, IndustrySectorKey> = {
  steelAluminium: "steelAluminium",
  automotive: "automotive",
  packagingFmcg: "packagingFmcg",
  electronics: "electronicsBatteries",
  agriculture: "agricultureFood",
  importers: "importersExporters",
};

export function industrySectorAnchor(
  locale: Locale,
  sectorKey: IndustrySectorKey
): string {
  return INDUSTRY_SECTOR_ANCHORS[locale][sectorKey];
}

export function industrySectorHref(
  locale: Locale,
  sectorKey: IndustrySectorKey
): `/industries#${string}` {
  return `/industries#${industrySectorAnchor(locale, sectorKey)}`;
}

export function industryNavHref(
  locale: Locale,
  navKey: IndustryNavKey
): `/industries#${string}` {
  return industrySectorHref(locale, NAV_TO_SECTOR[navKey]);
}
