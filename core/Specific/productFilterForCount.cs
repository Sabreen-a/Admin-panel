using core.Model;
namespace core.Specific
{
    public class productFilterForCount:BaseSpecific<product>
    {
        public productFilterForCount(productSpaceParam prams):base(x => 
            (string.IsNullOrEmpty(prams.Search)|| x.Name.ToLower().Contains(prams.Search))&&
            (!prams.BrandId.HasValue || x.ProductBrandId == prams.BrandId) &&
            (!prams.TypeId.HasValue || x.ProductTypeId == prams.TypeId))
        {
            
        }
    }
}