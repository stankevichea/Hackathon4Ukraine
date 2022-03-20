using StuffSupplierAPI.Model.Enum;

namespace StuffSupplierAPI.Model
{
    public sealed class OrderItem
    {
        public int Id { get; set; }

        public string ItemName { get; set; }

        public int ItemNameId { get; set; }

        public int InitialQuantity { get; set; }

        public int ProvidedQuantity { get; set; }

        public Unit Unit { get; set; }
    }
}
