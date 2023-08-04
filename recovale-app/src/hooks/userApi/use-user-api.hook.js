import { BASE_API_URL } from "../../constants";
import { useHttp } from "../http/use-http.hooks";
import { useMemo } from "react";

export function useUserApi() {
  const httpInstance = useHttp(BASE_API_URL);

  const getPoints = async (userId) => {
    const response = await httpInstance.get(`/user-sender/${userId}/points`);

    return response;
  };

  const updateProfile = async (userId, data) => {
    await httpInstance.put(`/user-sender/${userId}/update`, data);
  };

  const getRanking = async (filterBy, order) => {
    return await httpInstance.get(`/user-sender/ranking/${filterBy}/${order}`);
  };

  const deleteAccount = async (accountId) => {
    await httpInstance.put(`/user-sender/${accountId}/delete-account`);
  };

  return useMemo(
    () => ({
      getPoints,
      updateProfile,
      getRanking,
      deleteAccount,
    }),
    //eslint-disable-next-line
    []
  );
}
