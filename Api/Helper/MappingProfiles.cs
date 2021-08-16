using AutoMapper;
using core.Model;
using Api.Dtos;
using core.Model.Identity;

namespace Api.Helper
{
    public class MappingProfiles:Profile
    {
        public MappingProfiles()
        {
            CreateMap<product, ProductToReturnDto>()
            .ForMember(d=>d.ProductBrand,o=>o.MapFrom(p=>p.productbrand.Name))
            .ForMember(d=>d.ProductType,o=>o.MapFrom(p=>p.productype.Name))
            .ForMember(d=>d.PictureUrl,o=>o.MapFrom<productUrlMapper>());

            CreateMap<productbrand, prandCategory>();

            CreateMap<core.Model.Identity.Address,AddressDto>().ReverseMap();

            CreateMap<AddressDto,core.Model.OrderCheckOut.Address>();
        }
    }
}