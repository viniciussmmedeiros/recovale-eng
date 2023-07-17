import "./Toast.component.style.css";
import { useToastData } from "../../../context/toast/toast.context";

export function Toast() {
  const [toastData] = useToastData();

  return (
    toastData.show && (
      <div className={`toast ${toastData.customClass}`}>
        <p>{toastData.message}</p>
      </div>
    )
  );
}
