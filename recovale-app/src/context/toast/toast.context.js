import { useState, useEffect, createContext, useContext } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toastData, setToastData] = useState({
    show: false,
    message: "",
    customClass: "",
  });

  useEffect(() => {
    if (toastData.show) {
      const timeout = setTimeout(() => {
        setToastData((previousData) => ({ ...previousData, show: false }));
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [toastData.show]);

  return (
    <ToastContext.Provider value={{ toastData, setToastData }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToastData() {
  const { toastData, setToastData } = useContext(ToastContext);

  return [toastData, setToastData];
}
