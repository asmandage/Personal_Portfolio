using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace PortfolioContactAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            
            // Add CORS to allow frontend to call the API
            services.AddCors(options =>
            {
                options.AddPolicy("AllowPortfolio", builder =>
                {
                    builder.WithOrigins("http://localhost:3000", "https://asmandage.github.io")
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });

            // Add Swagger for API documentation
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo 
                { 
                    Title = "Portfolio Contact API", 
                    Version = "v1",
                    Description = "API for handling contact form submissions from Aniket Mandage's portfolio"
                });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Portfolio Contact API v1"));
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            
            // Enable CORS
            app.UseCors("AllowPortfolio");
            
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
