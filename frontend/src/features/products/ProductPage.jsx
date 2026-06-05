import {
  useEffect,
  useState,
} from "react";

import PageHeader from "../../components/common/PageHeader";

import ProductTable from "./ProductTable";
import ProductModal from "./ProductModal";
import ProductForm from "./ProductForm";

import {
  getProductsApi,
  createProductApi,
  updateProductApi,
  deleteProductApi,
} from "../../api/productApi";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

    setFormData({
      name: product.name,
      code: product.code,
      price: product.price,
      stockQuantity:
        product.stock_quantity,
    });

    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      code: formData.code,
      price: Number(
        formData.price
      ),
      stock_quantity: Number(
        formData.stockQuantity
      ),
      low_stock_threshold: 5,
    };

    try {
      if (selectedProduct) {
        await updateProductApi(
          selectedProduct.id,
          payload
        );
      } else {
        await createProductApi(
          payload
        );
      }

      await fetchProducts();

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
        "Delete product?"
      );

    if (!confirmed) return;

    try {
      await deleteProductApi(id);

      await fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response =
        await getProductsApi();

      setProducts(
        response.data.data
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        Loading products...
      </div>
    );
  }

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