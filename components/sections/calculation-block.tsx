"use client";

import { CbamFeatureBlock } from "@/components/sections/cbam-feature-block";

export function CalculationBlock() {
  return (
    <CbamFeatureBlock
      id="calculation"
      namespace="home.calculation"
      focus="chart"
      variant="dark"
      imageFirst
    />
  );
}
