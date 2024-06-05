using backend.Data.Context;
using backend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace backend.Data.Repositories
{
    public class PreparoRepository
    {
        private IMongoCollection<Receita> _receitaCollection;
    }
}
