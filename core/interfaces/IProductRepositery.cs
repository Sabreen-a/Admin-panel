using System.Collections.Generic;
using System.Threading.Tasks;
using core.Model;

namespace core.interfaces
{
    public interface IProductRepositery
    {
         Task<product> getaByIdProductAsync(int id);
         Task<IReadOnlyList<product>> getaAllProductAsync();
         Task<IReadOnlyList<productbrand>> getaAlltproductbrandAsync();
         Task<IReadOnlyList<productype>> getaAllproductypeAsync();
    }
}