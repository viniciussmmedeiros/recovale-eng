import { useMemo } from "react";
import { BASE_API_URL } from "../../constants";
import { useHttp } from "../http/use-http.hooks";

export function useAdminApi() {
  const httpInstance = useHttp(BASE_API_URL);

  const updateProfile = async (adminId, data) => {
    await httpInstance.put(`/admin/${adminId}/update`, data);
  };

  return useMemo(
    () => ({
      updateProfile,
    }),
    []
  );
}
