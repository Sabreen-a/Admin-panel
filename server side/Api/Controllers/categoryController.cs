using System;
using System.Collections.Generic;
using System.Linq;
using Infrastructore.Data;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Infrastructore.Data;
using AutoMapper;
using core.Model;
using core.interfaces;
using Api.Dtos;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class categoryController : ControllerBase
    {
        private readonly dataContext _context;

         private readonly IGenericRepositery<productbrand> repo_brand;
        private readonly IMapper mapper;


        public categoryController(dataContext context,IGenericRepositery<productbrand> _repo_brand,IMapper _mapper)
        {
            _context = context;
            repo_brand=_repo_brand;
            mapper=_mapper;
        }
        // GET: api/category
        [HttpGet]
        public async Task<ActionResult<prandDto<productbrand>>> Getproductbrands()
        {
               var total =await repo_brand.CountAsycTable();
            var a= await repo_brand.GetListAsync();

            var data=mapper.Map<IReadOnlyList<productbrand>,IReadOnlyList<prandCategory>>(a);

            return Ok(new prandDto<prandCategory>(total,data));

            // return Ok(mapper.Map<IReadOnlyList<productbrand>,IReadOnlyList<prandDto>>(a,cat.Total));
            // return Ok(a,total);
        }

        // GET: api/category/5
        [HttpGet("{id}")]
        public async Task<ActionResult<productbrand>> Getproductbrand(int id)
        {
            var productbrand = await _context.productbrands.FindAsync(id);

            if (productbrand == null)
            {
                return NotFound();
            }

            return productbrand;
        }

        // PUT: api/category/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Putproductbrand(int id, productbrand productbrand)
        {
            if (id != productbrand.Id)
            {
                return BadRequest();
            }

            _context.Entry(productbrand).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!productbrandExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/category
        [HttpPost]
        public async Task<ActionResult<productbrand>> Postproductbrand(productbrand productbrand)
        {
            _context.productbrands.Add(productbrand);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getproductbrand", new { id = productbrand.Id }, productbrand);
        }

        // DELETE: api/category/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deleteproductbrand(int id)
        {
            var productbrand = await _context.productbrands.FindAsync(id);
            if (productbrand == null)
            {
                return NotFound();
            }

            _context.productbrands.Remove(productbrand);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool productbrandExists(int id)
        {
            return _context.productbrands.Any(e => e.Id == id);
        }
    }
}

