using System.Collections.Generic;
using System.Threading.Tasks;
using core.Model.OrderCheckOut;

namespace core.interfaces
{
    public interface IOrderServices
    {
         Task<Order> CreateOrderAsync(string UsreEmail,int deleveryMethod,string BasketID,Address ShopingAddress);

         Task<IReadOnlyList<Order>> GetOderForUser(string UsreEmail);
         Task<Order> GetOrderByIDAsync(int id,string UsreEmail);
         Task<IReadOnlyList<DeliveryMethod>> GetDeleverAsync();
    }
}