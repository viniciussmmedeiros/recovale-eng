import "./AccountProfile.screen.style.css";
import { AxiosError } from "axios";
import { useAccountData } from "../../../context/account/account.context";
import { useAdminApi } from "../../../hooks/adminApi/use-admin-api.hook";
import { useUserApi } from "../../../hooks/userApi/use-user-api.hook";
import { useState } from "react";
import { useToastData } from "../../../context/toast/toast.context";
import { useNavigate } from "react-router-dom";
import { Map } from "../../components";

export function AccountProfileScreen() {
  const navigate = useNavigate();
  const [, setToastData] = useToastData();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [accountData, setAccountData] = useAccountData();
  const DEFAULT_COMMON_DATA = {
    username: accountData.username,
    password: accountData.password,
  };
  const DEFAULT_USER_DATA = {
    email: accountData.email,
    cpfCnpj: accountData.cpf,
  };
  const [commonData, setCommonData] = useState(DEFAULT_COMMON_DATA);
  const [userData, setUserData] = useState(DEFAULT_USER_DATA);
  const adminApi = useAdminApi();
  const userApi = useUserApi();
  const handleSaveChanges = async () => {
    try {
      if (accountData.type === "ADMIN") {
        await adminApi.updateProfile(accountData.id, commonData);
      } else {
        await userApi.updateProfile(accountData.id, {
          ...commonData,
          ...userData,
        });
      }
      setAccountData({ ...accountData, ...userData, ...commonData });
      setToastData({
        show: true,
        customClass: "success",
        message: "Dados atualizados!",
      });
      setIsEditing(false);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setToastData({
        show: true,
        message: err.response?.data.message,
        customClass: "error",
      });
    }
  };

  const handleSetCommonData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCommonData((previousData) => ({ ...previousData, [name]: value }));
  };

  const handleSetUserData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUserData((previousData) => ({ ...previousData, [name]: value }));
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    setCommonData(DEFAULT_COMMON_DATA);
    setUserData(DEFAULT_USER_DATA);
  };

  const handleAccountDeletion = async () => {
    try {
      await userApi.deleteAccount(accountData.id);
      localStorage.removeItem("recovale_account_data");
      setAccountData({});
      navigate("/*");
      setToastData({
        show: true,
        customClass: "success",
        message: "Conta deletada com sucesso!",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="page-content">
      <h2>Seu Perfil</h2>
      <div className="account-profile-form">
        <label>
          Username:
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={commonData.username}
              onChange={(e) => handleSetCommonData(e)}
            />
          ) : (
            <span>{commonData.username}</span>
          )}
        </label>

        <label>
          {accountData.type !== "ADMIN" && "Email:"}
          {isEditing && accountData.type !== "ADMIN" ? (
            <input
              type="text"
              name="email"
              value={userData.email}
              onChange={(e) => handleSetUserData(e)}
            />
          ) : (
            <span>{userData.email}</span>
          )}
        </label>

        <label>
          {accountData.type === "SENDER" && "CPF"}
          {accountData.type === "RECIPIENT" && "CNPJ"}
          {isEditing && accountData.type !== "ADMIN" ? (
            <input
              type="text"
              name="cpfCnpj"
              value={userData.cpfCnpj}
              onChange={(e) => handleSetUserData(e)}
            />
          ) : (
            <span>{userData.cpfCnpj}</span>
          )}
        </label>

        <label>
          Senha:
          {isEditing ? (
            <input
              type="text"
              name="password"
              value={commonData.password}
              onChange={(e) => handleSetCommonData(e)}
            />
          ) : (
            <span>{commonData.password}</span>
          )}
        </label>
      </div>

      {isEditing && (
        <div className="account-profile-editing-buttons">
          <button className="cancel-btn" onClick={handleCancelEditing}>
            Cancelar
          </button>
          <button className="save-btn" onClick={handleSaveChanges}>
            Salvar
          </button>
        </div>
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
          <button
            className="account-profile-edit-btn"
            onClick={() => setIsEditing(true)}
          >
            Editar informações
          </button>
          <button
            className="account-profile-edit-btn"
            onClick={() => setIsDeleting(true)}
          >
            Deletar conta
          </button>
        </>
      )}
    </section>
  );
}
