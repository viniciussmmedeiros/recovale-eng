import "./RequestCard.component.style.css";
import { useState } from "react";
import { Map } from "../Map/Map.component";
import { useCollectionPointApi } from "../../../hooks/collectionPointApi/use-collection-point-api.hook";
import { AxiosError } from "axios";
import { useToastData } from "../../../context/toast/toast.context";

export function RequestCard({ data, setRefreshList }: any) {
  const [, setToastData] = useToastData();
  const collectionPointApi = useCollectionPointApi();
  const COLLECTION_POINT_DATA = {
    id: data.id,
    name: "",
    capacity: undefined,
  };
  const [collectionPointData, setCollectionPointData] = useState(
    COLLECTION_POINT_DATA
  );

  const handleSetData = (e: any) => {
    const { name, value } = e.target;

    setCollectionPointData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleApproval = async (e: any) => {
    e.preventDefault();

    try {
      await collectionPointApi.approveRequest(collectionPointData);
      setRefreshList((previousValue: boolean) => !previousValue);
      setToastData({
        show: true,
        message: "Ponto aprovado com sucesso!",
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

  const handleRefusal = async () => {
    try {
      await collectionPointApi.refuseRequest(collectionPointData.id);
      setRefreshList((previousValue: boolean) => !previousValue);
      setToastData({
        show: true,
        message: "Ponto recusado com sucesso!",
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
      <div className="closed-card">
        <span>Data de solicitação: {data.requestDate}</span>
      </div>
      <div className="card-body">
        <Map
          setLocation={null}
          location={{ lat: data.latitude, lng: data.longitude }}
        />
        <form onSubmit={handleApproval}>
          <label htmlFor="">
            Nome:{" "}
            <input
              type="text"
              name="name"
              required
              onChange={(e) => handleSetData(e)}
            />
          </label>
          <label htmlFor="">
            Capacidade:{" "}
            <input
              type="number"
              name="capacity"
              required
              onChange={(e) => handleSetData(e)}
            />
          </label>
          <button>Aprovar</button>
          <button type="button" onClick={handleRefusal}>
            Recusar
          </button>
        </form>
      </div>
    </>
  );
}
