import { getDashboardSummary } from "../../api/dashboardApi";

export const fetchDashboardSummary = async () => {
  const response =
    await getDashboardSummary();

  return response.data;
};