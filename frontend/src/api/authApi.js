import api from "./axios";

export const registerApi = (
  payload
) => {
  return api.post(
    "/auth/register",
    payload
  );
};

export const loginApi = (
  payload
) => {
  return api.post(
    "/auth/login",
    payload
  );
};