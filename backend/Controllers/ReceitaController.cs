using backend.Data.Dto;
using backend.Interfaces;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

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
        public async Task<ActionResult> Receitas()
        {
            var response = await _receitaServices.Receitas();
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Receita(string id)
        {
            var response = await _receitaServices.Receita(id);
            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult> GerarReceita([FromBody] GerarReceita request)
        {
            var response = await _receitaServices.Gerar(request);
            return Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> AtualizarReceita(string id, [FromBody] ReceitaDto receita)
        {
            var response = await _receitaServices.AtualizarReceita(id, receita);
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletarReceita(string id)
        {
            var response = await _receitaServices.RemoverReceita(id);
            return Ok(response);
        }
    }
}
