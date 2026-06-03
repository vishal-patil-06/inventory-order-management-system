export default function ConfirmDialog({
  title,
  message,
  onCancel,
  onConfirm,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-slate-900 p-6 rounded-2xl w-[450px]">
        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        <p className="text-slate-400 mt-3">
          {message}
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="
              px-4
              py-2
              rounded-xl
              bg-slate-800
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="
              px-4
              py-2
              rounded-xl
              bg-red-600
            "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}