import { useState } from "react";

const DEFAULT_COLLECTION_POINT_DATA = {
  name: "",
  address: "",
  capacity: undefined,
  openingHours: "",
};

export function CollectionPointRegistrationModal() {
  const [collectionPointData, setCollectionPointData] = useState(
    DEFAULT_COLLECTION_POINT_DATA
  );

  const handleSetCollectionPointData = (e: any) => {
    const { name, value } = e.target;

    setCollectionPointData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  return (
    <div className="collection-point-registration-modal">
      <div className="modal-content">
        <button>X</button>
        <form action="">
          <label htmlFor="">
            Nome
            <input
              type="text"
              name="name"
              value={collectionPointData.name}
              onChange={(e) => handleSetCollectionPointData(e)}
            />
          </label>
          <label htmlFor="">
            Endereço
            <input
              type="text"
              name="address"
              value={collectionPointData.address}
              onChange={(e) => handleSetCollectionPointData(e)}
            />
          </label>
          <label htmlFor="">
            Capacidade
            <input
              type="number"
              name="capacity"
              value={collectionPointData.capacity}
              onChange={(e) => handleSetCollectionPointData(e)}
            />
          </label>
          <label htmlFor="">
            Horário de funcionamento
            <input
              type="text"
              name="openingHours"
              value={collectionPointData.openingHours}
              onChange={(e) => handleSetCollectionPointData(e)}
            />
          </label>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
