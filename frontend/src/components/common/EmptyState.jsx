export default function EmptyState({
  title,
  description,
}) {
  return (
    <div
      className="
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        p-12
        text-center
      "
    >
      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="text-slate-400 mt-2">
        {description}
      </p>
    </div>
  );
}