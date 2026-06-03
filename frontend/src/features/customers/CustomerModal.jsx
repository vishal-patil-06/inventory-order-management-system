export default function CustomerModal({
  title,
  children,
  onClose,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-slate-900 rounded-2xl p-6 w-full max-w-xl">
        <div className="flex justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {title}
          </h2>

          <button onClick={onClose}>
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}