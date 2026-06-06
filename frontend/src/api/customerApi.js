import api from "./axios";

export const getCustomersApi = (
  page = 1,
  limit = 100
) => {
  return api.get(
    `/customers?page=${page}&limit=${limit}`
  );
};

export const createCustomerApi = (
  payload
) => {
  return api.post(
    "/customers",
    payload
  );
};

export const updateCustomerApi = (
  id,
  payload
) => {
  return api.put(
    `/customers/${id}`,
    payload
  );
};

export const deleteCustomerApi = (
  id
) => {
  return api.delete(
    `/customers/${id}`
  );
};