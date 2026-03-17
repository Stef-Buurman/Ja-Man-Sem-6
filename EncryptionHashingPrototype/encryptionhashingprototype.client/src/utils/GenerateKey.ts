
export type EncryptedPayload = {
    encryptedKey?: string;
    encryptedData: string;
    iv: string;
};
export function arrayBufferToBase64(buffer: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

export function base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    return bytes.buffer;
}

export async function importPublicKey(pem: string): Promise<CryptoKey> {
    const binary = atob(
        pem.replace(/-----.*?-----/g, "").replace(/\s/g, "")
    );

    const buffer = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        buffer[i] = binary.charCodeAt(i);
    }

    return crypto.subtle.importKey(
        "spki",
        buffer,
        {
            name: "RSA-OAEP",
            hash: "SHA-256"
        },
        false,
        ["encrypt"]
    );
}

export async function generateAESKey(): Promise<CryptoKey> {
    return crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256
        },
        true,
        ["encrypt", "decrypt"]
    );
}

export async function encryptRequest(
  data: unknown,
  publicKey: CryptoKey
): Promise<{ payload: EncryptedPayload; aesKey: CryptoKey }> {
  const aesKey = await generateAESKey();

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(JSON.stringify(data));

  const encryptedData = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    aesKey,
    encoded
  );

  const rawKey = await crypto.subtle.exportKey("raw", aesKey);

  const encryptedKey = await crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    publicKey,
    rawKey
  );

  return {
    aesKey,
    payload: {
      encryptedKey: arrayBufferToBase64(encryptedKey),
      encryptedData: arrayBufferToBase64(encryptedData),
      iv: arrayBufferToBase64(iv.buffer)
    }
  };
}

export async function decryptResponse<T>(
  aesKey: CryptoKey,
  payload: EncryptedPayload
): Promise<T> {
  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: new Uint8Array(base64ToArrayBuffer(payload.iv))
    },
    aesKey,
    base64ToArrayBuffer(payload.encryptedData)
  );

  const json = new TextDecoder().decode(decrypted);
  return JSON.parse(json);
}

export async function secureFetch<T>(
  url: string,
  data: unknown,
  publicKey: CryptoKey
): Promise<T> {
  const { payload, aesKey } = await encryptRequest(data, publicKey);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const encryptedResponse: EncryptedPayload = await response.json();

  return decryptResponse<T>(aesKey, encryptedResponse);
}