import "./RewardCard.component.style.css";
import { RewardModal } from "..";
import { useState } from "react";

export function RewardCard({ data, handleClaim, setRefreshList }: any) {
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);

  return (
    <div className="reward-card">
      <p>{data.title}</p>
      <p>Descrição: {data.description}</p>
      <p>Custo (pontos): {data.points}</p>
      <p>Quantidade disponível: {data.quantityAvailable}</p>
      {handleClaim && (
        <button onClick={() => handleClaim(data.id)}>Resgatar</button>
      )}
      {!handleClaim && (
        <button onClick={() => setIsRewardModalOpen(true)}>
          Modificar recompensa
        </button>
      )}
      {isRewardModalOpen && (
        <RewardModal
          handleModal={setIsRewardModalOpen}
          data={handleClaim ? null : data}
          setRefreshList={setRefreshList}
        />
      )}
    </div>
  );
}
