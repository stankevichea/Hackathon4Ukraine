using Microsoft.EntityFrameworkCore.Cosmos.Internal;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Configuration;
using Hackathon4Ukraine_Team2_App.DataAccess;
using Hackathon4Ukraine_Team2_App.Domain;
using Hackathon4Ukraine_Team2_App.Services.Interfaces;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.DependencyInjection;

namespace Hackathon4Ukraine_Team2_App;

public static class ServicesLoader
{
    public static void AddAllServices(this WebApplicationBuilder builder)
    {
        var services = builder.Services;

        services.AddRazorPages();
        services.AddServerSideBlazor();

        var configuration = builder.Configuration;

        services.Configure<CosmosSettings>(
               configuration.GetSection(nameof(CosmosSettings)));

        services.AddDbContextFactory<AppDbContext>(
           (IServiceProvider sp, DbContextOptionsBuilder opts) =>
           {
               var cosmosSettings = sp
                   .GetRequiredService<IOptions<CosmosSettings>>()
                   .Value;

               opts.UseCosmos(
                   cosmosSettings.ConnectionString,
                   cosmosSettings.DbName);
           });

        services.AddScoped<IRequestHelpService, RequestHelpService>();
    }
}

