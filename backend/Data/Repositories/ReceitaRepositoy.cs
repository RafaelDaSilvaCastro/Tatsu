using backend.Data.Context;
using backend.Data.Dto;
using backend.Interfaces;
using backend.Models;
using backend.Rules;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace backend.Data.Repositories
{
    public class ReceitaRepositoy : IReceita
    {
        private IMongoCollection<Receita> _receitaCollection;
        public ReceitaRepositoy(IOptions<MongoDbConfig> mongoConfig)
        {
            var mongoClient = new MongoClient(mongoConfig.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(mongoConfig.Value.DatabaseName);
            _receitaCollection = mongoDatabase.GetCollection<Receita>("Receitas");
        }

        public async Task<Response<string>> CreateAsync(Receita receita)
        {
            try
            {
                // Executar a operação de inserção assíncrona
                await _receitaCollection.InsertOneAsync(receita);

                // A operação de inserção foi concluída com sucesso
                return new Response<string> { Success = true};
            }
            catch (Exception ex)
            {
                return new Response<string> { Success = false, ErrorMessage = "Falha ao inserir registro no banco: " + ex.Message };
            }
        }

        public async Task<Response<List<Receita>>> GetAsync()
        {
            try
            {
                var receitas = await _receitaCollection.Find(x => true).ToListAsync();

                return new Response<List<Receita>> { Success = true, Data = receitas};
            }
            catch (Exception e)
            {
                return new Response<List<Receita>> { Success = false, ErrorMessage = "Erro interno: " + e.Message };
            }             

        }            

        public async Task<Receita> GetAsync(string id) =>
            await _receitaCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task UpdateAsync(string id, Receita receita) =>
    await _receitaCollection.ReplaceOneAsync(x => x.Id == id, receita);

        public async Task RemoveAsync(string id) =>
                await _receitaCollection.DeleteOneAsync(x => x.Id == id);

    }
}
