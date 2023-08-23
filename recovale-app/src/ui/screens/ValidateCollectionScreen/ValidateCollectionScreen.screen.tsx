import "./ValidateCollectionScreen.screen.style.css";
import { useEffect, useState } from "react";
import { useCollectionPointApi } from "../../../hooks/collectionPointApi/use-collection-point-api.hook";
import { useToastData } from "../../../context/toast/toast.context";
import { AxiosError } from "axios";
import { Map } from "../../components";

export function ValidateCollectionScreen() {
  const [, setToastData] = useToastData();
  const collectionPointApi = useCollectionPointApi();
  const [pendingCollectionList, setPendingCollectionList] = useState<
    any[] | null
  >();
  const [refreshList, setRefreshList] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await collectionPointApi.getPendingCollections();

        setPendingCollectionList(data);
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
  }, [collectionPointApi, setToastData, refreshList]);

  const handleValidation = async (data: any) => {
    try {
      await collectionPointApi.validateCollection(
        data.collectionPointId,
        data.id
      );
      setRefreshList((previousValue: boolean) => !previousValue);
      setToastData({
        show: true,
        message: "Coleta validada!",
        customClass: "success",
      });
    } catch (error) {
      setToastData({
        show: true,
        message: "Erro ocorreu durante a validação.",
        customClass: "error",
      });
    }
  };

  return (
    <section className="page-content">
      <h2>Validar Coleta</h2>
      <section className="map-list-wrapper">
        {pendingCollectionList && pendingCollectionList?.length > 0 ? (
          <>
            {pendingCollectionList.map((collectionRequest) => (
              <div key={collectionRequest.id}>
                <div className="collection-request-header">
                  <span>Coletor: {collectionRequest.recipientName}</span>
                  <span>Ponto de coleta: {collectionRequest.pointName}</span>
                </div>
                <Map
                  setLocation={null}
                  location={{
                    lat: collectionRequest.latitude,
                    lng: collectionRequest.longitude,
                  }}
                />
                <button onClick={() => handleValidation(collectionRequest)}>
                  Validar
                </button>
              </div>
            ))}
          </>
        ) : (
          <p>Nenhuma coleta pendente</p>
        )}
      </section>
    </section>
  );
}
