using AutoMapper;
using core.Model;
using Api.Dtos;
namespace Api.Helper
{
    public class MappingProfilesGallary:Profile
    {
        public MappingProfilesGallary()
        {
            CreateMap<ProductGallary, productGallaryReturnDtos>()
            // .ForMember(d=>d.productbrand,o=>o.MapFrom(p=>p.productbrand.Name))
            // .ForMember(d=>d.productype,o=>o.MapFrom(p=>p.productype.Name))
            .ForMember(d=>d.Url,o=>o.MapFrom<productUrlMapperGallary>());
        }
    }
}