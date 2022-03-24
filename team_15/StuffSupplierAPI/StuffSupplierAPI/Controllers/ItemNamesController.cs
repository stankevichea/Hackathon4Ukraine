using Microsoft.AspNetCore.Mvc;
using StuffSupplierAPI.Interface;
using StuffSupplierAPI.Model;

namespace StuffSupplierAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemNamesController : ControllerBase
    {
        private readonly IItemNameService _itemNameService;

        public ItemNamesController(IItemNameService itemNameService)
        {
            _itemNameService = itemNameService;
        }
        [HttpGet]
        [Route("itemNames")]
        public async Task<IActionResult> GetNames()
        {
            var offers = await _itemNameService.GetNames();
            return Ok(offers);
        }
    }
}
