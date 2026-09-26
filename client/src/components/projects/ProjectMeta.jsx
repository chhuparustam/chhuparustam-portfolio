/* Project metadata — STACK / STATUS / YEAR / TYPE in mono.
   Only renders fields that have values (real info only). */
export default function ProjectMeta({ status, year, type }) {
  const items = [
    status ? { key: 'Status', value: status } : null,
    year ? { key: 'Year', value: year } : null,
    type ? { key: 'Type', value: type } : null,
  ].filter(Boolean);

  if (items.length === 0) return null;

  return (
    <dl className="project-meta">
      {items.map((item) => (
        <div key={item.key} className="project-meta__item">
          <dt className="project-meta__key">{item.key}</dt>
          <dd className="project-meta__value" style={{ margin: 0 }}>
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
