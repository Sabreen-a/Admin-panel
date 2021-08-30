using core.Model;
namespace core.Specific
{
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecific<product>
    {
       public ProductsWithTypesAndBrandsSpecification (productSpaceParam prams):base(x => 
            (string.IsNullOrEmpty(prams.Search)||x.Name.ToLower().Contains(prams.Search))&&
            (!prams.BrandId.HasValue || x.ProductBrandId == prams.BrandId) &&
            (!prams.TypeId.HasValue || x.ProductTypeId == prams.TypeId)
        )

       {
           AddInclude(ww=>ww.productype);
           AddInclude(ww=>ww.productbrand);
           AddOrder(x => x.Name);
           ApplyPagging(prams.PageSize * (prams.PageIndex -1),prams.PageSize);

           if (!string.IsNullOrEmpty(prams.Sort))
            {
                switch (prams.Sort)
                {
                    case "priceAsc":
                        AddOrder(p => p.Price);
                        break;
                    case "priceDesc":
                        AddOrderDeseneding(p => p.Price);
                        break;
                    default:
                        AddOrder(n => n.Name);
                        break;
                }
            }

       }

       public ProductsWithTypesAndBrandsSpecification (int id):base(x=>x.Id==id)
       {
            AddInclude(ww=>ww.productype);
           AddInclude(ww=>ww.productbrand);
       }
    }
}