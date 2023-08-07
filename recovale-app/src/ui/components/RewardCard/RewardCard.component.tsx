import { RewardModal } from "..";
import "./RewardCard.component.style.css";
import { useState } from "react";

export function RewardCard({ data, handleClaim }: any) {
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
        />
      )}
    </div>
  );
}
