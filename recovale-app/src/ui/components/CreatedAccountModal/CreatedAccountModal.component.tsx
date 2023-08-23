import "./CreatedAccountModal.component.style.css";
import { useAdminApi } from "../../../hooks/adminApi/use-admin-api.hook";
import { useState } from "react";
import { useToastData } from "../../../context/toast/toast.context";
import { AxiosError } from "axios";

export function CreatedAccountModal({ data, handleModal, setRefresh }: any) {
  const [, setToastData] = useToastData();
  const adminApi = useAdminApi();
  const [accountData, setAccountData] = useState(data);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSetAccountData = (e: any) => {
    const { name, value } = e.target;
    setAccountData((previousData: any) => ({ ...previousData, [name]: value }));
  };

  const handleAccountUpdate = async () => {
    try {
      await adminApi.updateCreatedAccount(accountData);
      setRefresh((previousValue: boolean) => !previousValue);
      handleModal(false);
      setToastData({
        show: true,
        message: "Conta atualizada com sucesso.",
        customClass: "success",
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setToastData({
        show: true,
        message: err.response?.data.message,
        customClass: "error",
      });
    }
  };

  const handleAccountDeletion = async () => {
    try {
      await adminApi.deleteCreatedAccount(accountData.id);
      setRefresh((previousValue: boolean) => !previousValue);
      handleModal(false);
      setToastData({
        show: true,
        message: "Conta deletada com sucesso.",
        customClass: "success",
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setToastData({
        show: true,
        message: err.response?.data.message,
        customClass: "error",
      });
    }
  };

  return (
    <div className="created-account-modal">
      <div className="modal-content">
        <button onClick={() => handleModal(false)} className="close-btn">
          X
        </button>
        <span>Editar conta</span>
        <span>{accountData.type === "COLLECTOR" ? "Coletor" : "Admin"}</span>
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
            <div className="delete-created-account">
              <span>Tem certeza de que deseja deletar essa conta ?</span>
              <span>Operação irreversível</span>
              <button onClick={() => handleAccountDeletion()}>Confirmar</button>
              <button onClick={() => setIsDeleting(false)}>Cancelar</button>
            </div>
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
