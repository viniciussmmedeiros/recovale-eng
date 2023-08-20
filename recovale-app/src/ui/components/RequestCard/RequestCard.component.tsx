import "./RequestCard.component.style.css";
import { useState } from "react";
import { Map } from "../Map/Map.component";
import { useCollectionPointApi } from "../../../hooks/collectionPointApi/use-collection-point-api.hook";

export function RequestCard({ data }: any) {
  const collectionPointApi = useCollectionPointApi();
  const COLLECTION_POINT_DATA = {
    id: data.id,
    name: "",
    capacity: undefined,
  };
  const [isCardOpen, setIsCardOpen] = useState(false);
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

    await collectionPointApi.approveRequest(collectionPointData);
    // console.log(collectionPointData);
  };

  const handleRefusal = async () => {
    // console.log("estamos recusando");
    await collectionPointApi.refuseRequest(collectionPointData.id);
  };

  return (
    <>
      <div
        className="closed-card"
        onClick={() => setIsCardOpen((previousValue) => !previousValue)}
      >
        <span>{data.id} - </span>
        <span>{data.requestDate}</span>
      </div>
      {isCardOpen && (
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
      )}
    </>
  );
}
