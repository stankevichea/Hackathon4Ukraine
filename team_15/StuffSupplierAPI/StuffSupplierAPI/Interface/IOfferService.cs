using StuffSupplierAPI.Model;

namespace StuffSupplierAPI.Interface
{
    public interface IOfferService
    {
            Task<IEnumerable<Offer>> GetOffers();
            Task<Offer> GetOffer(int id);
            Task<Offer> AddOffer(Offer newOffer);
            Task<Offer> UpdateOffer(Offer newOffer);
            Task<Boolean> DeleteOffer(int id);
    }
}