using System.Threading.Tasks;
using core.Model;
namespace core.interfaces
{
    public interface IBaskectRepositery
    {
         Task<CustomerBasket> GetBasketAsync(string basketId);
         Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket);
         Task<bool> DeleteBasketAsync(string basketId);
    }
}