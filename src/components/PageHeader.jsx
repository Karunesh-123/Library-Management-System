export default function PageHeader({ title, description, action }) {
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">LIBRARY WORKSPACE</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action && <div className="page-heading-action">{action}</div>}
    </div>
  );
}
