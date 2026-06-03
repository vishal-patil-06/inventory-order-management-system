export default function ProductTable({
  products,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-800">
            <th className="p-4 text-left">
              Name
            </th>

            <th className="p-4 text-left">
              Code
            </th>

            <th className="p-4 text-left">
              Price
            </th>

            <th className="p-4 text-left">
              Stock
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-t border-slate-800"
            >
              <td className="p-4">
                {product.name}
              </td>

              <td className="p-4">
                {product.code}
              </td>

              <td className="p-4">
                ₹{product.price}
              </td>

              <td className="p-4">
                {product.stockQuantity}
              </td>

              <td className="p-4">
                <span
                  className={
                    product.stockQuantity <= 5
                      ? "text-red-400"
                      : "text-green-400"
                  }
                >
                  {product.stockQuantity <= 5
                    ? "Low"
                    : "Available"}
                </span>
              </td>

              <td className="p-4 flex gap-4">
                <button
                  onClick={() =>
                    onEdit(product)
                  }
                  className="text-blue-400"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    onDelete(product.id)
                  }
                  className="text-red-400"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}