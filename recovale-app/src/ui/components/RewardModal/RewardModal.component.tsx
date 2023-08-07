import "./RewardModal.component.style.css";
import { useState } from "react";
import { useRewardApi } from "../../../hooks/rewardApi/use-reward-api.hook";

export function RewardModal({ data, handleModal }: any) {
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

  const handleRewardRegistration = (e: any) => {
    e.preventDefault();

    const handleRegistration = async () => {
      await rewardApi.registerReward(rewardData);
    };

    handleRegistration();
  };

  const handleRewardDeletion = async () => {
    await rewardApi.deleteReward(data.id);
  };

  const handleRewardUpdate = async () => {
    await rewardApi.updateReward(data.id, rewardData);
  };

  return (
    <>
      <div className="reward-registration-modal">
        <div className="modal-content">
          <button onClick={() => handleModal(false)}>X</button>
          <form onSubmit={handleRewardRegistration}>
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
            {!data && <button type="submit">Cadastrar</button>}
            {data && !isEditing && !isDeleting && (
              <>
                <button onClick={() => setIsEditing(true)}>Atualizar</button>
                <button type="button" onClick={() => setIsDeleting(true)}>
                  Deletar
                </button>
              </>
            )}
            {isEditing && (
              <>
                <button onClick={() => setIsEditing(false)}>Cancelar</button>
                <button onClick={() => handleRewardUpdate()}>Salvar</button>
              </>
            )}
            {isDeleting && (
              <>
                <span>Tem certeza de que deseja deletar essa conta ?</span>
                <span>Operação irreversível</span>
                <button onClick={() => setIsDeleting(false)}>Cancelar</button>
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
