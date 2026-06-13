"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

function CbamCnScopeCheckerSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("cn-scope-checker", className)}
      aria-hidden="true"
    >
      <div className="cn-scope-checker-panel min-h-[12rem] animate-pulse bg-[#f8fafc]/80" />
    </div>
  );
}

export const CbamCnScopeCheckerLazy = dynamic(
  () =>
    import("@/components/tools/cbam-cn-scope-checker").then((mod) => ({
      default: mod.CbamCnScopeChecker,
    })),
  {
    ssr: false,
    loading: () => <CbamCnScopeCheckerSkeleton />,
  }
);
