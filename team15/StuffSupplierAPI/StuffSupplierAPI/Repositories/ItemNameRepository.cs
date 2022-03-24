using Microsoft.EntityFrameworkCore;
using StuffSupplierAPI.Data;
using StuffSupplierAPI.Interface;
using StuffSupplierAPI.Model;

namespace StuffSupplierAPI.Repositories
{
    public sealed class ItemNameRepository : IItemNameRepository
    {
        private readonly DataContext _context;

        public ItemNameRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<ItemName>> GetNames()
        {
            return await _context.ItemNames.ToListAsync();
        }
    }
}