using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data.Context
{
    public class UsuarioContext : DbContext
    {
        public UsuarioContext(DbContextOptions<UsuarioContext> opts) : base(opts) { 

        }

        //public DbSet<Usuario> Usuarios { get; set; }

    }
}
