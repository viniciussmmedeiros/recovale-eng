import { useToastData } from "../../../context/toast/toast.context";
import { useCollectionPointApi } from "../../../hooks/collectionPointApi/use-collection-point-api.hook";
import {
  CollectionPointCard,
  CollectionPointRequestModal,
  RequestCard,
} from "../../components";
import "./ManageCollectionPoints.screen.style.css";
import { useState, useEffect } from "react";

export function ManageCollectionPointsScreen() {
  const [toastData, setToastData] = useToastData();
  const collectionPointsApi = useCollectionPointApi();
  const [showActivePoints, setShowActivePoints] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collectionPointsList, setCollectionPointsList] = useState<
    any[] | null
  >();
  const [requestsList, setRequestsList] = useState<any[] | null>();
  console.log(requestsList);
  console.log("active:", collectionPointsList);
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
  }, [showActivePoints]);

  return (
    <section className="page-content">
      <h2>Gerenciar pontos de coleta</h2>
      <button onClick={() => setIsModalOpen(true)}>Criar novo ponto</button>
      <div className="collection-points-page-switch">
        <button onClick={() => setShowActivePoints(true)}>Pontos Ativos</button>
        <button onClick={() => setShowActivePoints(false)}>
          Solicitações Pendentes
        </button>
      </div>

      {isModalOpen && (
        <CollectionPointRequestModal handleModal={setIsModalOpen} />
      )}

      {showActivePoints && (
        <section className="active-points-wrapper">
          {collectionPointsList && collectionPointsList?.length > 0 ? (
            collectionPointsList.map((collectionPoint) => (
              <CollectionPointCard data={collectionPoint} />
            ))
          ) : (
            <span>"Não há nenhum ponto ativo no momento"</span>
          )}
        </section>
      )}

      {!showActivePoints && (
        <section className="requests-wrapper">
          {requestsList && requestsList?.length > 0 ? (
            requestsList.map((request) => <RequestCard data={request} />)
          ) : (
            <span>"Não há nenhuma requisição pendente."</span>
          )}
        </section>
      )}
    </section>
  );
}
