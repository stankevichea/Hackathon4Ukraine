using Microsoft.EntityFrameworkCore;
using StuffSupplierAPI.Data;
using StuffSupplierAPI.Interface;
using StuffSupplierAPI.Model;

namespace StuffSupplierAPI.Repositories
{
    public sealed class OfferRepository : IOfferRepository
    {
        private readonly DataContext _context;

        public OfferRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Offer> AddOffer(Offer offer)
        {
            var addedOffer = _context.Offers.Add(offer);
            await _context.SaveChangesAsync();
            return await GetOffer(addedOffer.Entity.Id);
        }

        public async Task<List<Offer>> GetOffers()
        {
            return await _context.Offers.ToListAsync();
        }

        public async Task<Offer> GetOffer(int id)
        {
            return await _context.Offers.FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<Offer> UpdateOffer(Offer offer)
        {
            var dbOffer = _context.Offers.FirstOrDefault(o => o.Id == offer.Id);
            dbOffer.Description = offer.Description;
            dbOffer.Email = offer.Email;
            dbOffer.ItemName = offer.ItemName;
            dbOffer.PhoneNumber = offer.PhoneNumber;
            dbOffer.Quantity = offer.Quantity;
            dbOffer.Unit = offer.Unit;
            dbOffer.ItemNameId = offer.ItemNameId;
            await _context.SaveChangesAsync();
            return await GetOffer(offer.Id);
        }

        public async Task<bool> DeleteOffer(int id)
        {
            var offer = await _context.Offers.FirstOrDefaultAsync(o => o.Id == id);
            _context.Offers.Remove(offer);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}