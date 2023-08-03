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

  return useMemo(
    () => ({
      getRewardsList,
      claimReward,
    }),
    //eslint-disable-next-line
    []
  );
}
