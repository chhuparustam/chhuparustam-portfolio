import TechBadge from '../common/TechBadge.jsx';

/* Project case study — editorial premium narrative with varied
   layouts per stage. Renders only verified content; empty stages
   stay honest pending states. Project-agnostic: each project may
   define its own `order` and per-stage `stages` meta; otherwise the
   legacy WasteGuardian stage map applies. */

const DEFAULT_ORDER = [
  'problem',
  'approach',
  'architecture',
  'features',
  'technology',
  'challenges',
  'screenshots',
  'outcome',
];

const DEFAULT_META = {
  problem: { index: '01', kicker: 'Problem', title: 'Waste pickup needed structure.' },
  approach: { index: '02', kicker: 'Approach', title: 'Role-based workflows, end to end.' },
  architecture: { index: '03', kicker: 'System overview', title: 'How the pieces connect.' },
  features: { index: '04', kicker: 'Features', title: 'What each role can do.' },
  technology: { index: '05', kicker: 'Technology', title: 'Built with proven tools.' },
  challenges: { index: '06', kicker: 'Challenges', title: 'Known limitations, documented.' },
  screenshots: { index: '07', kicker: 'Screenshots', title: 'Visual record.' },
  outcome: { index: '08', kicker: 'Outcome', title: 'What shipped.' },
};

function StageHead({ index, kicker, title }) {
  return (
    <div className="case-head">
      <div className="case-head__top" aria-hidden="true">
        <span className="section-header__index">{index}</span>
        <span className="section-header__rule" />
        <span className="section-header__kicker">{kicker}</span>
      </div>
      <h3 className="case-head__title">{title}</h3>
    </div>
  );
}

function Pending({ note }) {
  return <p className="case-pending">{note ?? 'Documentation coming soon.'}</p>;
}

function splitLead(text) {
  const match = text.match(/^(.+?\.)\s+(.*)$/s);
  if (!match) return { lead: text, rest: '' };
  return { lead: match[1], rest: match[2] };
}

function ProblemStage({ value, meta }) {
  const { lead, rest } = splitLead(value);
  return (
    <section className="case-stage case-problem" aria-label={meta.kicker}>
      <StageHead index={meta.index} kicker={meta.kicker} title={meta.title} />
      <div className="case-problem__grid">
        <p className="case-problem__lead">{lead}</p>
        {rest ? <p className="body case-problem__body">{rest}</p> : null}
      </div>
    </section>
  );
}

