type PageHeroProps = {
  title: React.ReactNode;
  description: string;
};

export function PageHero({ title, description }: PageHeroProps) {
  return (
    <section className="hero px-6 pt-36 pb-16 text-center">
      <div className="reveal relative z-10 mx-auto max-w-3xl">
        <h1 className="display-1 balance mt-5 mb-6">{title}</h1>
        <p className="lede balance mx-auto max-w-xl">{description}</p>
      </div>
    </section>
  );
}
