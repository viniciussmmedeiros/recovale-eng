import { useMemo } from "react";
import { BASE_API_URL } from "../../constants";
import { useHttp } from "../http/use-http.hooks";

export function useAdminApi() {
  const httpInstance = useHttp(BASE_API_URL);

  const updateProfile = async (adminId, data) => {
    await httpInstance.put(`/admin/${adminId}/update`, data);
  };

  const register = async (data) => {
    await httpInstance.post(`admin/register`, data);
  };

  const getCreatedAccounts = async (adminId) => {
    return await httpInstance.get(`admin/${adminId}/created-accounts`);
  };

  const updateCreatedAccount = async (newData) => {
    await httpInstance.put(
      `admin/update-created-account/${newData.id}`,
      newData
    );
  };

  const deleteCreatedAccount = async (accountId) => {
    await httpInstance.put(`admin/delete-created-account/${accountId}`);
  };

  return useMemo(
    () => ({
      updateProfile,
      register,
      getCreatedAccounts,
      updateCreatedAccount,
      deleteCreatedAccount,
    }),
    //eslint-disable-next-line
    []
  );
}
