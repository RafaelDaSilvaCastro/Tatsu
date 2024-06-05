using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace backend.Utils
{
    public class Conversor : JsonConverter<Dictionary<string, Dictionary<string, string>>>
    {
        public override Dictionary<string, Dictionary<string, string>> ReadJson(JsonReader reader, Type objectType, Dictionary<string, Dictionary<string, string>> existingValue, bool hasExistingValue, JsonSerializer serializer)
        {
            var ingredientes = new Dictionary<string, Dictionary<string, string>>();
            var token = JToken.Load(reader);

            if (token.Type == JTokenType.Object)
            {
                var obj = (JObject)token;
                foreach (var property in obj.Properties())
                {
                    if (property.Value.Type == JTokenType.Object)
                    {
                        try
                        {
                            ingredientes[property.Name] = property.Value.ToObject<Dictionary<string, string>>();
                        }
                        catch (JsonException)
                        {
                            // Se não puder converter para Dictionary, armazene como string
                            ingredientes[property.Name] = new Dictionary<string, string>
                            {
                                { "default", property.Value.ToString() }
                            };
                        }
                    }
                    else
                    {
                        // Único dicionário de ingredientes
                        if (!ingredientes.ContainsKey("default"))
                        {
                            ingredientes["default"] = new Dictionary<string, string>();
                        }
                        ingredientes["default"][property.Name] = property.Value.ToString();
                    }
                }
            }
            return ingredientes;
        }

        public override void WriteJson(JsonWriter writer, Dictionary<string, Dictionary<string, string>> value, JsonSerializer serializer)
        {
            JObject obj = new JObject();
            foreach (var item in value)
            {
                if (item.Value is Dictionary<string, string> subDict)
                {
                    obj[item.Key] = JToken.FromObject(subDict, serializer);
                }
                else
                {
                    obj[item.Key] = JToken.FromObject(item.Value, serializer);
                }
            }
            obj.WriteTo(writer);
        }
    }
}
