namespace backend.Models
{
    public class Preparo
    {
        public int Id { get; set; }
        public string numero_preparo { get; set; }
        public string descricao { get; set; }
        public virtual ICollection<Receita> Receitas{ get; set; }

    }
}
