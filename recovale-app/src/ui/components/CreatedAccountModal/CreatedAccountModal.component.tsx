import "./CreatedAccountModal.component.style.css";
import { useAdminApi } from "../../../hooks/adminApi/use-admin-api.hook";
import { useState } from "react";

export function CreatedAccountModal({ data, handleModal }: any) {
  const [accountData, setAccountData] = useState(data);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const adminApi = useAdminApi();

  const handleSetAccountData = (e: any) => {
    const { name, value } = e.target;
    setAccountData((previousData: any) => ({ ...previousData, [name]: value }));
    console.log(accountData);
  };

  const handleAccountUpdate = async () => {
    try {
      await adminApi.updateCreatedAccount(accountData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccountDeletion = async () => {
    try {
      await adminApi.deleteCreatedAccount(accountData.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="created-account-modal">
      <div className="modal-content">
        <button onClick={() => handleModal(false)} className="close-btn">
          X
        </button>
        <span>Editar conta</span>
        <span>{accountData.type}</span>
        <span>
          Username:
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={accountData.username}
              onChange={(e) => handleSetAccountData(e)}
            />
          ) : (
            accountData.username
          )}
        </span>
        <span>
          Senha:
          {isEditing ? (
            <input
              type="text"
              name="password"
              value={accountData.password}
              onChange={(e) => handleSetAccountData(e)}
            />
          ) : (
            accountData.password
          )}
        </span>
        <div>
          {isEditing && (
            <>
              <button onClick={() => setIsEditing(false)}>Cancelar</button>
              <button onClick={() => handleAccountUpdate()}>Salvar</button>
            </>
          )}
          {isDeleting && (
            <>
              <span>Tem certeza de que deseja deletar essa conta ?</span>
              <span>Operação irreversível</span>
              <button onClick={() => setIsDeleting(false)}>Cancelar</button>
              <button onClick={() => handleAccountDeletion()}>Confirmar</button>
            </>
          )}
          {!isEditing && !isDeleting && (
            <>
              <button onClick={() => setIsEditing(true)}>Editar</button>
              <button onClick={() => setIsDeleting(true)}>Deletar conta</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
