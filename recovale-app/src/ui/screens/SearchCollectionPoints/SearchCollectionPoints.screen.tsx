import { useAccountData } from "../../../context/account/account.context";
import { useCollectionPointApi } from "../../../hooks/collectionPointApi/use-collection-point-api.hook";
import {
  CollectionPointCard,
  CollectionPointRequestModal,
} from "../../components";
import "./SearchCollectionPoints.screen.style.css";
import { useState, useEffect } from "react";

export function SearchCollectionPointsScreen() {
  const [accountData] = useAccountData();
  const collectionPointsApi = useCollectionPointApi();
  const [collectionPointsList, setCollectionPointsList] = useState([]);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await collectionPointsApi.getCollectionPoints();

      setCollectionPointsList(data);
    };

    fetchData();
  }, []);
  return (
    <section className="page-content">
      <h2>Pontos de Coleta</h2>

      {/* if user type sender --> mostrar o botão de solicitar ponto de coleta */}
      {accountData.type === "SENDER" && (
        <button onClick={() => setIsRequestModalOpen(true)}>
          Solicitar ponto de coleta
        </button>
      )}

      <input type="text" placeholder="pesquise" />

      {collectionPointsList.length > 0 &&
        collectionPointsList.map((collectionPoint) => (
          <CollectionPointCard data={collectionPoint} />
        ))}
      {isRequestModalOpen && (
        <CollectionPointRequestModal
          handleModal={setIsRequestModalOpen}
          senderId={accountData.id}
        />
      )}
      {accountData.type === "SENDER" && (
        <span>Suas requisições:</span>
        // get pending requests
      )}
    </section>
  );
}
