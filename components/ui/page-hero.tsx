"use client";

import { FadeIn } from "@/components/ui/fade-in";
import { Eyebrow } from "@/components/ui/section";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section
      aria-labelledby="page-hero-heading"
      className="border-b border-border bg-gradient-section-fade pt-28 pb-14 md:pt-36 md:pb-16"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          {eyebrow && (
            <div className="mb-4">
              <div className="accent-bar" aria-hidden="true" />
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
          )}
          <h1
            id="page-hero-heading"
            className="heading-hero max-w-3xl text-4xl text-balance sm:text-5xl"
          >
            {title}
          </h1>
          {description && (
            <p className="body-lead mt-5 max-w-2xl">{description}</p>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
