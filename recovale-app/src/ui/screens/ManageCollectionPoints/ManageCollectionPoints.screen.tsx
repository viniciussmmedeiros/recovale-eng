import "./ManageCollectionPoints.screen.style.css";
import { useToastData } from "../../../context/toast/toast.context";
import { useCollectionPointApi } from "../../../hooks/collectionPointApi/use-collection-point-api.hook";
import {
  CollectionPointCard,
  CollectionPointRequestModal,
  RequestCard,
} from "../../components";
import { useState, useEffect } from "react";

export function ManageCollectionPointsScreen() {
  const [, setToastData] = useToastData();
  const collectionPointsApi = useCollectionPointApi();
  const [showActivePoints, setShowActivePoints] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collectionPointsList, setCollectionPointsList] = useState<
    any[] | null
  >();
  const [requestsList, setRequestsList] = useState<any[] | null>();
  const [refreshList, setRefreshList] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (showActivePoints) {
          const data = await collectionPointsApi.getCollectionPoints();

          setCollectionPointsList(data);
        } else {
          const data = await collectionPointsApi.getRequests();

          setRequestsList(data);
        }
      } catch (error) {
        setToastData({
          show: true,
          message:
            "Ocorreu um erro durante a busca dos dados. Tente novamente!",
          customClass: "error",
        });
      }
    };

    fetchData();
  }, [showActivePoints, collectionPointsApi, setToastData, refreshList]);

  return (
    <section className="page-content">
      <h2>Gerenciar pontos de coleta</h2>
      <button onClick={() => setIsModalOpen(true)}>Criar novo ponto</button>
      <div className="collection-points-page-switch">
        <button
          className={`${showActivePoints && "active-type"}`}
          onClick={() => setShowActivePoints(true)}
        >
          Pontos Ativos
        </button>
        <button
          className={`${!showActivePoints && "active-type"}`}
          onClick={() => setShowActivePoints(false)}
        >
          Solicitações Pendentes
        </button>
      </div>

      {isModalOpen && (
        <CollectionPointRequestModal
          handleModal={setIsModalOpen}
          setRefreshList={setRefreshList}
        />
      )}

      {showActivePoints && (
        <section className="map-list-wrapper">
          {collectionPointsList && collectionPointsList?.length > 0 ? (
            collectionPointsList.map((collectionPoint) => (
              <CollectionPointCard
                data={collectionPoint}
                key={collectionPoint.id}
                setRefreshList={setRefreshList}
              />
            ))
          ) : (
            <span>Não há nenhum ponto ativo no momento.</span>
          )}
        </section>
      )}

      {!showActivePoints && (
        <section className="map-list-wrapper">
          {requestsList && requestsList?.length > 0 ? (
            requestsList.map((request) => (
              <RequestCard
                data={request}
                key={request.id}
                setRefreshList={setRefreshList}
              />
            ))
          ) : (
            <span>Não há nenhuma solicitação pendente.</span>
          )}
        </section>
      )}
    </section>
  );
}
