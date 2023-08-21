import "./ManageWasteCollectionRequests.screen.style.css";
import { useEffect, useState } from "react";
import { useCollectionPointApi } from "../../../hooks/collectionPointApi/use-collection-point-api.hook";
import { WasteCollectionRequestCard } from "../../components";

export function ManageWasteCollectionRequestsScreen() {
  const collectionPointApi = useCollectionPointApi();
  const [wasteCollectionRequestList, setWasteCollectionRequestList] = useState<
    any[] | null
  >();

  useEffect(() => {
    const fetchData = async () => {
      const data = await collectionPointApi.getWasteCollectionRequests();

      setWasteCollectionRequestList(data);
    };

    fetchData();
  }, [collectionPointApi]);

  return (
    <section className="page-content">
      <h2>Solicitações de Coleta</h2>

      {wasteCollectionRequestList && wasteCollectionRequestList?.length > 0 ? (
        wasteCollectionRequestList.map((collectionRequest) => (
          <WasteCollectionRequestCard data={collectionRequest} />
        ))
      ) : (
        <p>"Nenhuma solicitação de coleta pendente"</p>
      )}
    </section>
  );
}
