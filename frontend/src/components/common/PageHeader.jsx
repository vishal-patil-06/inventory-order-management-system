export default function PageHeader({
  title,
  subtitle,
  action,
}) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-4xl font-bold">
          {title}
        </h1>

        <p className="text-slate-400 mt-2">
          {subtitle}
        </p>
      </div>

      {action}
    </div>
  );
}