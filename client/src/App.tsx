import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BrowseHotelsPage from "./pages/BrowseHotelsPage";

function App() {
  alert(
    "this page is just an for education purpose, we don't own any of these, all rights reserved"
  );
  return (
    <Router>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="browse" element={<BrowseHotelsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
