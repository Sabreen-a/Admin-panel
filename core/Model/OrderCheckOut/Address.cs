namespace core.Model.OrderCheckOut
{
    public class Address
    {
         public Address()
        {
        }

        public Address(string firstName, string lastName, string street, string city, string state, string numberHouse)
        {
            FirstName = firstName;
            LastName = lastName;
            Street = street;
            City = city;
            State = state;
            NumberHouse = numberHouse;
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string NumberHouse { get; set; }
    }
}