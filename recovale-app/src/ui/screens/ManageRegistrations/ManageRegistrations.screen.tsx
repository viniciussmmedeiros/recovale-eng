import "./ManageRegistrations.screen.style.css";
import { useAccountData } from "../../../context/account/account.context";
import { useAdminApi } from "../../../hooks/adminApi/use-admin-api.hook";
import { CreatedAccountItem } from "../../components";
import { useState, useEffect } from "react";

export function ManageRegistrationsScreen() {
  const [accountsDataList, setAccountsDataList] = useState<any[] | null>(null);
  const adminApi = useAdminApi();
  const [accountData] = useAccountData();

  useEffect(() => {
    const fetchAccountsList = async () => {
      const response = await adminApi.getCreatedAccounts(accountData.id);

      setAccountsDataList(response);
    };

    fetchAccountsList();
  }, []);

  return (
    <section className="page-content">
      <h2>Consultar Cadastros</h2>
      <div className="accounts-data-list-wrapper">
        {accountsDataList && accountsDataList.length > 0 ? (
          accountsDataList.map((item) => (
            <CreatedAccountItem key={item.id} data={item} />
          ))
        ) : (
          <p>Você ainda não cadastrou nenhum funcionário.</p>
        )}
      </div>
    </section>
  );
}
