using StuffSupplierAPI.Model;

namespace StuffSupplierAPI.Interface
{
    public interface IOfferRepository
    {
        Task<List<Offer>> GetOffers();

        Task<Offer> GetOffer(int id);

        Task<Offer> AddOffer(Offer offer);

        Task<Offer> UpdateOffer(Offer offer);
        Task<Boolean> DeleteOffer(int id);
    }
}
