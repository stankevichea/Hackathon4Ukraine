using Microsoft.EntityFrameworkCore;
using StuffSupplierAPI.Model;

namespace StuffSupplierAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Order> Orders { get; set; }

        public DbSet<OrderItem> OrderItems { get; set; }

        public DbSet<Address> Addresses { get; set; }
        public DbSet<Offer> Offers { get; set; }
        public DbSet<ItemName> ItemNames { get; set; }
    }
}
