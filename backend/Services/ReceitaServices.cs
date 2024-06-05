using backend.Data.Context;
using backend.Data.Dto;
using backend.Data.Repositories;
using backend.Interfaces;
using backend.Models;
using backend.Rules;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace backend.Services
{
    public class ReceitaServices
    {

        private ReceitaRegras _receitaRegras;

        public ReceitaServices(ReceitaRegras receitaRegras)
        { 
            _receitaRegras = receitaRegras;            
        }    

        public async Task<Response<string>> Gerar(GerarReceita receita)
        {
            return await _receitaRegras.GerarReceita(receita);               
        }

        public async Task<Response<List<Receita>>> Receitas()
        {
            return await _receitaRegras.TodasReceitas();
        }

        public async Task<Response<string>> AtualizarReceita(string id, ReceitaDto receita)
        {
            return await _receitaRegras.AtualizarReceita(id, receita);
        }

        public async Task<Response<string>> RemoverReceita(string id)
        {
            return await _receitaRegras.RemoveAsync(id);
        }

        public async Task<Response<Receita>> Receita(string id)
        {
            return await _receitaRegras.Receita(id);
        }
    }
}
