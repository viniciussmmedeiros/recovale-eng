import "./CreatedAccountItem.component.style.css";
import { CreatedAccountModal } from "../CreatedAccountModal/CreatedAccountModal.component";
import { useState } from "react";

export function CreatedAccountItem({ data, setRefresh }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="created-account-item"
      >
        <span className="account-type">
          {data.type === "ADMIN" ? "(ADMIN)" : "(COLETOR)"}
        </span>
        <span>Username: {data.username}</span>
      </div>
      {isModalOpen && (
        <CreatedAccountModal
          data={data}
          handleModal={setIsModalOpen}
          setRefresh={setRefresh}
        />
      )}
    </>
  );
}
