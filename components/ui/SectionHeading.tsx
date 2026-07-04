import Reveal from "./Reveal";

/**
 * SectionHeading — kicker + display title + optional lede,
 * keeping every section's typography rhythm identical.
 */
export default function SectionHeading({
  kicker,
  title,
  goldWord,
  lede,
  align = "center",
}: {
  kicker: string;
  title: string;
  goldWord?: string; // word(s) inside `title` rendered with gold shimmer
  lede?: string;
  align?: "center" | "left";
}) {
  const renderTitle = () => {
    if (!goldWord || !title.includes(goldWord)) return title;
    const [before, after] = title.split(goldWord);
    return (
      <>
        {before}
        <span className="text-gold-shimmer">{goldWord}</span>
        {after}
      </>
    );
  };

  return (
    <div className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}>
      <Reveal variant="blur">
        <span className={`section-kicker ${align === "center" ? "justify-center" : ""}`}>
          {kicker}
        </span>
      </Reveal>
      <Reveal variant="up" delay={0.08}>
        <h2 className="section-title">{renderTitle()}</h2>
      </Reveal>
      {lede && (
        <Reveal variant="up" delay={0.18}>
          <p
            className={`mt-6 max-w-2xl text-lg leading-relaxed text-mist ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}
