using System.Linq;
using Api.Errors;
using core.interfaces;
using Infrastructore.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Helper;
using Api.Extensions;
using Infrastructore.Repositery;
using core.Model.Identity;
using Infrastructore.Data.Identity;
using Infrastructore.Services;
namespace Api.Extensions
{
    public static class ApplicationServiceExtensions
    {
        
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
              services.AddScoped<ItokenServices,tokenServices>();
              services.AddScoped<IBaskectRepositery,BasketRepositry>();
              services.AddScoped<IOrderServices,OrderServices>();
              services.AddScoped<IProductRepositery,RepositerProduct>();
            services.AddScoped(typeof(IGenericRepositery<>),(typeof(GenericRepositery<>)));
            services.AddAutoMapper(typeof(MappingProfiles));
           
            return services;
        }

    }
}