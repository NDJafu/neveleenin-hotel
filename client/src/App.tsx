import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BrowseHotelsPage from "./pages/BrowseHotelsPage";
import MainLayout from "./pages/MainLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HotelDetailsPage from "./pages/HotelDetailsPage";
import { useRefreshMutation } from "./features/auth/authApiSlice";
import { useAppSelector } from "./utils/hooks";
import { useEffect } from "react";
import AdminLayout from "./pages/admin/AdminLayout";
import NotFound from "./pages/NotFound";
import BookingPage from "./pages/BookingPage";
import BookingLayout from "./pages/BookingLayout";
import PaymentPage from "./pages/PaymentPage";

function App() {
  const token = useAppSelector((state) => state.auth.token);

  const [refresh] = useRefreshMutation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      }
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
          <Route path="payment" element={<PaymentPage />} />
        </Route>

        {token && (
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<div>hello</div>} />
            <Route path="manage-hotel" element={<div>manage hotel</div>} />
            <Route path="manage-user" element={<div>manage user</div>} />
            <Route path="report" element={<div>report</div>} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;
