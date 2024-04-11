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
                return BadRequest("O texto não pode ser vazio");
            }

            var response = await ApiGemini.Generate(text);

            // Ou, se a chamada ao método Generate retornar null:
            if (response == null)
            {
                return NotFound();
            }

            var dto = new ResultadoDTO { Mensagem = response };

            return Ok(dto);
        }

        public class ResultadoDTO
        {
            public string Mensagem { get; set; }
            // Outras propriedades, se necessário
        }

    }
}
