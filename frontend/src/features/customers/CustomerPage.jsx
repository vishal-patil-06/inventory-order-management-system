import { useEffect, useState } from "react";

import PageHeader from "../../components/common/PageHeader";

import CustomerTable from "./CustomerTable";
import CustomerForm from "./CustomerForm";
import CustomerModal from "./CustomerModal";

import {
  getCustomersApi,
  createCustomerApi,
  updateCustomerApi,
  deleteCustomerApi,
} from "../../api/customerApi";

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(true);

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

    setFormData({
      fullName: customer.full_name,
      email: customer.email,
      phone: customer.phone,
    });

    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      full_name:
        formData.fullName,
      email: formData.email,
      phone: formData.phone,
    };

    try {
      if (selectedCustomer) {
        await updateCustomerApi(
          selectedCustomer.id,
          payload
        );
      } else {
        await createCustomerApi(
          payload
        );
      }

      await fetchCustomers();

      setShowModal(false);
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data
          ?.detail ||
          "Something went wrong"
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmed =
      window.confirm(
        "Delete customer?"
      );

    if (!confirmed) return;

    try {
      await deleteCustomerApi(id);

      await fetchCustomers();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const response =
        await getCustomersApi();

      setCustomers(
        response.data.data
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        Loading customers...
      </div>
    );
  }
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