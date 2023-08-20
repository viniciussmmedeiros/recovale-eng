import { useState } from "react";
import "./CollectionPointCard.component.style.css";
import { Map } from "../Map/Map.component";
import { useAccountData } from "../../../context/account/account.context";
import { useCollectionPointApi } from "../../../hooks/collectionPointApi/use-collection-point-api.hook";

export function CollectionPointCard({ data }: any) {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [accountData] = useAccountData();
  const collectionPoint = useCollectionPointApi();

  const handleDeletePoint = async () => {
    await collectionPoint.deletePoint(data.id);
  };

  return (
    <>
      <div onClick={() => setIsCardOpen((previousValue) => !previousValue)}>
        <span>
          {data.id} - {data.name} {data.currentCapacity} / {data.capacity}
        </span>
      </div>
      {isCardOpen && (
        <div>
          <Map
            setLocation={null}
            location={{ lat: data.latitude, lng: data.longitude }}
          />
          {accountData.type === "ADMIN" && (
            <button onClick={() => handleDeletePoint()}>Excluir ponto</button>
          )}
        </div>
      )}
    </>
  );
}
