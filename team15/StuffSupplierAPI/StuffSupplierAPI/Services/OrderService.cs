using StuffSupplierAPI.Interface;
using StuffSupplierAPI.Model;
using StuffSupplierAPI.Model.Enum;

namespace StuffSupplierAPI.Services
{
    public sealed class OrderService : IOrderService
    {
        private IOrderRepository _orderRepository;

        public OrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public async Task<IEnumerable<Order>> GetOrders()
        {
            var orders = await _orderRepository.GetOrders();
            return orders;
        }
        public async Task<Order> GetOrder(int orderId)
        {
            var order = await _orderRepository.GetOrder(orderId);
            return order;
        }
        public async Task<Order> AddOrder(Order newOrder)
        {
            var order = await _orderRepository.AddOrder(newOrder);
            return order;
        }
        public async Task<Order> UpdateOrder(Order newOrder)
        {
            if (newOrder.OrderItems.Any(item => item.ProvidedQuantity > 0))
                newOrder.OrderStatus = OrderStatus.InProgress;
            if (newOrder.OrderItems.All(item => item.ProvidedQuantity == item.InitialQuantity))
                newOrder.OrderStatus = OrderStatus.Completed;
            return await _orderRepository.UpdateOrder(newOrder);
        }

        public async Task<bool> DeleteOrder(int id)
        {
            return await _orderRepository.DeleteOrder(id);
        }
    }
}
