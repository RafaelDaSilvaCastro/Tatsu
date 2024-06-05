using AutoMapper;
using backend.Data.Dto;
using backend.Models;

namespace backend.Profiles
{
    public class ReceitaProfile : Profile
    {
        public ReceitaProfile()
        {
            CreateMap<ReceitaDto, Receita>()
            .ForMember(dest => dest.PorcaoPessoas, opt => opt.MapFrom(src => src.Porcao))
            .ForMember(dest => dest.Ingredientes, opt => opt.MapFrom(src => src.Ingredientes))
            .ForMember(dest => dest.Preparo, opt => opt.MapFrom(src => src.Preparo));

            CreateMap<Receita, ReceitaDto>()
            .ForMember(dest => dest.Porcao, opt => opt.MapFrom(src => src.PorcaoPessoas))
            .ForMember(dest => dest.Ingredientes, opt => opt.MapFrom(src => src.Ingredientes))
            .ForMember(dest => dest.Preparo, opt => opt.MapFrom(src => src.Preparo));
        }
    }
}
