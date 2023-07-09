import { createContext, useContext, useEffect, useState } from "react";

const AccountContext = createContext();

export function AccountProvider({ children }) {
  const [accountData, setAccountDataState] = useState({});

  useEffect(() => {
    const storedAccountData = JSON.parse(
      localStorage.getItem("recovale_account_data") || "{}"
    );
    setAccountDataState(storedAccountData);
  }, []);

  const setAccountData = (data) => {
    localStorage.setItem("recovale_account_data", JSON.stringify(data));
    setAccountDataState(data);
  };

  return (
    <AccountContext.Provider value={{ accountData, setAccountData }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccountData() {
  const { accountData, setAccountData } = useContext(AccountContext);
  return [accountData, setAccountData];
}
