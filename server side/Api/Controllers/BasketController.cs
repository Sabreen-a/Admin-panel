using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Infrastructore.Data;
using core.Model;
using core.interfaces;
using Infrastructore.Repositery;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly IBaskectRepositery _basket;

        public BasketController(IBaskectRepositery basket )
        {
            _basket = basket;

        }

        // GET: api/Basket?id=basket1
        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
        {
            var basket=await _basket.GetBasketAsync(id);

            return Ok(basket ?? new CustomerBasket(id));
        }
    [HttpPost]
    public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasket basket)
    {
        var updateBasket=await _basket.UpdateBasketAsync(basket);
        return Ok(updateBasket);
    }

    [HttpDelete]

        public async Task DeleteBasket(string id)
        {
            await _basket.DeleteBasketAsync(id);
        }
    }
}
