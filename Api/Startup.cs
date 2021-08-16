using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using core.interfaces;
using Api.Helper;
using Api.Extensions;
using Infrastructore.Repositery;
using Infrastructore.Data;
using core.Model.Identity;
using Infrastructore.Data.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.FileProviders;
using StackExchange.Redis;//basket
using Microsoft.AspNetCore.Identity;


namespace Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
//dotnet ef migrations add  intiatalCrea2 -p Infrastructore -s Api -o Data/Migrations -c dataContext
//dotnet ef migrations add  intiatalCreate -p Infrastructore -s Api -o Identity/Migrations -c AppIdentityDbContext
//enable migrations
//add-migration intiatalCreate -p Infrastructore -s Api -o Data/Migrations -c dataContext
// update database -p Infrastructore -s Api -c dataContext
// dotnet ef database update -p Infrastructore -s Api -c dataContext
// dotnet ef database update -p Infrastructore -s Api -c AppIdentityDbContext

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddNewtonsoftJson(ww=>ww.SerializerSettings.ReferenceLoopHandling=Newtonsoft.Json.ReferenceLoopHandling.Ignore);
          
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();

                 });
            });


            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Api", Version = "v1" });
            });

        services.AddTransient<Seed>();
        services.AddTransient<AppIdentityDbContextSeed>();
        services.AddApplicationServices();
        services.AddIdentityServices(Configuration);
        services.AddSingleton<IConnectionMultiplexer>(c=>{
            var configuration=ConfigurationOptions.Parse(Configuration.GetConnectionString("redis"),true);
            return ConnectionMultiplexer.Connect(configuration);
        });
                 
         services.AddDbContext<AppIdentityDbContext>(x =>
                    x.UseLazyLoadingProxies().UseSqlServer(Configuration.GetConnectionString("IdentityConnection")));

            services.AddDbContext<dataContext>(options =>
                    options.UseLazyLoadingProxies().UseSqlServer(Configuration.GetConnectionString("dataContext")));
        }
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env,Seed seeder,AppIdentityDbContextSeed seedIdentity)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Api v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            seeder.SeedPro();
            seeder.SeedType();
            seeder.SeedDelevery();
            app.UseCors("CorsPolicy");

            seeder.Seedproduct();
            // var usermanager=UserManager<AppUser>
            // seedIdentity.SeedUsersAsync(usermanager);

            app.UseAuthentication();
            app.UseAuthorization();


            // app.UseOpenApi();
            app.UseStaticFiles();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
