namespace backend.Models
{
    public class Receita
    {
        public string Id { get; set; }
        public string Titulo { get; set; }    
        public string TempoPreparo { get; set; }
        public string Dificuldade { get; set; }
        public string PorcaoPessoas { get; set; }

        public virtual Usuario Usuario { get; set; }
}
}
