using StuffSupplierAPI.Interface;
using StuffSupplierAPI.Model;

namespace StuffSupplierAPI.Services
{
    public sealed class ItemNameService : IItemNameService
    {
        private IItemNameRepository _itemNameRepository;

        public ItemNameService(IItemNameRepository itemNameRepository)
        {
            _itemNameRepository = itemNameRepository;
        }

        public async Task<IEnumerable<ItemName>> GetNames()
        {
            return await _itemNameRepository.GetNames();
        }
    }
}
