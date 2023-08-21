import { useEffect, useState } from "react";
import "./WasteCollectionRequestCard.component.style.css";
import { useUserApi } from "../../../hooks/userApi/use-user-api.hook";
import { useCollectionPointApi } from "../../../hooks/collectionPointApi/use-collection-point-api.hook";

export function WasteCollectionRequestCard({ data }: any) {
  console.log("data", data);
  const userApi = useUserApi();
  const collectionPointApi = useCollectionPointApi();
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [recipientsList, setRecipientsList] = useState<any[] | null>();
  const [selectedRecipients, setSelectedRecipients] = useState<any[]>([]);
  console.log(recipientsList);
  console.log(selectedRecipients);
  useEffect(() => {
    const fetchRecipients = async () => {
      const response = await userApi.getRecipients();
      await setRecipientsList(response);
    };

    fetchRecipients();
  }, []);

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
    await collectionPointApi.sendNotification(selectedRecipients, data.id);
    setIsRequestOpen(false);
  };

  return (
    <div
      className="waste-collection-request-card-wrapper"
      onClick={() => setIsRequestOpen(true)}
    >
      <span>{data.id}</span>
      <span>{data.senderId}</span>
      <span>{data.collectionPointId}</span>
      <span>{data.status}</span>

      {isRequestOpen && (
        <div>
          {recipientsList && recipientsList.length > 0 ? (
            <>
              {recipientsList.map((recipient) => (
                <div>
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
