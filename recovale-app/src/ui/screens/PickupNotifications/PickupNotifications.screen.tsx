import { useEffect, useState } from "react";
import "./PickupNotifications.screen.style.css";
import { useCollectionPointApi } from "../../../hooks/collectionPointApi/use-collection-point-api.hook";
import { useAccountData } from "../../../context/account/account.context";
import { NotificationCard } from "../../components";

export function PickupNotificationsScreen() {
  const collectionPointApi = useCollectionPointApi();
  const [accountData] = useAccountData();
  const [notificationList, setNotificationList] = useState<any[] | null>();

  console.log(notificationList);

  useEffect(() => {
    const fetchData = async () => {
      const data = await collectionPointApi.getNotifications(accountData.id);

      setNotificationList(data);
    };

    fetchData();
  }, [accountData.id, collectionPointApi]);

  return (
    <section className="page-content">
      <h2>Agendar Retirada</h2>
      {notificationList && notificationList?.length > 0 ? (
        <>
          {notificationList.map((notification) => (
            <NotificationCard data={notification} />
          ))}
        </>
      ) : (
        <p>"Nenhuma solicitação de coleta pendente"</p>
      )}
    </section>
  );
}
