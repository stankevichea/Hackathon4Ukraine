using StuffSupplierAPI.Model.Enum;

namespace StuffSupplierAPI.Model
{
    public sealed class Offer
    {
        public int Id { get; set; }
        public string ItemName { get; set; }
        public int ItemNameId { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public Unit Unit { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }
}