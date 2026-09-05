import Image from "next/image";
import type { ReactNode } from "react";

type TitleHeroProps = {
  kicker: string;
  title: string;
  description: string;
  desktopImage: string;
  mobileImage: string;
  alt: string;
  children?: ReactNode;
  priority?: boolean;
};

export function TitleHero({ kicker, title, description, desktopImage, mobileImage, alt, children, priority = false }: TitleHeroProps) {
  return (
    <header className="title-hero">
      <div className="title-hero-media" aria-hidden="true">
        <Image className="title-hero-image title-hero-image-desktop" src={desktopImage} alt="" fill priority={priority} sizes="(max-width: 760px) 1px, 100vw" />
        <Image className="title-hero-image title-hero-image-mobile" src={mobileImage} alt="" fill priority={priority} sizes="(max-width: 760px) 100vw, 1px" />
      </div>
      <div className="title-hero-shade" />
      <div className="container title-hero-content">
        <div className="title-hero-copy">
          <span className="kicker light">{kicker}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          {children ? <div className="title-hero-actions">{children}</div> : null}
        </div>
        <span className="sr-only">{alt}</span>
      </div>
    </header>
  );
}
