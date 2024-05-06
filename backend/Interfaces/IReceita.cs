using backend.Data.Dto;
using backend.Models;

namespace backend.Interfaces
{
    public interface IReceita
    {
        public Task<Response<List<Receita>>> GetAsync();
        public Task<Receita> GetAsync(string id);
        public Task<Response<string>> CreateAsync(Receita receita);
        public Task UpdateAsync(string id, Receita receita);
        public Task RemoveAsync(string id);
    }
}
