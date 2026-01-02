import "./App.css";
import { ModalProvider } from "./Components/ModalContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutPage from "./Components/AboutPage.jsx";
import BalPage from "./Components/BalPage.jsx";
import HelpPage from "./Components/HelpPage.jsx";
import OverviewPage from "./Components/OverviewPage.jsx";
import PageNotFound from "./Components/PageNotFound.jsx";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import StartPage from "./Components/StartPage.jsx";

function App() {
  return (
    <div>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/bal" element={<BalPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/overview" element={<OverviewPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </div>
  );
}

export default App;


