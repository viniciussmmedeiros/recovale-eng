import { useEffect, useState } from "react";
import "./ValidateCollectionScreen.screen.style.css";
import { useCollectionPointApi } from "../../../hooks/collectionPointApi/use-collection-point-api.hook";

export function ValidateCollectionScreen() {
  const collectionPointApi = useCollectionPointApi();
  const [pendingCollectionList, setPendingCollectionList] = useState<
    any[] | null
  >();

  useEffect(() => {
    const fetchData = async () => {
      const data = await collectionPointApi.getPendingCollections();

      setPendingCollectionList(data);
    };

    fetchData();
  }, []);

  const handleValidation = async (data: any) => {
    await collectionPointApi.validateCollection(
      data.id,
      data.collectionPointId
      // data.adminId
    );
  };

  return (
    <section className="page-content">
      <h2>Validar Coleta</h2>
      {pendingCollectionList && pendingCollectionList?.length > 0 ? (
        <>
          {pendingCollectionList.map((collectionRequest) => (
            <div>
              <span>Id - {collectionRequest.id}</span>
              <span>Usuário que solicitou: {collectionRequest.senderId}</span>
              <span>
                Ponto de coleta: {collectionRequest.collectionPointId}
              </span>
              <button onClick={() => handleValidation(collectionRequest)}>
                Validar
              </button>
            </div>
          ))}
        </>
      ) : (
        <p>"Nenhuma coleta pendente"</p>
      )}
    </section>
  );
}
