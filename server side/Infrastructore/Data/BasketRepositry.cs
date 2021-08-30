using System.Text.Json;
using core.interfaces;
using StackExchange.Redis;
using System;
using core.Model;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace Infrastructore.Data
{
    public class BasketRepositry:IBaskectRepositery
    {
        public readonly IDatabase _database; 
        public BasketRepositry(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
            
        }
      public async Task<CustomerBasket> GetBasketAsync(string basketId)
      {
            var data= await _database.StringGetAsync(basketId);
            return data.IsNullOrEmpty ? null: JsonSerializer.Deserialize<CustomerBasket>(data);
      }
        public async  Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket)
        {
            var create=await _database.StringSetAsync(basket.Id,JsonSerializer.Serialize(basket),TimeSpan.FromDays(30));
            if(!create) return null;
            return await GetBasketAsync(basket.Id);
        }
        public async Task<bool> DeleteBasketAsync(string basketId)
         {
             return await _database.KeyDeleteAsync(basketId);
         }
    }
}