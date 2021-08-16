using System.Security.Claims;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Infrastructore.Data;
using Api.Dtos;
using AutoMapper;
using core.interfaces;
using core.Model.OrderCheckOut;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderServices repoOrdre;
        private readonly IMapper maper;
        public OrdersController(IOrderServices _repoOrdre, IMapper _maper)
        {
            maper = _maper;
            repoOrdre = _repoOrdre;

        }
        // api/Orders/pro
        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrdre(ordreDt0 ordreDt)
        {
            var email= HttpContext.User?.Claims?.FirstOrDefault(ww=>ww.Type == ClaimTypes.Email)?.Value;
            var adress= maper.Map<AddressDto,Address>(ordreDt.ShipToAddress);
            var order = await repoOrdre.CreateOrderAsync(email,ordreDt.DeleverMethodID,ordreDt.BasketId,adress);
            if (order == null)
            {
             return BadRequest("Problem Create Ordre");   
            }
           
            return Ok(order);
        }

    }
}