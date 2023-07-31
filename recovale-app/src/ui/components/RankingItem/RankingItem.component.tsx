import "./RankingItem.component.style.css";

export function RankingItem({ data }: any) {
  return (
    <div className="ranking-item">
      <span className="data">{data.username}</span>
      <span className="data">Pontos no momento: {data.currentPoints}</span>
      <span className="data">Total: {data.totalPoints}</span>
    </div>
  );
}
