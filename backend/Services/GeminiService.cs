using backend.Data.Dto;
using backend.Rest;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Http;
using Newtonsoft.Json;
using System.Formats.Asn1;
using System.Net.Http.Headers;
using System.Text;
using static Google.Rpc.Context.AttributeContext.Types;

namespace backend.Services
{
    public class GeminiService
    {
        const string ProjectId = "tatsu-419619";
        const string Location = "us-central1";
        const string AiPlatformUrl = $"https://{Location}-aiplatform.googleapis.com";
        const string ModelId = "gemini-pro";
        const string EndpointUrl = $"{AiPlatformUrl}/v1/projects/{ProjectId}/locations/{Location}/publishers/google/models/{ModelId}:streamGenerateContent";

        public async static Task<Response<string>> Generate(string text)
        {
            string payload = GeneratePayload(text);
            var response = await SendRequest(payload);

            if (response.Success)
            {
                var geminiDto = JsonConvert.DeserializeObject<List<GeminiDto>>(response.Data);

                string fullText = string.Join("", geminiDto
                .SelectMany(co => co.Candidates)
                .SelectMany(c => c.Content.Parts)
                .Select(p => p.Text));

                //return fullText;
                return new Response<string> { Success = true, Data = fullText };
            }

            return new Response<string> { Success = false, ErrorMessage = response.ErrorMessage };            
        }

        private static string GeneratePayload(string text)
        {
            var payload = new
            {
                contents = new
                {
                    role = "USER",
                    parts = new
                    {
                        text = text
                    }
                },
                generation_config = new
                {
                    temperature = 0.4,
                    top_p = 1,
                    top_k = 32,
                    max_output_tokens = 2048
                }
            };
            return JsonConvert.SerializeObject(payload);
        }

        private async static Task<Response<string>> SendRequest(string payload)
        {
            try
            {
                GoogleCredential credential = GoogleCredential.FromFile(@"C:\Users\HENRIQUE\Documents\tatsu.json");
                var handler = credential.ToDelegatingHandler(new HttpClientHandler());
                using HttpClient httpClient = new(handler);

                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = await httpClient.PostAsync(EndpointUrl,
                    new StringContent(payload, Encoding.UTF8, "application/json"));

                if (response.IsSuccessStatusCode)
                {
                    var responseBody = await response.Content.ReadAsStringAsync();
                    return new Response<string> { Success = true, Data = responseBody };
                }

                return new Response<string> { Success = false, ErrorMessage = response.StatusCode.ToString() };
            }
            catch (Exception e)
            {
                Console.Write(e.Message);
                Console.Write(e.StackTrace);
                Console.Write(e.InnerException);
                return null;

            }


        }

    }
}
