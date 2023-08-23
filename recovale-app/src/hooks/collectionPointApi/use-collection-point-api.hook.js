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

  const requestCollection = async (pointId, accountId) => {
    await httpInstance.post(
      `/collection-point/${pointId}/request-collection/${accountId}`
    );
  };

  const getWasteCollectionRequests = async () => {
    return await httpInstance.get(
      "/collection-point/list-waste-collection-requests"
    );
  };

  const sendNotification = async (selectedRecipients, requestId) => {
    await httpInstance.post(
      `/collection-point/request/send-notification/${requestId}`,
      selectedRecipients
    );
  };

  const getNotifications = async (accountId) => {
    return await httpInstance.get(
      `/collection-point/request/list-notifications/${accountId}`
    );
  };

  const scheduleCollection = async (notificationId, recipientId, requestId) => {
    return await httpInstance.put(
      `/collection-point/request/schedule-collection/${notificationId}/${recipientId}/${requestId}`
    );
  };

  const getPendingCollections = async (accountId) => {
    return await httpInstance.get(`/collection-point/list-pending-collections`);
  };

  const validateCollection = async (collectionPointId, requestId) => {
    return await httpInstance.put(
      `/collection-point/${collectionPointId}/validate-collection/${requestId}`
    );
  };

  const discard = async (collectionPointId, userId, quantity) => {
    return await httpInstance.put(
      `/collection-point/${collectionPointId}/discard/${userId}/${quantity}`
    );
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
      requestCollection,
      getWasteCollectionRequests,
      sendNotification,
      getNotifications,
      scheduleCollection,
      getPendingCollections,
      validateCollection,
      discard,
    }),
    //eslint-disable-next-line
    []
  );
}
