using AutoMapper;
using core.Model;
using Api.Dtos;
using Microsoft.Extensions.Configuration;

namespace Api.Helper
{
    public class productUrlMapperGallary:IValueResolver<ProductGallary,productGallaryReturnDtos,string>
    {
        
        private readonly IConfiguration _config;
        public productUrlMapperGallary(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(ProductGallary source, productGallaryReturnDtos destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.Url)) 
            {
                return _config["ApiURl"] + source.Url;
            }
            return null;
        }   

    }
}