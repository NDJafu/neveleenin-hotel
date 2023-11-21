import { Outlet } from "react-router-dom";
import Header from "./common/Header";
import Footer from "./common/Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
