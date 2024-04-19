namespace backend.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        string Nome { get; set; }
        public string Senha { get; set; }
        public string Email { get; set; }
        public virtual ICollection<Receita> Receitas { get; set; }
    }
}
