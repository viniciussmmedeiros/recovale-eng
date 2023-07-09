import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  AccountProfileScreen,
  AdminRegistrationScreen,
  CollectorRegistrationScreen,
  LayoutScreen,
  LoginRegistrationScreen,
  ClaimRewardScreen,
} from "./ui/screens";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<LoginRegistrationScreen />} />
        <Route
          path="/your-profile"
          element={
            <LayoutScreen>
              <AccountProfileScreen />
            </LayoutScreen>
          }
        />
        <Route
          path="/register-admin"
          element={
            <LayoutScreen>
              <AdminRegistrationScreen />
            </LayoutScreen>
          }
        />
        <Route
          path="/register-collector"
          element={
            <LayoutScreen>
              <CollectorRegistrationScreen />
            </LayoutScreen>
          }
        />
        <Route
          path="/search-rewards"
          element={
            <LayoutScreen>
              <ClaimRewardScreen />
            </LayoutScreen>
          }
        />
      </Routes>
    </>
  );
}

export default App;