function ApproachStage({ value, roles, meta }) {
  return (
    <section className="case-stage case-approach" aria-label={meta.kicker}>
      <StageHead index={meta.index} kicker={meta.kicker} title={meta.title} />
      <p className="lead case-approach__prose">{value}</p>
      {roles.length > 0 ? (
        <ol className="case-flow" aria-label="Role workflow">
          {roles.map((role, i) => (
            <li key={role} className="case-flow__step">
              <span className="case-flow__index" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="case-flow__role">{role}</span>
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}

function ArchitectureStage({ value, meta }) {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return (
      <section className="case-stage case-arch" aria-label={meta.kicker}>
        <StageHead index={meta.index} kicker={meta.kicker} title={meta.title} />
        <div className="case-arch__empty">
          <Pending note="Architecture diagram coming soon." />
          <p className="caption">
            This space reserves a future system diagram. The project snapshot on the work section is a
            visual summary, not the architecture record.
          </p>
        </div>
      </section>
    );
  }
  if (typeof value === 'string') {
    return (
      <section className="case-stage case-arch" aria-label={meta.kicker}>
        <StageHead index={meta.index} kicker={meta.kicker} title={meta.title} />
        <p className="body case-stage__prose">{value}</p>
      </section>
    );
  }
  const flows = Array.isArray(value.flows) ? value.flows : [];
  return (
    <section className="case-stage case-arch" aria-label={meta.kicker}>
      <StageHead index={meta.index} kicker={meta.kicker} title={meta.title} />
      {flows.length === 0 ? <Pending note="Technical flow coming soon." /> : null}
      {flows.map((flow, i) => (
        <div key={flow.label ?? `flow-${i}`} className="case-arch__flow">
          {flow.label ? <p className="tech-label case-arch__flow-label">{flow.label}</p> : null}
          <ol className="case-flow" aria-label={flow.label ?? 'Technical flow'}>
            {(flow.steps ?? []).map((step, j) => (
              <li key={step} className="case-flow__step">
                <span className="case-flow__index" aria-hidden="true">
                  {String(j + 1).padStart(2, '0')}
                </span>
                <span className="case-flow__role">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      ))}
      {value.note ? <p className="body case-stage__prose">{value.note}</p> : null}
      <p className="caption">Visual explanation of the repository structure — not an enterprise diagram.</p>
    </section>
  );
}

function FeaturesStage({ groups, meta }) {
  if (groups.length === 0) {
    return (
      <section className="case-stage" aria-label={meta.kicker}>
        <StageHead index={meta.index} kicker={meta.kicker} title={meta.title} />
        <Pending />
      </section>
    );
  }
  return (
    <section className="case-stage case-features" aria-label={meta.kicker}>
      <StageHead index={meta.index} kicker={meta.kicker} title={meta.title} />
      <div className="case-features__grid">
        {groups.map((group) => (
          <div key={group.role} className="case-feature">
            <h4 className="case-feature__role">{group.role}</h4>
            <ul className="case-feature__list">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function TechnologyStage({ groups, meta }) {
  if (groups.length === 0) {
    return (
      <section className="case-stage" aria-label={meta.kicker}>
        <StageHead index={meta.index} kicker={meta.kicker} title={meta.title} />
        <Pending />
      </section>
    );
  }
  return (
    <section className="case-stage case-tech" aria-label={meta.kicker}>
      <StageHead index={meta.index} kicker={meta.kicker} title={meta.title} />
      <div className="case-tech__grid">
        {groups.map((group) => (
          <div key={group.group} className="case-tech__group">
            <h4 className="case-tech__name">{group.group}</h4>
            <ul className="tech-badges" aria-label={group.group}>
              {group.items.map((item) => (
                <li key={item}>
                  <TechBadge label={item} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function ChallengesStage({ items, meta }) {
  if (items.length === 0) {
    return (
      <section className="case-stage" aria-label={meta.kicker}>
        <StageHead index={meta.index} kicker={meta.kicker} title={meta.title} />
        <Pending />
      </section>
    );
  }
  return (
    <section className="case-stage case-challenges" aria-label={meta.kicker}>
      <StageHead index={meta.index} kicker={meta.kicker} title={meta.title} />
      <p className="caption">
        Known issues and implementation limitations — documented as found, not presented as solved.
      </p>
      <ol className="case-challenges__list">
        {items.map((item, i) => (
          <li key={item} className="case-challenges__row">
            <span className="case-challenges__index" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="case-challenges__text">{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ScreenshotsStage({ shots, meta }) {
  if (shots.length === 0) {
    return (
      <section className="case-stage" aria-label={meta.kicker}>
        <StageHead index={meta.index} kicker={meta.kicker} title={meta.title} />
        <div className="case-shots__empty">
          <p className="case-shots__big">Screenshots coming soon.</p>
          <p className="caption">Real captures will appear here when available — nothing is mocked.</p>
        </div>
      </section>
    );
  }
  return (
    <section className="case-stage" aria-label={meta.kicker}>
      <StageHead index={meta.index} kicker={meta.kicker} title={meta.title} />
      <div className="grid-12">
        {shots.map((shot) => (
          <figure key={shot.src} className="span-6 case-shot">
            <img src={shot.src} alt={shot.alt ?? meta.title} loading="lazy" />
            {shot.caption ? <figcaption className="caption">{shot.caption}</figcaption> : null}
          </figure>
        ))}
      </div>
    </section>
  );
}

function OutcomeStage({ value, meta }) {
  return (
    <section className="case-stage case-outcome" aria-label={meta.kicker}>
      <StageHead index={meta.index} kicker={meta.kicker} title={meta.title} />
      <p className="case-outcome__statement">{value}</p>
    </section>
  );
}

function SecurityStage({ items, meta }) {
  if (items.length === 0) {
    return (
      <section className="case-stage" aria-label={meta.kicker}>
        <StageHead index={meta.index} kicker={meta.kicker} title={meta.title} />
        <Pending />
      </section>
    );
  }
  return (
    <section className="case-stage case-security" aria-label={meta.kicker}>
      <StageHead index={meta.index} kicker={meta.kicker} title={meta.title} />
      <p className="caption">
        Repository-supported engineering facts only — not a hardened-application claim.
      </p>
      <ul className="case-security__list">
        {items.map((item) => (
          <li key={item} className="case-security__row">
            <span className="case-security__dot" aria-hidden="true" />
            <span className="case-security__text">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function NotesStage({ items, meta }) {
  if (items.length === 0) {
    return (
      <section className="case-stage" aria-label={meta.kicker}>
        <StageHead index={meta.index} kicker={meta.kicker} title={meta.title} />
        <Pending />
      </section>
    );
  }
  return (
    <section className="case-stage case-notes" aria-label={meta.kicker}>
      <StageHead index={meta.index} kicker={meta.kicker} title={meta.title} />
      <p className="caption">
        Accurate repository notes — documented as found, not presented as bugs.
      </p>
      <ol className="case-challenges__list">
        {items.map((item, i) => (
          <li key={item} className="case-challenges__row">
            <span className="case-challenges__index" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="case-challenges__text">{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function SourceStage({ value, title, meta }) {
  if (!value?.url) {
    return (
      <section className="case-stage" aria-label={meta.kicker}>
        <StageHead index={meta.index} kicker={meta.kicker} title={meta.title} />
        <Pending />
      </section>
    );
  }
  return (
    <section className="case-stage case-source" aria-label={meta.kicker}>
      <StageHead index={meta.index} kicker={meta.kicker} title={meta.title} />
      <div className="case-source__panel">
        <p className="case-source__name">{title}</p>
        {value.note ? <p className="caption">{value.note}</p> : null}
        <a
          className="btn btn--primary"
          href={value.url}
          data-external="true"
          target="_blank"
          rel="noopener noreferrer"
        >
          {value.label ?? 'View Source'} <span className="btn__arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}

export default function ProjectCaseStudy({ caseStudy, projectTitle }) {
  const study = caseStudy ?? {};
  const order = Array.isArray(study.order) && study.order.length > 0 ? study.order : DEFAULT_ORDER;
  const metaFor = (key) => ({ ...(DEFAULT_META[key] ?? {}), ...(study.stages?.[key] ?? {}) });
  const featureGroups = Array.isArray(study.features) ? study.features : [];
  const roleNames = featureGroups.map((g) => g.role);

  return (
    <div className="case-study">
      {order.map((key) => {
        const meta = metaFor(key);
        const value = study[key];
        if (key === 'problem' || key === 'overview') {
          if (!value) {
            return (
              <section key={key} className="case-stage" aria-label={meta.kicker}>
                <StageHead index={meta.index} kicker={meta.kicker} title={meta.title} />
                <Pending />
              </section>
            );
          }
          return <ProblemStage key={key} value={value} meta={meta} />;
        }
        if (key === 'approach') {
          if (!value) {
            return (
              <section key={key} className="case-stage" aria-label={meta.kicker}>
                <StageHead index={meta.index} kicker={meta.kicker} title={meta.title} />
                <Pending />
              </section>
            );
          }
          return <ApproachStage key={key} value={value} roles={roleNames} meta={meta} />;
        }
        if (key === 'architecture') return <ArchitectureStage key={key} value={value} meta={meta} />;
        if (key === 'features') return <FeaturesStage key={key} groups={featureGroups} meta={meta} />;
        if (key === 'technology') {
          const groups = Array.isArray(value) ? value : [];
          return <TechnologyStage key={key} groups={groups} meta={meta} />;
        }
        if (key === 'challenges') {
          const items = Array.isArray(value) ? value : [];
          return <ChallengesStage key={key} items={items} meta={meta} />;
        }
        if (key === 'security') {
          const items = Array.isArray(value) ? value : [];
          return <SecurityStage key={key} items={items} meta={meta} />;
        }
        if (key === 'notes') {
          const items = Array.isArray(value) ? value : [];
          return <NotesStage key={key} items={items} meta={meta} />;
        }
        if (key === 'source') {
          return <SourceStage key={key} value={value} title={projectTitle} meta={meta} />;
        }
        if (key === 'screenshots') {
          const shots = Array.isArray(value) ? value : [];
          return <ScreenshotsStage key={key} shots={shots} meta={meta} />;
        }
        if (key === 'outcome') {
          if (!value) {
            return (
              <section key={key} className="case-stage" aria-label={meta.kicker}>
                <StageHead index={meta.index} kicker={meta.kicker} title={meta.title} />
                <Pending />
              </section>
            );
          }
          return <OutcomeStage key={key} value={value} meta={meta} />;
        }
        return null;
      })}
    </div>
  );
}
