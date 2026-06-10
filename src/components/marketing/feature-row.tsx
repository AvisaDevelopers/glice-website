import Image from "next/image";

type FeatureRowProps = {
  reverse?: boolean;
  icon: string;
  title: string;
  description: string;
  bullets: readonly string[];
  image: string;
  imageAlt: string;
};

export function FeatureRow({
  reverse,
  icon,
  title,
  description,
  bullets,
  image,
  imageAlt,
}: FeatureRowProps) {
  return (
    <div className={`feat-row reveal${reverse ? " reverse" : ""}`}>
      <div className="feat-copy">
        <div className="step-num mb-6">
          <i className={`${icon} text-xl`} />
        </div>
        <h2 className="display-3 balance mt-4 mb-4">{title}</h2>
        <p className="mb-6 max-w-md leading-relaxed text-textMuted">
          {description}
        </p>
        <ul className="check-list">
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </div>
      <div className="feat-media relative flex justify-center">
        <div className="phone relative">
          <div className="phone-screen">
            <Image src={image} alt={imageAlt} width={300} height={650} loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  );
}
