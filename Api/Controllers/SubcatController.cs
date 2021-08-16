using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Infrastructore.Data;
using core.Model;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using core.Model.Identity;
using Api.Dtos;
using AutoMapper;
namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubcatController : ControllerBase
    {
        private readonly dataContext _context;
         private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        
        public SubcatController(dataContext context,UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            _context = context;
             _userManager=userManager;
            _signInManager=signInManager;
        }
        // GET: api/Subcat
        [HttpGet]
        public async Task<ActionResult<IEnumerable<productype>>> Getproductypes()
        {
            return await _context.productypes.ToListAsync();
        }

        // GET: api/Subcat/5
        [HttpGet("{id}")]
        public async Task<ActionResult<productype>> Getproductype(int id)
        {
            var productype = await _context.productypes.FindAsync(id);

            if (productype == null)
            {
                return NotFound();
            }

            return productype;
        }

        // PUT: api/Subcat/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Putproductype(int id, productype productype)
        {
            if (id != productype.Id)
            {
                return BadRequest();
            }

            _context.Entry(productype).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!productypeExists(id))
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

        // POST: api/Subcat
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<productype>> Postproductype(productype productype)
        {
            _context.productypes.Add(productype);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getproductype", new { id = productype.Id }, productype);
        }

        // DELETE: api/Subcat/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deleteproductype(int id)
        {
            var productype = await _context.productypes.FindAsync(id);
            if (productype == null)
            {
                return NotFound();
            }

            _context.productypes.Remove(productype);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool productypeExists(int id)
        {
            return _context.productypes.Any(e => e.Id == id);
        }
    }
}
