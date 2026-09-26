/* Section header — premium editorial: quiet index metadata,
   accent kicker, large sans title. Centered variant adds the
   purple/blue underline for ABOUT / SKILLS / PROJECTS / JOURNEY.
   Optional `glitch` wraps the title in an occasional controlled
   chromatic glitch (decorative pseudo-layers; text stays readable
   and is hidden from assistive tech with an sr-only fallback). */
export default function SectionHeader({ index, title, lede, kicker, centered = false, glitch = false }) {
  return (
    <div className={centered ? 'section-header section-header--center' : 'section-header'}>
      <div className="section-header__top" aria-hidden="true">
        <span className="section-header__index">{index}</span>
        <span className="section-header__rule" />
        {kicker ? <span className="section-header__kicker">{kicker}</span> : null}
      </div>
      <h2 className="section-header__title">
        {glitch ? (
          <>
            <span className="glitch" data-text={title} aria-hidden="true">
              {title}
            </span>
            <span className="sr-only">{title}</span>
          </>
        ) : (
          title
        )}
      </h2>
      {centered ? <span className="section-header__underline" aria-hidden="true" /> : null}
      {lede ? <p className="section-header__lede">{lede}</p> : null}
    </div>
  );
}
