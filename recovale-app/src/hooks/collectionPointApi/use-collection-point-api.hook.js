import { useMemo } from "react";
import { useHttp } from "../http/use-http.hooks";
import { BASE_API_URL } from "../../constants";

export function useCollectionPointApi() {
  const httpInstance = useHttp(BASE_API_URL);

  const getCollectionPoints = async () => {
    return await httpInstance.get("/collection-point/list");
  };

  const getRequests = async () => {
    return await httpInstance.get("/collection-point/list-requests");
  };

  const makeRequest = async (data) => {
    await httpInstance.post("/collection-point/request", data);
  };

  const registerPoint = async (data) => {
    await httpInstance.post("/collection-point/register", data);
  };

  const approveRequest = async (data) => {
    await httpInstance.put("/collection-point/approve-request", data);
  };

  const refuseRequest = async (id) => {
    await httpInstance.put(`/collection-point/refuse-request/${id}`);
  };

  const deletePoint = async (id) => {
    await httpInstance.put(`/collection-point/delete/${id}`);
  };

  return useMemo(
    () => ({
      getCollectionPoints,
      getRequests,
      makeRequest,
      registerPoint,
      approveRequest,
      refuseRequest,
      deletePoint,
    }),
    []
  );
}
