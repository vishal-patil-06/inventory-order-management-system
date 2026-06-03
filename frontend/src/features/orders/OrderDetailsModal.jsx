export default function OrderDetailsModal({
  order,
  onClose,
}) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-slate-900 p-6 rounded-2xl w-[500px]">
        <h2 className="text-2xl font-semibold mb-4">
          Order Details
        </h2>

        <p>
          Order ID: {order.id}
        </p>

        <p>
          Customer: {order.customer}
        </p>

        <p>
          Amount: ₹{order.amount}
        </p>

        <p>Status: {order.status}</p>

        <button
          onClick={onClose}
          className="
            mt-6
            px-4
            py-2
            bg-violet-600
            rounded-xl
          "
        >
          Close
        </button>
      </div>
    </div>
  );
}