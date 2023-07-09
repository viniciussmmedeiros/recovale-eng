import "./ClaimReward.screen.style.css";

export function ClaimRewardScreen() {
  return (
    <section className="page-content claim-rewards-screen">
      <h2>Resgatar Recompensas</h2>
      <span>Seus pontos: 999999</span>
      <div className="rewards-search-wrapper">
        <label htmlFor="">Faixa de Pontos</label>
        <select name="" id="">
          <option value="">Selecionar</option>
          <option value="">Até 100</option>
          <option value="">100~200</option>
          <option value="">200+</option>
        </select>
        <button>Filtrar</button>
        <button>Limpar filtro</button>
      </div>
      <section className="rewards-list-wrapper"></section>
    </section>
  );
}
