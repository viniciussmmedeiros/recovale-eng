import { BASE_API_URL } from "../../constants";
import { useHttp } from "../http/use-http.hooks";
import { useMemo } from "react";

export function useRewardApi() {
  const httpInstance = useHttp(BASE_API_URL);

  const getRewardsList = async (pointsFilter) => {
    const response = await httpInstance.get(
      pointsFilter
        ? `/reward/list?pointsFilter=${pointsFilter}`
        : `/reward/list`
    );

    return response;
  };

  const claimReward = async (rewardId, userId) => {
    await httpInstance.post(`/reward/${rewardId}/claim/${userId}`);
  };

  const registerReward = async (data) => {
    await httpInstance.post(`/reward/register`, data);
  };

  const deleteReward = async (rewardId) => {
    await httpInstance.put(`/reward/${rewardId}/delete`);
  };

  const updateReward = async (rewardId, rewardData) => {
    await httpInstance.put(`/reward/${rewardId}/update`, rewardData);
  };

  return useMemo(
    () => ({
      getRewardsList,
      claimReward,
      registerReward,
      deleteReward,
      updateReward,
    }),
    //eslint-disable-next-line
    []
  );
}
