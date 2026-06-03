export default function DashboardCard({
  title,
  value,
  description,
}) {
  return (
    <div
      className="
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        p-6
        hover:border-violet-500
        transition-all
      "
    >
      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-3">
        {value}
      </h2>

      <p className="text-slate-500 text-sm mt-2">
        {description}
      </p>
    </div>
  );
}