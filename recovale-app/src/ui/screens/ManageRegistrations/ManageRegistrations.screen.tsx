import "./ManageRegistrations.screen.style.css";
import { useAccountData } from "../../../context/account/account.context";
import { useAdminApi } from "../../../hooks/adminApi/use-admin-api.hook";
import { CreatedAccountItem } from "../../components";
import { useState, useEffect } from "react";
import { useToastData } from "../../../context/toast/toast.context";
import { AxiosError } from "axios";

export function ManageRegistrationsScreen() {
  const [, setToastData] = useToastData();
  const [accountData] = useAccountData();
  const adminApi = useAdminApi();
  const [accountsDataList, setAccountsDataList] = useState<any[] | null>(null);
  const [refreshList, setRefreshList] = useState(false);

  useEffect(() => {
    const fetchAccountsList = async () => {
      try {
        const response = await adminApi.getCreatedAccounts(accountData.id);

        setAccountsDataList(response);
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        setToastData({
          show: true,
          message: err.response?.data.message,
          customClass: "error",
        });
      }
    };

    fetchAccountsList();
  }, [accountData.id, adminApi, setToastData, refreshList]);

  return (
    <section className="page-content">
      <h2>Consultar Cadastros</h2>
      <div className="accounts-data-list-wrapper">
        {accountsDataList && accountsDataList.length > 0 ? (
          accountsDataList.map((item) => (
            <CreatedAccountItem
              key={item.id}
              data={item}
              setRefresh={setRefreshList}
            />
          ))
        ) : (
          <p>Você não tem nenhum funcionário cadastrado.</p>
        )}
      </div>
    </section>
  );
}
