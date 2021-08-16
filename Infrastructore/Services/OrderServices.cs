using core.interfaces;
using core.Model;
using core.Model.OrderCheckOut;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructore.Services
{
    public class OrderServices:IOrderServices
    {
        private readonly IGenericRepositery<Order> orderRepo;
        private readonly IGenericRepositery<product> productRepo;
        private readonly IGenericRepositery<DeliveryMethod> deleveryRepo;
        private readonly IBaskectRepositery basketRepo;
        
        public OrderServices(IGenericRepositery<Order> _orderRepo,IGenericRepositery<product> _productRepo,
        IGenericRepositery<DeliveryMethod> _deleveryRepo,IBaskectRepositery _basketRepo)
        {
            basketRepo = _basketRepo;
            deleveryRepo = _deleveryRepo;
            productRepo = _productRepo;
            orderRepo = _orderRepo;
        }
        public async Task<Order> CreateOrderAsync(string UsreEmail, int deleveryMethodID, string BasketID, Address ShopingAddress)
        {
            //get data from basket 
            var basket= await basketRepo.GetBasketAsync(BasketID);
            //get item from table product
            var items=new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                var productItem=await productRepo.GetByIDAsync(item.Id);
                var itemOredr= new ProductItemOrdered(productItem.Id,productItem.Name,productItem.PictureUrl);
                var orderItem=new OrderItem(itemOredr,productItem.Price,item.Quantity);
                items.Add(orderItem);
            }
                //get delevery
                var delevery=await deleveryRepo.GetByIDAsync(deleveryMethodID);
                //calc sub
                var subtotal= items.Sum(item=>item.Price * item.Quantity);
                //create Ordre
                var ordre=new Order(items,UsreEmail,ShopingAddress,delevery,subtotal);
                //retern data
                return ordre;
         }
        public Task<IReadOnlyList<DeliveryMethod>> GetDeleverAsync()
        {
            throw new System.NotImplementedException();
        }
        public Task<IReadOnlyList<Order>> GetOderForUser(string UsreEmail)
        {
            throw new System.NotImplementedException();
        }
        public Task<Order> GetOrderByIDAsync(int id, string UsreEmail)
        {
            throw new System.NotImplementedException();
        }
    }
}