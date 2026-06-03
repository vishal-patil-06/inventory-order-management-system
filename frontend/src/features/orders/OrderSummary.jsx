export default function OrderSummary({
  subtotal,
  total,
  itemCount,
}) {
  return (
    <div
      className="
        bg-slate-800
        border
        border-slate-700
        rounded-2xl
        p-5
      "
    >
      <h3 className="text-lg font-semibold mb-5">
        Order Summary
      </h3>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-slate-400">
            Items
          </span>

          <span>{itemCount}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">
            Subtotal
          </span>

          <span>
            ₹{subtotal.toLocaleString()}
          </span>
        </div>

        <div className="border-t border-slate-700 pt-3 flex justify-between font-semibold text-lg">
          <span>Total</span>

          <span>
            ₹{total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}