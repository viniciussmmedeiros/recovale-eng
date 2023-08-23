import "./WasteCollectionRequestCard.component.style.css";
import { useEffect, useState } from "react";
import { useUserApi } from "../../../hooks/userApi/use-user-api.hook";
import { useCollectionPointApi } from "../../../hooks/collectionPointApi/use-collection-point-api.hook";
import { useToastData } from "../../../context/toast/toast.context";
import { AxiosError } from "axios";
import { Map } from "../Map/Map.component";

export function WasteCollectionRequestCard({ data, setRefreshList }: any) {
  const [, setToastData] = useToastData();
  const userApi = useUserApi();
  const collectionPointApi = useCollectionPointApi();
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [recipientsList, setRecipientsList] = useState<any[] | null>();
  const [selectedRecipients, setSelectedRecipients] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const response = await userApi.getRecipients();
        setRecipientsList(response);
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        setToastData({
          show: true,
          message: err.response?.data.message,
          customClass: "error",
        });
      }
    };

    fetchRecipients();
  }, [setToastData, userApi]);

  const handleSelectRecipient = (id: any, e: any) => {
    if (!selectedRecipients.includes(id)) {
      setSelectedRecipients((previousValue) => [...previousValue, id]);
    }
    if (selectedRecipients.includes(id) && e.target.checked === false) {
      setSelectedRecipients((previousValue) =>
        previousValue.filter((item) => item !== id)
      );
    }
  };

  const handleSendNotification = async () => {
    try {
      await collectionPointApi.sendNotification(selectedRecipients, data.id);
      setRefreshList((previousValue: boolean) => !previousValue);
      setToastData({
        show: true,
        message: "Notificação enviada com sucesso!",
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
    <div className="waste-collection-request-card-wrapper">
      <div
        className="request-card-header"
        onClick={() => setIsRequestOpen((previousValue) => !previousValue)}
      >
        <span>Ponto: {data.pointName} (clique para enviar notificação)</span>
        <span>
          Capacidade: {data.currentCapacity} / {data.capacity}
        </span>
      </div>
      <Map
        setLocation={null}
        location={{ lat: data.latitude, lng: data.longitude }}
      />
      {isRequestOpen && (
        <div>
          {recipientsList && recipientsList.length > 0 ? (
            <>
              {recipientsList.map((recipient) => (
                <div key={recipient.id}>
                  <input
                    type="checkbox"
                    onClick={(e) => handleSelectRecipient(recipient.id, e)}
                  />
                  <span>{recipient.id}</span>
                  <span>{recipient.username}</span>
                </div>
              ))}
              <button onClick={() => handleSendNotification()}>
                Enviar notificação
              </button>
            </>
          ) : (
            <p>"Nenhum destinatário cadastrado"</p>
          )}
        </div>
      )}
    </div>
  );
}
