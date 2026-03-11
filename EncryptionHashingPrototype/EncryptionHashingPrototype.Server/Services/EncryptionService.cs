using System.Security.Cryptography;
using System.Text;

namespace EncryptionHashingPrototype.Server.Services
{
    public class EncryptionService
    {
        public string Encrypt(string data, string key)
        {
            using var aes = Aes.Create();

            aes.Key = Convert.FromBase64String(key);
            aes.GenerateIV();

            var encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

            var dataBytes = Encoding.UTF8.GetBytes(data);
            var encrypted = encryptor.TransformFinalBlock(dataBytes, 0, dataBytes.Length);

            var result = aes.IV.Concat(encrypted).ToArray();

            return Convert.ToBase64String(result);
        }

        public string Decrypt(string encryptedData, string key)
        {
            using var aes = Aes.Create();

            var fullCipher = Convert.FromBase64String(encryptedData);

            var iv = fullCipher.Take(16).ToArray();
            var cipher = fullCipher.Skip(16).ToArray();

            aes.Key = Convert.FromBase64String(key);
            aes.IV = iv;

            var decryptor = aes.CreateDecryptor(aes.Key, aes.IV);

            var decryptedBytes = decryptor.TransformFinalBlock(cipher, 0, cipher.Length);

            return Encoding.UTF8.GetString(decryptedBytes);
        }

        public string Hash(string data)
        {
            using var sha256 = SHA256.Create();

            var bytes = Encoding.UTF8.GetBytes(data);
            var hash = sha256.ComputeHash(bytes);

            return Convert.ToBase64String(hash);
        }

        public List<string> GenerateKeys(int amount)
        {
            var keys = new List<string>();

            for (int i = 0; i < amount; i++)
            {
                byte[] keyBytes = RandomNumberGenerator.GetBytes(32);
                keys.Add(Convert.ToBase64String(keyBytes));
            }

            return keys;
        }
    }
}