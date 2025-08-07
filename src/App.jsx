import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./Components/PageNotFound.jsx";
import StartPage from "./Components/StartPage.jsx";
import BalPage from "./Components/BalPage.jsx";
import AboutPage from "./Components/AboutPage.jsx";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import HelpPage from "./Components/HelpPage.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/bal" element={<BalPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
