import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { title?: string };

function IconBase({ title, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden={title ? undefined : true} role={title ? "img" : undefined} {...props}>
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function DoorIcon(props: IconProps) {
  return <IconBase {...props}><path d="M11 42V10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v32" stroke="currentColor" strokeWidth="2.4"/><path d="M17 42V13h16v29M27.5 27h.1" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/><path d="M6 42h36" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/></IconBase>;
}

export function SparkIcon(props: IconProps) {
  return <IconBase {...props}><path d="M24 5c1.7 9.8 5.2 13.3 15 15-9.8 1.7-13.3 5.2-15 15-1.7-9.8-5.2-13.3-15-15 9.8-1.7 13.3-5.2 15-15Z" stroke="currentColor" strokeWidth="2.3"/><path d="M38 32c.7 4 2.1 5.3 6 6-3.9.7-5.3 2-6 6-.7-4-2.1-5.3-6-6 3.9-.7 5.3-2 6-6Z" fill="currentColor"/></IconBase>;
}

export function HeartIcon(props: IconProps) {
  return <IconBase {...props}><path d="M24 40S8 31 8 18.5C8 11 17 8 24 15c7-7 16-4 16 3.5C40 31 24 40 24 40Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round"/></IconBase>;
}

export function GiftIcon(props: IconProps) {
  return <IconBase {...props}><path d="M7 21h34v21H7V21Zm-2-8h38v8H5v-8Z" stroke="currentColor" strokeWidth="2.2"/><path d="M24 13v29M15 13c-6 0-6-8-1-8 4 0 10 8 10 8m9 0c6 0 6-8 1-8-4 0-10 8-10 8" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/></IconBase>;
}

export function CompassIcon(props: IconProps) {
  return <IconBase {...props}><circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.2"/><path d="m31 16-4 11-11 5 5-11 10-5Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/><circle cx="24" cy="24" r="2" fill="currentColor"/></IconBase>;
}

export function CheckIcon(props: IconProps) {
  return <IconBase {...props}><circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.2"/><path d="m15 24 6 6 12-13" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/></IconBase>;
}

export function ArrowIcon(props: IconProps) {
  return <IconBase {...props}><path d="M8 24h30m-10-10 10 10-10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></IconBase>;
}

export function CategoryIcon({ category, ...props }: IconProps & { category: string }) {
  if (category.includes("Beauty") || category.includes("Schmuck")) return <SparkIcon {...props} />;
  if (category.includes("Bücher") || category.includes("Rätsel")) return <CompassIcon {...props} />;
  if (category.includes("Spielzeug") || category.includes("LEGO")) return <GiftIcon {...props} />;
  if (category.includes("Haustiere")) return <HeartIcon {...props} />;
  return <DoorIcon {...props} />;
}
