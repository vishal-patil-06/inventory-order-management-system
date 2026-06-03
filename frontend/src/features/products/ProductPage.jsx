import { useState } from "react";

import PageHeader from "../../components/common/PageHeader";

import ProductTable from "./ProductTable";
import ProductModal from "./ProductModal";
import ProductForm from "./ProductForm";

import productMockData from "./productMockData";

export default function ProductPage() {
  const [products, setProducts] =
    useState(productMockData);

  const [showModal, setShowModal] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      code: "",
      price: "",
      stockQuantity: "",
    });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const openCreateModal = () => {
    setSelectedProduct(null);

    setFormData({
      name: "",
      code: "",
      price: "",
      stockQuantity: "",
    });

    setShowModal(true);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);

    setFormData(product);

    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedProduct) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === selectedProduct.id
            ? {
                ...product,
                ...formData,
              }
            : product
        )
      );
    } else {
      setProducts((prev) => [
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
    setProducts((prev) =>
      prev.filter(
        (product) => product.id !== id
      )
    );
  };

  return (
    <>
      <PageHeader
        title="Products"
        subtitle="Manage inventory products."
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
            Add Product
          </button>
        }
      />

      <ProductTable
        products={products}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      {showModal && (
        <ProductModal
          title={
            selectedProduct
              ? "Edit Product"
              : "Add Product"
          }
          onClose={() =>
            setShowModal(false)
          }
        >
          <ProductForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </ProductModal>
      )}
    </>
  );
}