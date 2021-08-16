using System.Collections.Generic;
namespace core.Model
{
    public class CustomerBasket
    {
         public string Id { get; set; }
        public List<BasketItems> Items { get; set; } 

        public CustomerBasket(string id) 
        {
            this.Id = id;
        }
        public CustomerBasket()
        {
            
        }
       
    }
}