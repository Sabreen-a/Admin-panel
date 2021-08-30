using core.Model;
using core.interfaces;
using Infrastructore.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using core.Specific;


namespace Infrastructore.Repositery
{
    
    public class GenericRepositery<T> : IGenericRepositery<T> where T:baseEntity
    {
        private readonly dataContext _context;

          public GenericRepositery(dataContext context)
        {
            _context = context;
        }
        public void Add(T entity)
        {
             _context.Set<T>().Add(entity);
            //  SaveChanges();
        }

        public void UpdateModel(int id,productModel model)
        {
            //   product pro=new product();
            
                product pro = (from p in _context.Products
                                  where p.Id == id
                                  select p).FirstOrDefault();
                pro.Id=model.Id;                 
                pro.Name=model.Name;
               pro.Price=model.Price;
                pro.ProductTypeId=model.ProductTypeId;
                pro.ProductBrandId=model.ProductBrandId;
                pro.PictureUrl=model.ConvertPictureUrl;
                pro.Description=model.Description;
                pro.rating=model.rating;
                pro.Qount=model.Qount;
                pro.priceBuy_one=model.priceBuy_one;
                pro.priceBuyOrgnal_all=model.priceBuyOrgnal_all;
                pro.price_Sall_one=model.price_Sall_one;
                pro.price_Sall_all=model.price_Sall_all;
                pro.earn_Money=model.earn_Money;
                pro.Date_attach=model.Date_attach;
                pro.Date_Experied=model.Date_Experied;
                pro.comment=model.comment;
           if (model.Gallery != null )
           {
                pro.productGallary=new List<ProductGallary>();
                    foreach (var item in model.Gallery)
                    {
                        pro.productGallary.Add(new ProductGallary(){
                            Name=item.Name,
                            Url=item.Url
                        });
                    }
           }
            // _context.Products.Attach(pro);
            _context.Entry(pro).State = EntityState.Modified;
            _context.SaveChanges();

        }
        public void AddNewproduct(productModel model)
        {
            product pro=new product()
            {
                Name=model.Name,
                Price=model.Price,
                ProductTypeId=model.ProductTypeId,
                ProductBrandId=model.ProductBrandId,
                PictureUrl=model.ConvertPictureUrl,
                Description=model.Description,
                rating=model.rating,
                Qount=model.Qount,
                priceBuy_one=model.priceBuy_one,
                priceBuyOrgnal_all=model.priceBuyOrgnal_all,
                price_Sall_one=model.price_Sall_one,
                price_Sall_all=model.price_Sall_all,
                earn_Money=model.earn_Money,
                Date_attach=model.Date_attach,
                Date_Experied=model.Date_Experied,
                comment=model.comment
            };
           if (model.Gallery != null )
           {
                pro.productGallary=new List<ProductGallary>();
            foreach (var item in model.Gallery)
            {
                pro.productGallary.Add(new ProductGallary(){
                    Name=item.Name,
                    Url=item.Url
                });
            }
           }
             _context.Products.Add(pro);
            _context.SaveChanges();
        }
        public void Delete(T entity)
        {
            var item=entity.Id;
            var a=_context.Set<T>().Find(item);
            _context.Set<T>().Remove(a);
            _context.SaveChanges();
        }
        public void Update(T entity)
        {
            _context.Set<T>().Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            SaveChanges();
        }
         public async Task SaveChanges()
        {
             await _context.SaveChangesAsync();
        }
        public async Task<T> GetByIDAsync(int id)
        {
            return await _context.Set<T>().FirstOrDefaultAsync(p=>p.Id==id);
        } 

        public async Task<IReadOnlyList<T>> GetListAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

         public async Task<T> GetSpesific(Ispecific<T> spec)
        {
            return await Applyspecific(spec).FirstOrDefaultAsync();
        }
        // get all item in list 
       public async  Task<IReadOnlyList<T>> GetListAsyncGenric(Ispecific<T> spec)
       {
           return await Applyspecific(spec).ToListAsync();
       }
       //it help function 
       public IQueryable<T> Applyspecific(Ispecific<T> spec)
       {
           return SpecificationEvaluator<T>.GetQuery(_context.Set<T>().AsQueryable(),spec);
       }
            // this function get count item will return 
        public async Task<int> countAsync(Ispecific<T> spec)
        {
            return await Applyspecific(spec).CountAsync();
        }
        //get count item in List

         public async Task<int> CountAsycTable()
        {
           return await  _context.productbrands.AsQueryable().CountAsync();
        }

//          public async Task<IReadOnlyList<T>> GetFilterAsync(string sort)
//         {
// 
//             if(!string.IsNullOrEmpty(sort))
//             {
//                 switch (sort)
//                 {
//                     case "priceAsq":
//                     var a1=await _context.Set<product>().OrderBy(x=>x.Price).ToListAsync();
//                    return a1;
//                      case "priceDesc":
//                      product a2=await _context.Set<product>().OrderByDescending(x=>x.Price).ToListAsync();
//                   return a2;
//                     default:
//                     var a3=await _context.Set<product>().OrderBy(x=>x.Name).ToListAsync();
//                  return  a3;
//                 }
//             }else
//             {
//                 var a4=await _context.Set<product>().ToListAsync();
//             return a4;
//             }
//         }
    }
}