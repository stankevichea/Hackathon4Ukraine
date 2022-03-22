using StuffSupplierAPI.Model;

namespace StuffSupplierAPI.Interface
{
    public interface IOrderRepository
    {
        Task<List<Order>> GetOrders();

        Task<Order> GetOrder(int id);

        Task<Order> AddOrder(Order order);

        Task<Order> UpdateOrder(Order order);
        Task<Boolean> DeleteOrder(int id);
    }
}
