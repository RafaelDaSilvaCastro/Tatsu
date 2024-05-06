using AutoMapper;
using backend.Data.Dto;
using backend.Models;

namespace backend.Profiles
{
    public class ReceitaProfile : Profile
    {
        public ReceitaProfile()
        {
            CreateMap<ReceitaDto, Receita>().
                ForMember(receita => receita.PorcaoPessoas,
                opt => opt.MapFrom(receitaDto => receitaDto.Porcao));
        }
    }
}
