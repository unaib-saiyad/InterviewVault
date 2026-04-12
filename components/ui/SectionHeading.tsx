type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  center?: boolean;
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, center = true, className = '' }: SectionHeadingProps) {
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} ${className}`}>
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
    </div>
  );
}
