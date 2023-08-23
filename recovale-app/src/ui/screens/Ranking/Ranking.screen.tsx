import "./Ranking.screen.style.css";
import { useState, useEffect } from "react";
import { useUserApi } from "../../../hooks/userApi/use-user-api.hook";
import { RankingItem } from "../../components";
import { AxiosError } from "axios";
import { useToastData } from "../../../context/toast/toast.context";

export function RankingScreen() {
  const [, setToastData] = useToastData();
  const userApi = useUserApi();
  const [filterOptions, setFilterOptions] = useState({
    filterBy: "currentPoints",
    order: "DESC",
  });
  const [rankingData, setRankingData] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const response = await userApi.getRanking(
          filterOptions.filterBy,
          filterOptions.order
        );

        setRankingData(response);
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        setToastData({
          show: true,
          message: err.response?.data.message,
          customClass: "error",
        });
      }
    };

    fetchRankingData();
  }, [filterOptions, userApi, setToastData]);

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
