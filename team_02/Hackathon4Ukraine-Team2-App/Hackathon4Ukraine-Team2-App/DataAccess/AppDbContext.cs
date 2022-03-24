using Hackathon4Ukraine_Team2_App.Domain;
using Microsoft.EntityFrameworkCore;

namespace Hackathon4Ukraine_Team2_App.DataAccess
{
    public sealed class AppDbContext : DbContext
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AppDbContext"/> class.
        /// </summary>
        /// <param name="options">The configuration options.</param>
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) {}

        public DbSet<RequestHelp> RequestHelps { get; set; }

        public DbSet<Category> Categories { get; set; }

        /// <summary>
        /// Configure the model that maps the domain to the backend.
        /// </summary>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RequestHelp>()
                .HasNoDiscriminator()
                .ToContainer(nameof(RequestHelps))
                .HasNoDiscriminator()
                .HasPartitionKey(da => da.Id)
                .HasKey(da => da.Id);

            modelBuilder.Entity<Category>()
                .HasNoDiscriminator()
                .ToContainer(nameof(Categories))
                .HasNoDiscriminator()
                .HasPartitionKey(da => da.Name)
                .HasKey(da => da.Id);

            base.OnModelCreating(modelBuilder);
        }
    }
}
