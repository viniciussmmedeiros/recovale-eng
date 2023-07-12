import "./RewardCard.component.style.css";

export function RewardCard({ data, handleClaim }: any) {
  return (
    <div className="reward-card">
      <p>{data.title}</p>
      <p>Descrição: {data.description}</p>
      <p>Custo (pontos): {data.points}</p>
      <p>Quantidade disponível: {data.quantityAvailable}</p>
      <button onClick={() => handleClaim(data.id)}>Resgatar</button>
    </div>
  );
}
