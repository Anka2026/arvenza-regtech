"use client";

import { CbamFeatureBlock } from "@/components/sections/cbam-feature-block";

export function EvidenceBlock() {
  return (
    <CbamFeatureBlock
      id="evidence"
      namespace="home.evidence"
      visual={{ type: "evidencePack" }}
      variant="light"
      bulletCount={6}
    />
  );
}
