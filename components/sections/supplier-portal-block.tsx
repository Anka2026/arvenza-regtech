"use client";

import { CbamFeatureBlock } from "@/components/sections/cbam-feature-block";

export function SupplierPortalBlock() {
  return (
    <CbamFeatureBlock
      id="supplier-portal"
      namespace="home.supplierPortal"
      visual={{ type: "supplierWorkflow" }}
      variant="light"
    />
  );
}
