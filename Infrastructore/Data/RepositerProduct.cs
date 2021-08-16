using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using core.interfaces;
using core.Model;
using Microsoft.EntityFrameworkCore;

namespace Infrastructore.Data
{
    public class RepositerProduct : IProductRepositery
    {
        private readonly dataContext _context;

        public RepositerProduct(dataContext context)
        {
            _context = context;
        }

        //list from table product
        public async Task<IReadOnlyList<product>> getaAllProductAsync()
        {
            return await _context.Products.Include(ww=>ww.productype).Include(ww=>ww.productbrand).ToListAsync();         
        }
        //list from table brand

        public async Task<IReadOnlyList<productbrand>> getaAlltproductbrandAsync()
        {
            return await _context.productbrands.ToListAsync();         
        }
        //list from table type

        public async Task<IReadOnlyList<productype>> getaAllproductypeAsync()
        {
            return await _context.productypes.ToListAsync();         
        }

        public async Task<product> getaByIdProductAsync(int id)
        {
            return await _context.Products.Include(ww=>ww.productype).Include(ww=>ww.productbrand).FirstOrDefaultAsync(p=>p.Id==id);         
        }
    }
}