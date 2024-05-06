using backend.Interfaces;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReceitaController : Controller
    {
        private readonly ReceitaServices _receitaServices;
        public ReceitaController(ReceitaServices receitaServices)
        {
            _receitaServices = receitaServices;
        }

        [HttpGet]
        public async Task<ActionResult> Receita()
        {
            var receitas = await _receitaServices.Receitas();
            return Ok(receitas);
        }

        [HttpPost]
        public async Task<ActionResult> Receita(GerarReceita request)
        {
            var response = await _receitaServices.Gerar(request);
            return Ok(response);
        }
    }
}
