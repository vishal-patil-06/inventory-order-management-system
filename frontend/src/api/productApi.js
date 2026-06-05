import api from "./axios";

export const getProductsApi = (
  page = 1,
  limit = 100
) => {
  return api.get(
    `/products?page=${page}&limit=${limit}`
  );
};

export const createProductApi = (
  payload
) => {
  return api.post(
    "/products",
    payload
  );
};

export const updateProductApi = (
  id,
  payload
) => {
  return api.put(
    `/products/${id}`,
    payload
  );
};

export const deleteProductApi = (
  id
) => {
  return api.delete(
    `/products/${id}`
  );
};