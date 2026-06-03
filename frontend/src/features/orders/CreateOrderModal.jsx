import { useMemo, useState } from "react";
import OrderSummary from "./OrderSummary";



export default function CreateOrderModal({
  customers,
  products,
  onClose,
}) {
  const [customerId, setCustomerId] =
    useState("");

  const [items, setItems] = useState([
    {
      productId: "",
      quantity: 1,
    },
  ]);

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        productId: "",
        quantity: 1,
      },
    ]);
  };

  const updateItem = (
    index,
    field,
    value
  ) => {
    const copy = [...items];

    copy[index][field] = value;

    setItems(copy);
  };

  const total = useMemo(() => {
    return items.reduce(
      (sum, item) => {
        const product = products.find(
          (p) =>
            p.id === Number(item.productId)
        );

        if (!product) return sum;

        return (
          sum +
          product.price *
            Number(item.quantity)
        );
      },
      0
    );
  }, [items, products]);

  const itemCount = items.reduce(
    (sum, item) =>
        sum + Number(item.quantity),
    0
);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-slate-900 p-6 rounded-2xl w-[800px]">
        <h2 className="text-2xl font-semibold mb-6">
          Create Order
        </h2>

        <div className="space-y-6">
          <select
            value={customerId}
            onChange={(e) =>
              setCustomerId(
                e.target.value
              )
            }
            className="w-full p-3 rounded-xl bg-slate-800"
          >
            <option value="">
              Select Customer
            </option>

            {customers.map((customer) => (
              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.fullName}
              </option>
            ))}
          </select>

          {items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-2 gap-4"
            >
              <select
                value={item.productId}
                onChange={(e) =>
                  updateItem(
                    index,
                    "productId",
                    e.target.value
                  )
                }
                className="p-3 rounded-xl bg-slate-800"
              >
                <option value="">
                  Select Product
                </option>

                {products.map(
                  (product) => (
                    <option
                      key={product.id}
                      value={product.id}
                    >
                      {product.name}
                    </option>
                  )
                )}
              </select>

              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateItem(
                    index,
                    "quantity",
                    e.target.value
                  )
                }
                className="p-3 rounded-xl bg-slate-800"
              />
            </div>
          ))}

          <button
            onClick={addItem}
            className="text-violet-400"
          >
            + Add Product
          </button>

          <OrderSummary
            subtotal={total}
            total={total}
            itemCount={itemCount}
        />

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-700 rounded-xl"
            >
              Cancel
            </button>

            <button
              className="px-4 py-2 bg-violet-600 rounded-xl"
            >
              Create Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}