using System;
using System.Collections.Generic;

namespace core.Model.OrderCheckOut
{
    public class Order:baseEntity
    {
            public Order()
        {
        }
        public Order(IReadOnlyList<OrderItem> orderItems, string buyerEmail, 
            Address shipToAddress, DeliveryMethod deliveryMethod, 
            double subtotal)
        {
            BuyerEmail = buyerEmail;
            ShipToAddress = shipToAddress;
            DeliveryMethod = deliveryMethod;
            OrderItems = orderItems;
            Subtotal = subtotal;
            // PaymentIntentId = paymentIntentId;
        }
        public string BuyerEmail { get; set; }
        public DateTimeOffset OrderDate { get; set; } = DateTimeOffset.Now;
        public Address ShipToAddress { get; set; }
        public virtual DeliveryMethod DeliveryMethod { get; set; }
        public virtual IReadOnlyList<OrderItem> OrderItems { get; set; }
        public double Subtotal { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public string PaymentIntentId { get; set; }

        public double GetTotal()
        {
            return Subtotal + DeliveryMethod.Price;
        }
    }
}