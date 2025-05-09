import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./Components/PageNotFound.jsx";
import BalPage from "./Components/BalPage.jsx";
import AboutPage from "./Components/AboutPage.jsx";
import PrivacyPolicy from "./Components/PrivacyPolicy";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BalPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
