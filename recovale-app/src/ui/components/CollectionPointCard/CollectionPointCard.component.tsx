import "./CollectionPointCard.component.style.css";
import { Map } from "../Map/Map.component";
import { useAccountData } from "../../../context/account/account.context";
import { useCollectionPointApi } from "../../../hooks/collectionPointApi/use-collection-point-api.hook";
import { useToastData } from "../../../context/toast/toast.context";
import { AxiosError } from "axios";

export function CollectionPointCard({ data, setRefreshList }: any) {
  const [, setToastData] = useToastData();
  const [accountData] = useAccountData();
  const collectionPoint = useCollectionPointApi();

  const handleDeletePoint = async () => {
    try {
      await collectionPoint.deletePoint(data.id);
      setToastData({
        show: true,
        message: "Ponto de coleta excluído com sucesso!",
        customClass: "success",
      });
      setRefreshList((previousValue: boolean) => !previousValue);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setToastData({
        show: true,
        message: err.response?.data.message,
        customClass: "error",
      });
    }
  };

  const handleRequestCollection = async () => {
    try {
      await collectionPoint.requestCollection(data.id, accountData.id);
      setToastData({
        show: true,
        message: "Coleta solicitada!",
        customClass: "success",
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setToastData({
        show: true,
        message: err.response?.data.message,
        customClass: "error",
      });
    }
  };

  return (
    <>
      <div>
        <span>
          Ponto: {data.name} | Capacidade: {data.currentCapacity} /{" "}
          {data.capacity}
        </span>
      </div>
      <div>
        <Map
          setLocation={null}
          location={{ lat: data.latitude, lng: data.longitude }}
        />
        {accountData.type === "ADMIN" && (
          <button onClick={() => handleDeletePoint()}>Excluir ponto</button>
        )}
        {accountData.type === "SENDER" && (
          <button onClick={() => handleRequestCollection()}>
            Solicitar coleta
          </button>
        )}
      </div>
    </>
  );
}
