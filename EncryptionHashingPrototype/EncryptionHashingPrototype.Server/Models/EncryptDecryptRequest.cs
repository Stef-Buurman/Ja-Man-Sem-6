namespace EncryptionHashingPrototype.Server.Models
{
    public class EncryptDecryptRequest
    {
        public string Data { get; set; } = string.Empty;
        public string Key { get; set; } = string.Empty;
    }
}