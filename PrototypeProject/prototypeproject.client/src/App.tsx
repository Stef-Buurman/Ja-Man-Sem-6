import { Route, Routes } from "react-router-dom";
import EncryptionPage from "./pages/EncryptionPage/EncryptionPage";
import { Layout } from "./components/Layout/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div>Home</div>} />
        <Route path="Encryption" element={<EncryptionPage />} />
      </Route>
    </Routes>
  );
}

export default App;
