import { useToast } from "./components/toast-manager/toast-context";
import EncryptionPage from "./pages/EncryptionPage/EncryptionPage";

function App() {
  useToast();
  return (
    <div>
      <EncryptionPage />
    </div>
  );
}

export default App;
