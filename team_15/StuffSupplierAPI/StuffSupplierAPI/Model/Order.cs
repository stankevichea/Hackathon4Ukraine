using StuffSupplierAPI.Model.Enum;

namespace StuffSupplierAPI.Model
{
    public sealed class Order
    {
        public int Id { get; set; }

        public ICollection<OrderItem> OrderItems { get; set; }

        public OrderStatus OrderStatus { get; set; }

        public string Description { get; set; }

        public Address Address { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

    }
}
