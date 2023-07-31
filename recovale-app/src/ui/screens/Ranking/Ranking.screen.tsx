import "./Ranking.screen.style.css";
import { useState, useEffect } from "react";
import { useUserApi } from "../../../hooks/userApi/use-user-api.hook";
import { RankingItem } from "../../components";

export function RankingScreen() {
  const [filterOptions, setFilterOptions] = useState({
    filterBy: "currentPoints",
    order: "DESC",
  });
  const [rankingData, setRankingData] = useState<any[] | null>(null);
  const userApi = useUserApi();

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        console.log(filterOptions);
        const response = await userApi.getRanking(
          filterOptions.filterBy,
          filterOptions.order
        );

        setRankingData(response);
      } catch (error) {
        console.log("Erro interno do servidor.");
      }
    };

    fetchRankingData();
  }, [filterOptions]);

  const handleSetFilterOptions = (e: any) => {
    const { name, value } = e.target;

    setFilterOptions((previousData) => ({ ...previousData, [name]: value }));
  };

  return (
    <section className="page-content ranking-screen">
      <h2>Ranking</h2>
      <div className="filter-options-wrapper">
        <span>Filtrar por: </span>
        <select name="filterBy" onChange={handleSetFilterOptions}>
          <option value="currentPoints" selected>
            Pontos no momento
          </option>
          <option value="totalPoints">Pontos totais</option>
        </select>

        <span>De maneira: </span>
        <select name="order" onChange={handleSetFilterOptions}>
          <option value="ASC">Crescente</option>
          <option value="DESC" selected>
            Decrescente
          </option>
        </select>
      </div>
      <div className="ranking-data">
        {rankingData &&
          rankingData.map((item) => <RankingItem key={item.id} data={item} />)}
      </div>
    </section>
  );
}
