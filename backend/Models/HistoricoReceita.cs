namespace backend.Models
{
    public class HistoricoReceita
    {
        public string Id { get; set; }
        public DateTime DataReceita { get; set; }
        public virtual Receita Receita{ get; set; }
    }
}
