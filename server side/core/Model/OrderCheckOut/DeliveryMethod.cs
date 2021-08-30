namespace core.Model.OrderCheckOut
{
    public class DeliveryMethod:baseEntity
    {
          public string ShortName { get; set; }
        public string DeliveryTime { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
    
    }
}