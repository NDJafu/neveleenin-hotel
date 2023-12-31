import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRefreshMutation } from "./features/auth/authApiSlice";
import { useAppSelector } from "./utils/hooks";
import { useEffect } from "react";

//Page imports
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BrowseHotelsPage from "./pages/BrowseHotelsPage";
import HotelDetailsPage from "./pages/HotelDetailsPage";
import BookingPage from "./pages/BookingPage";
import PaymentPage from "./pages/PaymentPage";

//Admin
import DashboardPage from "./pages/admin/DashboardPage";
import ManageHotelPage from "./pages/admin/ManageHotelPage";

//Layout imports
import MainLayout from "./pages/MainLayout";
import BookingLayout from "./pages/BookingLayout";
import AdminLayout from "./pages/admin/AdminLayout";

//Partnership page imports
import HotelInformationPage from "./pages/partnership/HotelInformationPage";
import CreateRoomPage from "./pages/partnership/CreateRoomPage";
import PartnershipSteps from "./pages/partnership/PartnershipSteps";
import AddServicesPage from "./pages/partnership/AddServicesPage";
import AddAmenitiesPage from "./pages/partnership/AddAmenitiesPage";
import HotelPhotosPage from "./pages/partnership/HotelPhotosPage";
import AddPoliciesPage from "./pages/partnership/AddPoliciesPage";
import RegistrationCompletePage from "./pages/partnership/RegistrationCompletePage";
import BookingCompletePage from "./pages/BookingCompletePage";

function App() {
  const token = useAppSelector((state) => state.auth.token);
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const [refresh] = useRefreshMutation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      await refresh()
        .unwrap()
        .catch((error) => {
          console.log(error.data);
        });
    };

    if (!token) verifyRefreshToken();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route element={<MainLayout />}>
          <Route path="browse" element={<BrowseHotelsPage />} />
          <Route path="detail/:id" element={<HotelDetailsPage />} />
        </Route>

        <Route element={<BookingLayout />}>
          <Route path="booking/:id" element={<BookingPage />} />
          <Route path="payment/:id" element={<PaymentPage />} />
          <Route path="booking-complete" element={<BookingCompletePage />} />
          {token && (
            <Route path="partnership/register/*" element={<PartnershipSteps />}>
              <Route
                path="basic-information"
                element={<HotelInformationPage />}
              />
              <Route path="create-room" element={<CreateRoomPage />} />
              <Route path="facilities" element={<AddServicesPage />} />
              <Route path="amenities" element={<AddAmenitiesPage />} />
              <Route path="photos" element={<HotelPhotosPage />} />
              <Route path="policies" element={<AddPoliciesPage />} />
              <Route path="complete" element={<RegistrationCompletePage />} />
            </Route>
          )}
        </Route>

        {token && currentUser?.role == "admin" && (
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="manage-hotel" element={<ManageHotelPage />} />
            <Route path="manage-user" element={<div>manage user</div>} />
            <Route path="report" element={<div>report</div>} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;
