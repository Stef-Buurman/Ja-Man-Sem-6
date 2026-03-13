import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EncryptionPage.css";

const API = "/api/encryption";

interface ApiResponse {
  success: boolean;
  data: any;
  message: string;
}

export default function EncryptionPage() {
  const [data, setData] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");
  const [keys, setKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleApiCall = async (endpoint: string, body?: any) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/${endpoint}`, {
        method: body ? "POST" : "GET",
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      });

      const json: ApiResponse = await res.json();

      if (!res.ok || !json.success) {
        toast.error(json.message || "API call failed", { autoClose: 4000 });
        throw new Error(json.message);
      }

      toast.success(json.message, { autoClose: 3000 });
      return json.data;
    } catch (err: any) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const encrypt = async () => {
    try {
      const response = await handleApiCall("encrypt", { data, key });
      setResult(response);
    } catch { }
  };

  const decrypt = async () => {
    try {
      const response = await handleApiCall("decrypt", { data, key });
      setResult(response);
    } catch { }
  };

  const hash = async () => {
    try {
      const response = await handleApiCall(
        `hash?data=${encodeURIComponent(data)}`,
      );
      setResult(response);
    } catch { }
  };

  const generateKeys = async () => {
    try {
      const response = await handleApiCall("keys");
      setKeys(response);
    } catch { }
  };

  const copyResult = async () => {
    if (!result) {
      toast.warn("Nothing to copy");
      return;
    }

    try {
      await navigator.clipboard.writeText(result);
      toast.success("Result copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy result");
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
        <button className="btn" onClick={generateKeys} disabled={loading}>
          Generate Keys
        </button>
        <button
          className="btn btn-encrypt"
          onClick={encrypt}
          disabled={loading}
        >
          Encrypt
        </button>
        <button
          className="btn btn-decrypt"
          onClick={decrypt}
          disabled={loading}
        >
          Decrypt
        </button>
        <button className="btn btn-hash" onClick={hash} disabled={loading}>
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

        <textarea
          className="input-area"
          value={result}
          readOnly
          rows={6}
        />
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
}
