import "./CollectionPointRequestModal.component.style.css";
import { useState } from "react";
import { Map } from "../Map/Map.component";
import { useCollectionPointApi } from "../../../hooks/collectionPointApi/use-collection-point-api.hook";
import { useAccountData } from "../../../context/account/account.context";
import { AxiosError } from "axios";
import { useToastData } from "../../../context/toast/toast.context";

const DEFAULT_LAT = -30.0688247;
const DEFAULT_LNG = -51.1217022;

export function CollectionPointRequestModal({
  handleModal,
  senderId,
  setRefreshList,
}: any) {
  const [, setToastData] = useToastData();
  const [accountData] = useAccountData();
  const collectionPointApi = useCollectionPointApi();
  const REQUEST_DATA = {
    latitude: DEFAULT_LAT,
    longitude: DEFAULT_LNG,
    senderId: senderId,
    requestDate: new Date(),
  };
  const REGISTER_DATA = {
    latitude: DEFAULT_LAT,
    longitude: DEFAULT_LNG,
    name: "",
    capacity: undefined,
  };
  const [requestData, setRequestData] = useState<any>(REQUEST_DATA);
  const [registerData, setRegisterData] = useState(REGISTER_DATA);

  const handleRequest = async () => {
    try {
      await collectionPointApi.makeRequest(requestData);
      setToastData({
        show: true,
        message: "Solicitação de ponto de coleta enviada com sucesso!",
        customClass: "success",
      });
      // setRefreshList((previousValue: boolean) => !previousValue);
      handleModal(false);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setToastData({
        show: true,
        message: err.response?.data.message,
        customClass: "error",
      });
    }
  };

  const handleRegistration = async () => {
    try {
      await collectionPointApi.registerPoint(registerData);
      setToastData({
        show: true,
        message: "Ponto de coleta cadastrado com sucesso!",
        customClass: "success",
      });
      setRefreshList((previousValue: boolean) => !previousValue);
      handleModal(false);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setToastData({
        show: true,
        message: err.response?.data.message,
        customClass: "error",
      });
    }
  };

  const handleSetLocation = (location: any) => {
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
      <div className="modal-content collection-point-modal">
        <button onClick={() => handleModal(false)}>X</button>
        <section>
          <span>
            Selecione o local em que você gostaria de um ponto de coleta:
          </span>
          <p>
            *Clique sobre o marcador e em seguida sobre o pop up para movê-lo.
          </p>
          <Map setLocation={handleSetLocation} location={null} />
          {accountData.type === "ADMIN" && (
            <form>
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
            </form>
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
