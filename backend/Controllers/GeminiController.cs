using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class GeminiController : Controller
    {

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] string text)
        {

            if (string.IsNullOrEmpty(text))
            {
                return BadRequest("O texto digitado não pode ser vazio");
            }

            var response = await ApiGemini.Generate(text);

            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

    }
}
