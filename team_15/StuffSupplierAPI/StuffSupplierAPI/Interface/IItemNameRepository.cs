using StuffSupplierAPI.Model;

namespace StuffSupplierAPI.Interface
{
    public interface IItemNameRepository
    {
        Task<List<ItemName>> GetNames();
    }
}
