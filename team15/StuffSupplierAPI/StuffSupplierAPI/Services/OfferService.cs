using StuffSupplierAPI.Interface;
using StuffSupplierAPI.Model;

namespace StuffSupplierAPI.Services
{
    public sealed class OfferService : IOfferService
    {
        private IOfferRepository _offerRepository;

        public OfferService(IOfferRepository offerRepository)
        {
            _offerRepository = offerRepository;
        }
        public async Task<Offer> AddOffer(Offer newOffer)
        {
            return await _offerRepository.AddOffer(newOffer);
        }

        public async Task<bool> DeleteOffer(int id)
        {
            return await _offerRepository.DeleteOffer(id);
        }

        public async Task<Offer> GetOffer(int id)
        {
            return await _offerRepository.GetOffer(id);
        }

        public async Task<IEnumerable<Offer>> GetOffers()
        {
            return await _offerRepository.GetOffers();
        }

        public async Task<Offer> UpdateOffer(Offer newOffer)
        {
            return await _offerRepository.UpdateOffer(newOffer);
        }
    }
}
