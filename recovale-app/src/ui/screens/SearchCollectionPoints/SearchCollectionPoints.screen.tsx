import "./SearchCollectionPoints.screen.style.css";
import { useAccountData } from "../../../context/account/account.context";
import { useCollectionPointApi } from "../../../hooks/collectionPointApi/use-collection-point-api.hook";
import {
  CollectionPointCard,
  CollectionPointRequestModal,
} from "../../components";
import { useState, useEffect } from "react";
import { useToastData } from "../../../context/toast/toast.context";
import { AxiosError } from "axios";

export function SearchCollectionPointsScreen() {
  const [, setToastData] = useToastData();
  const [accountData] = useAccountData();
  const collectionPointsApi = useCollectionPointApi();
  const [collectionPointsList, setCollectionPointsList] = useState<
    any[] | null
  >([]);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [refreshList, setRefreshList] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await collectionPointsApi.getCollectionPoints();

        setCollectionPointsList(data);
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        setToastData({
          show: true,
          message: err.response?.data.message,
          customClass: "error",
        });
      }
    };

    fetchData();
  }, [collectionPointsApi, setToastData, refreshList]);

  return (
    <section className="page-content">
      <h2>Pontos de Coleta</h2>

      {accountData.type === "SENDER" && (
        <button onClick={() => setIsRequestModalOpen(true)}>
          Solicitar ponto de coleta
        </button>
      )}

      <section className="map-list-wrapper">
        {collectionPointsList && collectionPointsList.length > 0 ? (
          collectionPointsList.map((collectionPoint) => (
            <CollectionPointCard
              data={collectionPoint}
              key={collectionPoint.id}
              setRefreshList={setRefreshList}
            />
          ))
        ) : (
          <p>Não há nenhum ponto disponível</p>
        )}
      </section>

      {isRequestModalOpen && (
        <CollectionPointRequestModal
          handleModal={setIsRequestModalOpen}
          senderId={accountData.id}
        />
      )}
    </section>
  );
}
