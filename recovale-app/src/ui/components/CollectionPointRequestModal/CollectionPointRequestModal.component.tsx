import "./CollectionPointRequestModal.component.style.css";
import { useState } from "react";
import { Map } from "../Map/Map.component";
import { useCollectionPointApi } from "../../../hooks/collectionPointApi/use-collection-point-api.hook";
import { useAccountData } from "../../../context/account/account.context";

export function CollectionPointRequestModal({ handleModal, senderId }: any) {
  const [accountData] = useAccountData();
  const REQUEST_DATA = {
    latitude: undefined,
    longitude: undefined,
    senderId: senderId,
    requestDate: new Date(),
  };
  const REGISTER_DATA = {
    latitude: undefined,
    longitude: undefined,
    name: "",
    capacity: undefined,
  };
  const [requestData, setRequestData] = useState<any>(REQUEST_DATA);
  const [registerData, setRegisterData] = useState(REGISTER_DATA);
  const collectionPointApi = useCollectionPointApi();
  console.log("a", senderId, requestData);

  const handleRequest = async () => {
    // const requestDate = new Date();
    // setRequestData((previousData: any) => ({
    //   ...previousData,
    //   requestDate: requestDate,
    // }));
    console.log("uau, aqui está::", requestData);
    await collectionPointApi.makeRequest(requestData);
  };

  const handleRegistration = async () => {
    await collectionPointApi.registerPoint(registerData);
  };

  const handleSetLocation = (location: any) => {
    console.log("are we here ?", location);
    setRequestData((previousData: any) => ({
      ...previousData,
      latitude: location.lat,
      longitude: location.lng,
    }));
    setRegisterData((previousData: any) => ({
      ...previousData,
      latitude: location.lat,
      longitude: location.lng,
    }));
  };

  const handleSetData = (e: any) => {
    const { name, value } = e.target;

    setRegisterData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  return (
    <div className="collection-point-registration-modal">
      <div className="modal-content">
        <button onClick={() => handleModal(false)}>X</button>
        <section>
          <span>
            Selecione o local em que você gostaria de um ponto de coleta:
          </span>
          <Map setLocation={handleSetLocation} location={null} />
          {accountData.type === "ADMIN" && (
            <>
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
            </>
          )}
          <button
            onClick={
              accountData.type === "ADMIN"
                ? () => handleRegistration()
                : () => handleRequest()
            }
          >
            Concluir
          </button>
        </section>
      </div>
    </div>
  );
}
