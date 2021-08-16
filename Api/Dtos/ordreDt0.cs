namespace Api.Dtos
{
    public class ordreDt0
    {
        public string BasketId { get; set; }

        public int DeleverMethodID { get; set; }

        public AddressDto ShipToAddress { get; set; }
    }
}