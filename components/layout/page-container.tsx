import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
}

/** Premium layout: 1320–1360px content band */
export function PageContainer({
  children,
  className,
  as: Tag = "div",
}: PageContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[1360px] min-w-0 px-5 sm:px-8 lg:px-10 xl:px-12",
        className
      )}
    >
      {children}
    </Tag>
  );
}

interface FullBleedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  ariaLabelledby?: string;
}

export function FullBleedSection({
  children,
  className,
  id,
  ariaLabelledby,
}: FullBleedSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn("relative isolate w-full overflow-hidden", className)}
    >
      {children}
    </section>
  );
}
