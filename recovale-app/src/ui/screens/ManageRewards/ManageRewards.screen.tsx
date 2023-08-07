import "./ManageRewards.screen.style.css";
import { useState, useEffect } from "react";
import { RewardCard, RewardModal } from "../../components";
import { useRewardApi } from "../../../hooks/rewardApi/use-reward-api.hook";

interface Reward {
  id: number;
  title: string;
  description: string;
  points: number;
  quantityAvailable: number;
}

export function ManageRewardsScreen() {
  const rewardApi = useRewardApi();
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [rewardsDataList, setRewardsDataList] = useState<Reward[] | null>([]);

  useEffect(() => {
    const fetchRewardsDataList = async () => {
      const dataResponse = await rewardApi.getRewardsList(null);

      setRewardsDataList(dataResponse);
    };

    fetchRewardsDataList();
  }, []);

  return (
    <section className="page-content">
      <h2>Gerenciar Recompensas</h2>
      <button onClick={() => setIsRegistrationModalOpen(true)}>
        Cadastrar nova recompensa
      </button>
      {isRegistrationModalOpen && (
        <RewardModal handleModal={setIsRegistrationModalOpen} />
      )}
      {rewardsDataList && rewardsDataList.length > 0 ? (
        rewardsDataList.map((reward) => (
          <RewardCard key={reward.id} data={reward} />
        ))
      ) : (
        <span>Nenhuma recompensa disponível.</span>
      )}
    </section>
  );
}
