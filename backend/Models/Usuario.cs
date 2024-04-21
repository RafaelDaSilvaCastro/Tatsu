using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Usuario
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required(ErrorMessage = "Necessário informar um usuário")]
        string Nome { get; set; }
        [Required(ErrorMessage = "Necessário informar uma senha")]
        public string Senha { get; set; }
        [Required(ErrorMessage = "Necessário informar um Email")]
        public string Email { get; set; }
        //public virtual ICollection<Receita> Receitas { get; set; }
    }
}
