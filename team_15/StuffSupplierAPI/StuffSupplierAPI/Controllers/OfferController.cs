using Microsoft.AspNetCore.Mvc;
using StuffSupplierAPI.Interface;
using StuffSupplierAPI.Model;

namespace StuffSupplierAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfferController : ControllerBase
    {
        private readonly IOfferService _offerService;

        public OfferController(IOfferService offerService)
        {
            _offerService = offerService;
        }
        [HttpGet]
        [Route("offers")]
        public async Task<IActionResult> GetOffers()
        {
            var offers = await _offerService.GetOffers();
            return Ok(offers);
        }

        [HttpGet]
        [Route("offer/{offerId:int}")]
        public async Task<IActionResult> GetOffer(int offerId)
        {
            var offer = await _offerService.GetOffer(offerId);
            return Ok(offer);
        }

        [HttpPost]
        [Route("offer")]
        public async Task<IActionResult> CreateOffer(Offer newOffer)
        {
            var offer = await _offerService.AddOffer(newOffer);
            return Ok(offer);
        }
        [HttpPut]
        [Route("offer")]
        public async Task<IActionResult> UpdateOffer(Offer newOffer)
        {
            var offer = await _offerService.UpdateOffer(newOffer);
            return Ok(offer);
        }
        [HttpDelete]
        [Route("offer/{offerId:int}")]
        public async Task<IActionResult> DeleteOffer(int offerId)
        {
            var result = await _offerService.DeleteOffer(offerId);
            return Ok(result);
        }
    }
}
