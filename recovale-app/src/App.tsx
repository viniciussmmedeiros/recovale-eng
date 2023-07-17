import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  AccountProfileScreen,
  AdminRegistrationScreen,
  CollectorRegistrationScreen,
  LayoutScreen,
  LoginRegistrationScreen,
  ClaimRewardScreen,
  ManageCollectionPointsScreen,
  ManageRewardsScreen,
  SearchCollectionPointsScreen,
  RankingScreen,
} from "./ui/screens";
import { ManageRegistrationsScreen } from "./ui/screens/ManageRegistrations/ManageRegistrations.screen";
import { SchedulePickupScreen } from "./ui/screens/SchedulePickup/SchedulePickup.screen";
import { Toast } from "./ui/components/Toast/Toast.component";

function App() {
  return (
    <>
      <Toast />
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
        <Route
          path="/collection-points-management"
          element={
            <LayoutScreen>
              <ManageCollectionPointsScreen />
            </LayoutScreen>
          }
        />
        <Route
          path="/rewards-management"
          element={
            <LayoutScreen>
              <ManageRewardsScreen />
            </LayoutScreen>
          }
        />
        <Route
          path="/registrations-management"
          element={
            <LayoutScreen>
              <ManageRegistrationsScreen />
            </LayoutScreen>
          }
        />
        <Route
          path="/search-collection-points"
          element={
            <LayoutScreen>
              <SearchCollectionPointsScreen />
            </LayoutScreen>
          }
        />
        <Route
          path="/ranking"
          element={
            <LayoutScreen>
              <RankingScreen />
            </LayoutScreen>
          }
        />
        <Route
          path="/schedule-pickup"
          element={
            <LayoutScreen>
              <SchedulePickupScreen />
            </LayoutScreen>
          }
        />
      </Routes>
    </>
  );
}

export default App;
