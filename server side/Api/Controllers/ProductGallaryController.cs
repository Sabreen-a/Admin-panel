using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Infrastructore.Data;
using core.Model;
using Api.Dtos;
using AutoMapper;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductGallaryController : ControllerBase
    {
        private readonly dataContext _context;
        private readonly IMapper _mapper;

        public ProductGallaryController(dataContext context,IMapper mapper)
        {
            _context = context;
            _mapper=mapper;
        }
        // GET: api/ProductGallary
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductGallary>>> GetProductGallarys()
        {
          var ProductGallarys= await _context.ProductGallarys.ToListAsync();
          return Ok(_mapper.Map<IReadOnlyList<ProductGallary>,IReadOnlyList<productGallaryReturnDtos>>(ProductGallarys));
        }
        // GET: api/ProductGallary/5 -we will get list image same id equal id product
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductGallary>> GetProductGallary(int id)
        {
            var productGallary = await _context.ProductGallarys.Where(ww=>ww.productId == id).ToListAsync();
            if (productGallary == null)
            {
                return NotFound();
            }

          return Ok(_mapper.Map<IReadOnlyList<ProductGallary>,IReadOnlyList<productGallaryReturnDtos>>(productGallary));
        }

        // PUT: api/ProductGallary/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductGallary(int id, ProductGallary productGallary)
        {
            if (id != productGallary.Id)
            {
                return BadRequest();
            }

            _context.Entry(productGallary).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductGallaryExists(id))
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

        // POST: api/ProductGallary
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductGallary>> PostProductGallary(ProductGallary productGallary)
        {
            _context.ProductGallarys.Add(productGallary);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductGallary", new { id = productGallary.Id }, productGallary);
        }

        // DELETE: api/ProductGallary/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductGallary(int id)
        {
            var productGallary = await _context.ProductGallarys.FindAsync(id);
            if (productGallary == null)
            {
                return NotFound();
            }

            _context.ProductGallarys.Remove(productGallary);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductGallaryExists(int id)
        {
            return _context.ProductGallarys.Any(e => e.Id == id);
        }
    }
}
