using Microsoft.EntityFrameworkCore;
using StuffSupplierAPI.Data;
using StuffSupplierAPI.Interface;
using StuffSupplierAPI.Model;

namespace StuffSupplierAPI.Repositories
{
    public sealed class OrderRepository : IOrderRepository
    {
        private readonly DataContext _context;

        public OrderRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Order>> GetOrders()
        {
            var orders = await _context.Orders.Include(o => o.OrderItems).Include(o => o.Address).ToListAsync();
            return orders;
        }

        public async Task<Order> GetOrder(int id)
        {
            var order = await _context.Orders.Include(o => o.OrderItems).Include(o => o.Address).FirstOrDefaultAsync(o => o.Id == id);
            return order;
        }

        public async Task<Order> AddOrder(Order order)
        {
            var addedOrder = _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return await GetOrder(addedOrder.Entity.Id);
        }
        public async Task<Order> UpdateOrder(Order order)
        {
            var dbOrder = await _context.Orders.Include(o => o.OrderItems).Include(o => o.Address).FirstOrDefaultAsync(o => o.Id == order.Id);
            foreach (var item in order.OrderItems)
            {
                var dbItem = await _context.OrderItems.FirstOrDefaultAsync(i => i.Id == item.Id);
                if (dbItem != null)
                {
                    dbItem.ItemName = item.ItemName;
                    dbItem.Unit = item.Unit;
                    dbItem.InitialQuantity = item.InitialQuantity;
                    dbItem.ProvidedQuantity = item.ProvidedQuantity;
                    dbItem.ItemNameId = item.ItemNameId;
                }
                else
                    dbOrder.OrderItems.Add(item);
            }
            dbOrder.Address.Street = order.Address.Street;
            dbOrder.Address.City = order.Address.City;
            dbOrder.Address.PostalCode = order.Address.PostalCode;
            dbOrder.Address.Country = order.Address.Country;
            dbOrder.PhoneNumber = order.PhoneNumber;
            dbOrder.OrderStatus = order.OrderStatus;
            dbOrder.Email = order.Email;
            dbOrder.Description = order.Description;
            await _context.SaveChangesAsync();
            return await GetOrder(order.Id);
        }

        public async Task<bool> DeleteOrder(int id)
        {
            var order = await _context.Orders.Include(o => o.OrderItems).Include(o => o.Address).FirstOrDefaultAsync(o => o.Id == id);
            _context.Addresses.Remove(order.Address);
            await _context.SaveChangesAsync();
            foreach (var item in order.OrderItems)
                _context.OrderItems.Remove(item);
            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
