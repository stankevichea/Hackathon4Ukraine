using StuffSupplierAPI.Model;

namespace StuffSupplierAPI.Interface
{
    public interface IItemNameService
    {
            Task<IEnumerable<ItemName>> GetNames();
    }
}