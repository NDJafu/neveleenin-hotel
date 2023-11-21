import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BrowseHotelsPage from "./pages/BrowseHotelsPage";
import MainLayout from "./components/MainLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  alert(
    "this page is just an for education purpose, we don't own any of these, all rights reserved"
  );
  return (
    <Router>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="*" element={<MainLayout />}>
          <Route path="browse" element={<BrowseHotelsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
