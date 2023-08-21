import { useState } from "react";
import "./NotificationCard.component.style.css";
import { useCollectionPointApi } from "../../../hooks/collectionPointApi/use-collection-point-api.hook";

export function NotificationCard({ data }: any) {
  const collectionPointApi = useCollectionPointApi();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleSchedule = async () => {
    await collectionPointApi.scheduleCollection(
      data.id,
      data.recipientId,
      data.requestId
    );
  };

  return (
    <div
      onClick={() => setIsNotificationOpen((previousValue) => !previousValue)}
    >
      <span>{data.id}</span>
      <span>{data.recipientId}</span>
      {isNotificationOpen && (
        <button onClick={() => handleSchedule()}>Agendar</button>
      )}
    </div>
  );
}
