using Microsoft.EntityFrameworkCore;

namespace Hackathon4Ukraine_Team2_App.DataAccess
{
    public static class DbInitializer
    {
        public static async Task InitDatabase(this WebApplication app)
        {
            using var scope = app.Services.CreateScope();
            var dbcontext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            await dbcontext.Database.EnsureCreatedAsync();
            await FillCategories(dbcontext);
        }

        private static async Task FillCategories(AppDbContext dbContext)
        {
            if (await dbContext.Categories.FirstOrDefaultAsync() == default)
            {
                dbContext.Categories.AddRange(CategoriesNames.Select(name => new Domain.Category { Name = name }));
                await dbContext.SaveChangesAsync();
            }
        }

        private static readonly List<string> CategoriesNames = new()
        {
            "Aid",
            "Accommodation",
            "Transport",
            "Health Care",
            "Other"
        };
    }
}
