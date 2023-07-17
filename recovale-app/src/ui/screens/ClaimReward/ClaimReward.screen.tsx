import { AxiosError } from "axios";
import { useAccountData } from "../../../context/account/account.context";
import { useRewardApi } from "../../../hooks/rewardApi/use-reward-api.hook";
import { useUserApi } from "../../../hooks/userApi/use-user-api.hook";
import { RewardCard } from "../../components";
import "./ClaimReward.screen.style.css";
import { useEffect, useState } from "react";
import { useToastData } from "../../../context/toast/toast.context";

interface Reward {
  id: number;
  title: string;
  description: string;
  points: number;
  quantityAvailable: number;
}

interface UserPointsData {
  currentPoints: number;
  totalPoints: number;
}

export function ClaimRewardScreen() {
  const [, setToastData] = useToastData();
  const rewardApi = useRewardApi();
  const userApi = useUserApi();
  const [accountData] = useAccountData();
  const [rewardsList, setRewardsList] = useState<Reward[] | null>(null);
  const [pointsFilter, setPointsFilter] = useState<string | null>(null);
  const [resetSearch, setResetSearch] = useState(false);
  const [userPointsData, setUserPointsData] = useState<UserPointsData | null>(
    null
  );

  useEffect(() => {
    const fetchUserData = async () => {
      const userPointsResponse = await userApi.getPoints(accountData.id);

      setUserPointsData(userPointsResponse);
    };

    fetchUserData();
  }, [resetSearch]);

  useEffect(() => {
    const fetchData = async () => {
      const listResponse = await rewardApi.getRewardsList(pointsFilter);

      setRewardsList(listResponse);
    };

    fetchData();
  }, [resetSearch]);

  const handleClearFilter = () => {
    setPointsFilter(null);
    setResetSearch(!resetSearch);
  };

  const handleClaimReward = (rewardId: number, userId = accountData.id) => {
    const confirmClaim = window.confirm(
      "Deseja realmente resgatar essa recompensa?"
    );

    if (confirmClaim) {
      const claimReward = async () => {
        try {
          await rewardApi.claimReward(rewardId, userId);

          setToastData({
            show: true,
            customClass: "success",
            message: "Recompensa resgatada!",
          });

          setResetSearch(!resetSearch);
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          setToastData({
            show: true,
            message: err.response?.data.message,
            customClass: "error",
          });
        }
      };

      claimReward();
    }
  };

  return (
    <section className="page-content claim-rewards-screen">
      <h2>Resgatar Recompensas</h2>
      <span>
        Seus pontos: {userPointsData?.currentPoints} | Pontos totais:{" "}
        {userPointsData?.totalPoints}
      </span>
      <div className="rewards-search-wrapper">
        <label htmlFor="">Valor máximo de pontos:</label>
        <input
          type="range"
          min="1"
          max="500"
          step="1"
          value={pointsFilter === null ? "" : pointsFilter}
          onChange={(e) => setPointsFilter(e.target.value)}
        />
        {pointsFilter}
        <span className="buttons-wrapper">
          <button
            className="filter-btn"
            onClick={() => setResetSearch(!resetSearch)}
          >
            Filtrar
          </button>
          <button className="clear-btn" onClick={() => handleClearFilter()}>
            Limpar filtro
          </button>
        </span>
      </div>
      <section className="rewards-list-wrapper">
        {rewardsList && rewardsList.length > 0 ? (
          rewardsList.map((reward) => (
            <RewardCard
              key={reward.id}
              data={reward}
              handleClaim={handleClaimReward}
            />
          ))
        ) : (
          <span>Nenhuma recompensa disponível.</span>
        )}
      </section>
    </section>
  );
}
