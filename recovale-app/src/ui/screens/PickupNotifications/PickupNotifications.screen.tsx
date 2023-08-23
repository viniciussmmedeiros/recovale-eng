import "./PickupNotifications.screen.style.css";
import { useEffect, useState } from "react";
import { useCollectionPointApi } from "../../../hooks/collectionPointApi/use-collection-point-api.hook";
import { useAccountData } from "../../../context/account/account.context";
import { NotificationCard } from "../../components";
import { AxiosError } from "axios";
import { useToastData } from "../../../context/toast/toast.context";

export function PickupNotificationsScreen() {
  const [, setToastData] = useToastData();
  const collectionPointApi = useCollectionPointApi();
  const [accountData] = useAccountData();
  const [notificationList, setNotificationList] = useState<any[] | null>();
  const [refreshList, setRefreshList] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await collectionPointApi.getNotifications(accountData.id);

        setNotificationList(data);
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
  }, [accountData.id, collectionPointApi, setToastData, refreshList]);

  return (
    <section className="page-content">
      <h2>Agendar Retirada</h2>
      <section className="map-list-wrapper">
        {notificationList && notificationList?.length > 0 ? (
          <>
            {notificationList.map((notification) => (
              <NotificationCard
                data={notification}
                key={notification.id}
                setRefreshList={setRefreshList}
              />
            ))}
          </>
        ) : (
          <p>Nenhuma solicitação de coleta pendente</p>
        )}
      </section>
    </section>
  );
}
