using Microsoft.AspNetCore.Mvc;
using StuffSupplierAPI.Interface;
using StuffSupplierAPI.Model;

namespace StuffSupplierAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        [Route("orders")]
        public async Task<IActionResult> GetOrders()
        {
            var orders = await _orderService.GetOrders();
            return Ok(orders);
        }

        [HttpGet]
        [Route("order/{orderId:int}")]
        public async Task<IActionResult> GetOrder(int orderId)
        {
            var orders = await _orderService.GetOrder(orderId);
            return Ok(orders);
        }

        [HttpPost]
        [Route("order")]
        public async Task<IActionResult> CreateOrder(Order newOrder)
        {
            var orders = await _orderService.AddOrder(newOrder);
            return Ok(orders);
        }
        [HttpPut]
        [Route("order")]
        public async Task<IActionResult> UpdateOrder(Order newOrder)
        {
            var orders = await _orderService.UpdateOrder(newOrder);
            return Ok(orders);
        }
        [HttpDelete]
        [Route("order/{orderId:int}")]
        public async Task<IActionResult> DeleteOrder(int orderId)
        {
            var result = await _orderService.DeleteOrder(orderId);
            return Ok(result);
        }
    }
}