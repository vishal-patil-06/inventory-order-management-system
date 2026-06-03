import { useState } from "react";

import PageHeader from "../../components/common/PageHeader";

import OrderTable from "./OrderTable";
import CreateOrderModal from "./CreateOrderModal";
import OrderDetailsModal from "./OrderDetailsModal";

import {
  mockOrders,
  mockCustomers,
  mockProducts,
} from "./orderMockData";

export default function OrderPage() {
  const [orders, setOrders] =
    useState(mockOrders);

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  return (
    <>
      <PageHeader
        title="Orders"
        subtitle="Manage customer orders."
        action={
          <button
            onClick={() =>
              setShowCreateModal(true)
            }
            className="
              bg-violet-600
              px-5
              py-3
              rounded-xl
            "
          >
            Create Order
          </button>
        }
      />

      <OrderTable
        orders={orders}
        onView={setSelectedOrder}
        onDelete={(id) =>
          setOrders((prev) =>
            prev.filter(
              (o) => o.id !== id
            )
          )
        }
      />

      {showCreateModal && (
        <CreateOrderModal
          customers={mockCustomers}
          products={mockProducts}
          onClose={() =>
            setShowCreateModal(false)
          }
        />
      )}

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() =>
            setSelectedOrder(null)
          }
        />
      )}
    </>
  );
}