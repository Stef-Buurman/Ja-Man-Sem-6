import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./EncryptionPage.css";
import { encryptionDecryptCreate, encryptionEncryptCreate, encryptionHashList, encryptionKeysList, encryptionPublicKeyList } from "../../api/methods/Encryption.api";
import { globalToastRef } from "../../components/toast-manager/toast-context";
import { importPublicKey, secureFetch } from "../../utils/generateKey";

export default function EncryptionPage() {
  const [data, setData] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    testEncryption();
  }, []);

  const testEncryption = async () => {
    var res = await encryptionPublicKeyList();
    if (res.ok) {
      const publicKey = await importPublicKey(res.response);

      const result = await secureFetch(
        "/api/Encryption/encrypt",
        { message: "hello" },
        publicKey
      );
      console.log("Encrypted response:", result);
    }
  }

  const encrypt = async () => {
    try {
      const response = await encryptionEncryptCreate({ data, key });
      if (response.ok) {
        setResult(response.response.data || "");
      }
    } catch { }
  };

  const decrypt = async () => {
    try {
      const result = await encryptionDecryptCreate({ data, key });
      if (result.ok) {
        setResult(result.response.data || "");
      }
    } catch { }
  };

  const hash = async () => {
    try {
      const response = await encryptionHashList({ data });
      if (response.ok) {
        setResult(response.response.data || "");
      }
    } catch { }
  };

  const generateKeys = async () => {
    try {
      const result = await encryptionKeysList();
      if (result.ok) {
        setKeys(result.response.data || []);
      }
    } catch { }
  };

  const copyResult = async () => {
    if (!result) {
      globalToastRef.current?.showToastError("No result to copy", "Copy Failed");
      return;
    }

    try {
      await navigator.clipboard.writeText(result);
      globalToastRef.current?.showToastSuccess("Result copied to clipboard", "Copy Successful");
    } catch (err) {
      globalToastRef.current?.showToastError("Failed to copy result", "Copy Failed");
    }
  };

  return (
    <div className="api-tester-container">
      <h2 className="title">Encryption API Tester</h2>

      <div className="section">
        <label>Data</label>
        <textarea
          className="input-area"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Enter text or JSON here..."
        />
      </div>

      <div className="section">
        <label>Key</label>
        <input
          className="input-field"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter or select a key"
        />
      </div>

      <div className="button-group">
        <button className="btn" onClick={generateKeys}>
          Generate Keys
        </button>
        <button
          className="btn btn-encrypt"
          onClick={encrypt}
        >
          Encrypt
        </button>
        <button
          className="btn btn-decrypt"
          onClick={decrypt}
        >
          Decrypt
        </button>
        <button className="btn btn-hash" onClick={hash}>
          Hash
        </button>
      </div>

      {keys.length > 0 && (
        <div className="section keys-section">
          <h3>Generated Keys</h3>
          <div className="keys-list">
            {keys.map((k, i) => (
              <div key={i} className="key-item">
                <button className="btn btn-small" onClick={() => setKey(k)}>
                  Use
                </button>
                <code className="key-code">{k}</code>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="section">
        <div className="result-header">
          <h3>Result</h3>
          <button className="btn btn-small" onClick={copyResult}>
            Copy
          </button>
        </div>

        <textarea className="input-area" value={result} readOnly rows={6} />
      </div>
    </div>
  );
}
