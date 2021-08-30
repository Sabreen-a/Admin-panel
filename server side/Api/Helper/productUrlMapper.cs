using AutoMapper;
using core.Model;
using Api.Dtos;
using Microsoft.Extensions.Configuration;

namespace Api.Helper
{
    public class productUrlMapper:IValueResolver<product,ProductToReturnDto,string>
    {
        
        private readonly IConfiguration _config;
        public productUrlMapper(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(product source, ProductToReturnDto destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.PictureUrl)) 
            {
                return _config["ApiURl"] + source.PictureUrl;
            }
            return null;
        }   

    }
}