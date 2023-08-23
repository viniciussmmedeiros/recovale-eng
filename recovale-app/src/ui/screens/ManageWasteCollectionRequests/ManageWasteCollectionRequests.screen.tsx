import "./ManageWasteCollectionRequests.screen.style.css";
import { useEffect, useState } from "react";
import { useCollectionPointApi } from "../../../hooks/collectionPointApi/use-collection-point-api.hook";
import { WasteCollectionRequestCard } from "../../components";
import { AxiosError } from "axios";
import { useToastData } from "../../../context/toast/toast.context";

export function ManageWasteCollectionRequestsScreen() {
  const [, setToastData] = useToastData();
  const collectionPointApi = useCollectionPointApi();
  const [wasteCollectionRequestList, setWasteCollectionRequestList] = useState<
    any[] | null
  >();
  const [refreshList, setRefreshList] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await collectionPointApi.getWasteCollectionRequests();

        setWasteCollectionRequestList(data);
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

  return (
    <section className="page-content">
      <h2>Solicitações de Coleta</h2>

      <section className="map-list-wrapper">
        {wasteCollectionRequestList &&
        wasteCollectionRequestList?.length > 0 ? (
          wasteCollectionRequestList.map((collectionRequest) => (
            <WasteCollectionRequestCard
              data={collectionRequest}
              key={collectionRequest.id}
              setRefreshList={setRefreshList}
            />
          ))
        ) : (
          <p>Nenhuma solicitação de coleta pendente</p>
        )}
      </section>
    </section>
  );
}
