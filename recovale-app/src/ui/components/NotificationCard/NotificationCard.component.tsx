import "./NotificationCard.component.style.css";
import { useState } from "react";
import { useCollectionPointApi } from "../../../hooks/collectionPointApi/use-collection-point-api.hook";
import { useToastData } from "../../../context/toast/toast.context";
import { Map } from "../Map/Map.component";
import { AxiosError } from "axios";

export function NotificationCard({ data, setRefreshList }: any) {
  const [, setToastData] = useToastData();
  const collectionPointApi = useCollectionPointApi();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleSchedule = async () => {
    try {
      await collectionPointApi.scheduleCollection(
        data.id,
        data.recipientId,
        data.requestId
      );
      setRefreshList((previousValue: boolean) => !previousValue);
      setToastData({
        show: true,
        message: "Agendado com sucesso!",
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
    <div className="notification-card-wrapper">
      <div
        className="notification-header"
        onClick={() => setIsNotificationOpen((previousValue) => !previousValue)}
      >
        <span>Ponto: {data.name}</span>
        <span>
          Capacidade: {data.currentCapacity} / {data.capacity}
        </span>
      </div>
      {isNotificationOpen && (
        <>
          <Map
            setLocation={null}
            location={{ lat: data.latitude, lng: data.longitude }}
          />
          <button onClick={() => handleSchedule()}>Agendar</button>
        </>
      )}
    </div>
  );
}
