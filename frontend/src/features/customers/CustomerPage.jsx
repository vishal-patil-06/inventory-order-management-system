import { useState } from "react";

import PageHeader from "../../components/common/PageHeader";

import CustomerTable from "./CustomerTable";
import CustomerForm from "./CustomerForm";
import CustomerModal from "./CustomerModal";

import customerMockData from "./customerMockData";

export default function CustomerPage() {
  const [customers, setCustomers] =
    useState(customerMockData);

  const [showModal, setShowModal] =
    useState(false);

  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const [formData, setFormData] =
    useState({
      fullName: "",
      email: "",
      phone: "",
    });

  const openCreateModal = () => {
    setSelectedCustomer(null);

    setFormData({
      fullName: "",
      email: "",
      phone: "",
    });

    setShowModal(true);
  };

  const openEditModal = (customer) => {
    setSelectedCustomer(customer);

    setFormData(customer);

    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedCustomer) {
      setCustomers((prev) =>
        prev.map((customer) =>
          customer.id ===
          selectedCustomer.id
            ? {
                ...customer,
                ...formData,
              }
            : customer
        )
      );
    } else {
      setCustomers((prev) => [
        {
          id: Date.now(),
          ...formData,
        },
        ...prev,
      ]);
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    setCustomers((prev) =>
      prev.filter(
        (customer) =>
          customer.id !== id
      )
    );
  };

  return (
    <>
      <PageHeader
        title="Customers"
        subtitle="Manage customer records."
        action={
          <button
            onClick={openCreateModal}
            className="
              bg-violet-600
              hover:bg-violet-700
              px-5
              py-3
              rounded-xl
            "
          >
            Add Customer
          </button>
        }
      />

      <CustomerTable
        customers={customers}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      {showModal && (
        <CustomerModal
          title={
            selectedCustomer
              ? "Edit Customer"
              : "Add Customer"
          }
          onClose={() =>
            setShowModal(false)
          }
        >
          <CustomerForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </CustomerModal>
      )}
    </>
  );
}