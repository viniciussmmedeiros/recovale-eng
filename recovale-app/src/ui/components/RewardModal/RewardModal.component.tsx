import "./RewardModal.component.style.css";
import { useState } from "react";
import { useRewardApi } from "../../../hooks/rewardApi/use-reward-api.hook";
import { useToastData } from "../../../context/toast/toast.context";
import { AxiosError } from "axios";

export function RewardModal({ data, handleModal, setRefreshList }: any) {
  const [, setToastData] = useToastData();
  const rewardApi = useRewardApi();
  const DEFAULT_REWARD_DATA = {
    title: data ? data.title : "",
    description: data ? data.description : "",
    points: data ? data.points : "",
    quantityAvailable: data ? data.quantityAvailable : "",
  };
  const [rewardData, setRewardData] = useState<any>(
    data ? data : DEFAULT_REWARD_DATA
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSetRewardData = (e: any) => {
    const { name, value } = e.target;

    setRewardData((previousData: any) => ({ ...previousData, [name]: value }));
  };

  const handleRewardRegistration = async (e: any) => {
    e.preventDefault();
    try {
      await rewardApi.registerReward(rewardData);
      setRefreshList((previousValue: boolean) => !previousValue);
      handleModal(false);
      setToastData({
        show: true,
        customClass: "success",
        message: "Recompensa criada com sucesso!",
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

  const handleRewardDeletion = async () => {
    try {
      await rewardApi.deleteReward(data.id);
      setRefreshList((previousValue: boolean) => !previousValue);
      handleModal(false);
      setToastData({
        show: true,
        customClass: "success",
        message: "Recompensa deletada com sucesso!",
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

  const handleRewardUpdate = async () => {
    try {
      await rewardApi.updateReward(data.id, rewardData);
      setRefreshList((previousValue: boolean) => !previousValue);
      handleModal(false);
      setToastData({
        show: true,
        customClass: "success",
        message: "Recompensa atualizada com sucesso!",
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
    <>
      <div className="reward-registration-modal">
        <div className="modal-content">
          <button onClick={() => handleModal(false)}>X</button>
          <form
            onSubmit={handleRewardRegistration}
            className="reward-registration-form"
          >
            <label htmlFor="">
              Título
              <input
                type="text"
                name="title"
                value={rewardData.title}
                onChange={(e) => handleSetRewardData(e)}
              />
            </label>
            <label htmlFor="">
              Descrição
              <input
                type="text"
                name="description"
                value={rewardData.description}
                onChange={(e) => handleSetRewardData(e)}
              />
            </label>
            <label htmlFor="">
              Quantidade de pontos necessários para resgate
              <input
                type="number"
                name="points"
                value={rewardData.points}
                onChange={(e) => handleSetRewardData(e)}
              />
            </label>
            <label htmlFor="">
              Quantidade disponível
              <input
                type="number"
                name="quantityAvailable"
                value={rewardData.quantityAvailable}
                onChange={(e) => handleSetRewardData(e)}
              />
            </label>
            {!data && (
              <button type="submit" className="reward-register-btn">
                Cadastrar
              </button>
            )}
            {data && !isEditing && !isDeleting && (
              <div className="reward-update-btns">
                <button type="button" onClick={() => setIsEditing(true)}>
                  Atualizar
                </button>
                <button type="button" onClick={() => setIsDeleting(true)}>
                  Deletar
                </button>
              </div>
            )}
            {isEditing && (
              <>
                <button type="button" onClick={() => setIsEditing(false)}>
                  Cancelar
                </button>
                <button type="button" onClick={() => handleRewardUpdate()}>
                  Salvar
                </button>
              </>
            )}
            {isDeleting && (
              <>
                <span>Tem certeza de que deseja deletar essa recompensa ?</span>
                <span>Operação irreversível</span>
                <button type="button" onClick={() => setIsDeleting(false)}>
                  Cancelar
                </button>
                <button type="button" onClick={() => handleRewardDeletion()}>
                  Confirmar
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
