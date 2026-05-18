import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  intro,
  meta,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  meta?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line/60">
      <div className="mesh absolute inset-0 -z-10" />
      <div className="mx-auto max-w-7xl px-5 pb-14 pt-14 lg:px-10 lg:pb-20 lg:pt-20">
        <div className="grid items-end gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <span className="chip">
              <span className="size-1.5 rounded-full bg-emerald" />
              {eyebrow}
            </span>
            <h1 className="mt-6 font-serif text-[2.2rem] leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.6rem]">
              {title}
            </h1>
          </div>
          <div className="flex flex-col gap-4">
            {intro && (
              <p className="max-w-md text-lg leading-relaxed text-ink-soft">{intro}</p>
            )}
            {meta}
          </div>
        </div>
        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  );
}
