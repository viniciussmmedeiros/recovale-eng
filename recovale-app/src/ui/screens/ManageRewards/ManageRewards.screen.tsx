import "./ManageRewards.screen.style.css";
import { useState, useEffect } from "react";
import { RewardCard, RewardModal } from "../../components";
import { useRewardApi } from "../../../hooks/rewardApi/use-reward-api.hook";
import { useToastData } from "../../../context/toast/toast.context";
import { AxiosError } from "axios";

interface Reward {
  id: number;
  title: string;
  description: string;
  points: number;
  quantityAvailable: number;
}

export function ManageRewardsScreen() {
  const [, setToastData] = useToastData();
  const rewardApi = useRewardApi();
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [rewardsDataList, setRewardsDataList] = useState<Reward[] | null>([]);
  const [refreshList, setRefreshList] = useState(false);

  useEffect(() => {
    const fetchRewardsDataList = async () => {
      try {
        const dataResponse = await rewardApi.getRewardsList(null);

        setRewardsDataList(dataResponse);
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        setToastData({
          show: true,
          message: err.response?.data.message,
          customClass: "error",
        });
      }
    };

    fetchRewardsDataList();
  }, [rewardApi, setToastData, refreshList]);

  return (
    <section className="page-content">
      <h2>Gerenciar Recompensas</h2>
      <button
        onClick={() => setIsRegistrationModalOpen(true)}
        className="register-new-reward-btn"
      >
        Cadastrar nova recompensa
      </button>
      {isRegistrationModalOpen && (
        <RewardModal
          handleModal={setIsRegistrationModalOpen}
          setRefreshList={setRefreshList}
        />
      )}
      <section className="rewards-list-wrapper">
        {rewardsDataList && rewardsDataList.length > 0 ? (
          rewardsDataList.map((reward) => (
            <RewardCard
              key={reward.id}
              data={reward}
              setRefreshList={setRefreshList}
            />
          ))
        ) : (
          <span>Nenhuma recompensa disponível.</span>
        )}
      </section>
    </section>
  );
}
