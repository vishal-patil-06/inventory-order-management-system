export default function LowStockTable({
  products,
}) {
  return (
    <div
      className="
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        p-6
      "
    >
      <h3 className="text-xl font-semibold mb-5">
        Low Stock Products
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-slate-400 text-left">
              <th className="pb-4">Product</th>
              <th className="pb-4">Code</th>
              <th className="pb-4">Stock</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="
                  border-t
                  border-slate-800
                "
              >
                <td className="py-4">
                  {product.name}
                </td>

                <td className="py-4 text-slate-400">
                  {product.code}
                </td>

                <td className="py-4">
                  <span
                    className="
                      px-3
                      py-1
                      rounded-full
                      bg-red-500/20
                      text-red-400
                      text-xs
                    "
                  >
                    {product.stock} Left
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}