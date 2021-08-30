using System.Globalization;
using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Infrastructore.Data;
using core.Model;
using core.Specific;
using core.interfaces;
using AutoMapper;
using Api.Dtos;
using Api.Helper;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc.Rendering;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class productController : ControllerBase
    {
        private readonly IGenericRepositery<product> _repo_pto;
        private readonly IGenericRepositery<productbrand> _repo_brand;
        private readonly IGenericRepositery<productype> _repo_type;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHost;

        public productController(IGenericRepositery<product> repo_pto,
        IGenericRepositery<productbrand> repo_brand,
        IGenericRepositery<productype> repo_type,IMapper mapper,
        IWebHostEnvironment webHost)
        
        {
            _mapper = mapper;
            _repo_pto = repo_pto;
            _repo_brand=repo_brand;
            _repo_type=repo_type;
            _webHost=webHost;
        }

        // GET: api/product -- all product without filter or search 
        //or
        // GET: api/product/BrandId=2  ---we will get item from product content BrandId=3
        //or
        // GET: api/product/TypeId=3 --- we will get item from product content TypeId=3
        //or
        // GET: api/product/Sort=priceAsc ----arrange item ==123 Or priceDesc arrange item ===321 (price)
        // or
        // GET: api/product/?Sort=priceAsc&search=blue  --it use (sort with search)

        //or---pagantion page exp:1-2-3-4-5 by filter and search
        //Get: api/product/?Sort=priceAsc&TypeId=3&pageSize=1&pageIndex=2&BrandId=2&search=blue 
        //api/product/?Sort=priceAsc&TypeId=3&pageSize=1&BrandId=2&search=blue 
        //or pagination exp:1-2-3-4-5 and arrange 123 (price)  without filter or search
        //Get: api/product/?Sort=priceAsc&pageSize=1&pageIndex=1 
        //or all page product by pagation
        //Get: api/product/pageSize=1&pageIndex=8 


        [HttpGet]
        public async Task<ActionResult<Pagination<product>>> GetProducts([FromQuery]productSpaceParam prams)
        {
            var spec= new ProductsWithTypesAndBrandsSpecification(prams);

            var products= await _repo_pto.GetListAsyncGenric(spec);
            var total= await _repo_pto.countAsync(spec);
            var data=_mapper.Map<IReadOnlyList<product>,IReadOnlyList<ProductToReturnDto>>(products);

            return Ok(new Pagination<ProductToReturnDto>(prams.PageIndex,prams.PageSize,total,data));

          #region old away
            // var products=await _repo_pto.GetListAsync();
            // // IEnumerable<product> p=products;
            // // var pp=products.OrderBy(s=>s.Price).ToList();
            // // var a=await _repo_pto.GetFilterAsync(sort);
            //      List<product> a = new List<product>();            

            // if (idType != null || idbrand != null )
            // {
            //     switch (sort)
            //     {
            //         case "priceAsq":
            //         a = products.Where(ww=>ww.ProductTypeId==idType || ww.ProductBrandId == idbrand).OrderBy(x=>x.Price).ToList();
            //             break;
            //          case "priceDesc":
            //          a= products.Where(ww=>ww.ProductTypeId==idType || ww.ProductBrandId == idbrand).OrderByDescending(x1=>x1.Price).ToList();
            //             break;
            //         case "rating":
            //          a= products.Where(ww=>ww.ProductTypeId==idType || ww.ProductBrandId == idbrand).OrderByDescending(x2=>x2.rating).ToList();
            //             break;
            //         default:
            //             a= products.Where(ww=>ww.ProductTypeId==idType || ww.ProductBrandId == idbrand).OrderBy(x3=>x3.Name).ToList();
            //             break;
            //     }
            // }
            // else if (!string.IsNullOrEmpty(sort))
            // {
            //       switch (sort)
            //     {
            //         case "priceAsq":
            //         a = products.OrderBy(x=>x.Price).ToList();
            //             break;
            //          case "priceDesc":
            //          a= products.OrderByDescending(x1=>x1.Price).ToList();
            //             break;
            //         case "rating":
            //          a= products.OrderByDescending(x2=>x2.rating).ToList();
            //             break;
            //         default:
            //             a= products.OrderBy(x3=>x3.Name).ToList();
            //             break;
            //     }
            // }else
            // {
            //     a=products.ToList();
            // }
            // return Ok(_mapper.Map<IReadOnlyList<product>,IReadOnlyList<ProductToReturnDto>>(a));

          #endregion
       }
         // GET: api/product/Category all category
        [HttpGet("Category")]
         public async Task<ActionResult<IReadOnlyList<productbrand>>> GetProductbrand()
        {
            var products=await _repo_pto.GetListAsync();
            var ppp=(from item in products
                    select new {item.productbrand.Id, item.productbrand.Name}).Distinct().ToList();
            return Ok(ppp);

        }
        //sabreen 
       // Api/product/category/id
       
        [HttpGet("category/{id}")]
        public   async Task<ActionResult<IReadOnlyList<product>>> GetProductByCategoryId(int Id)
        {
            var products = await _repo_pto.GetListAsync();
            var ppp = (from item in products
                       where item.ProductBrandId== Id
                       select item);
            var list = ppp.ToList();
            return Ok(list);
        }
        // GET: api/product/subCategory -------all product with sub the d=same common id
        [HttpGet("subCategory")]
         public async Task<ActionResult<IReadOnlyList<productype>>> GetProductype()
        {
            var products=await _repo_pto.GetListAsync();
            var ppp=(from item in products
                    select new {item.productype.Id, item.productype.Name}).Distinct().ToList();
            return Ok(ppp);
        }

        // GET: api/product/5 it will get item number 5 in table product
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDto>> Getproduct(int id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var spec= new ProductsWithTypesAndBrandsSpecification(id);

            var product = await _repo_pto.GetSpesific(spec);

            return _mapper.Map<product,ProductToReturnDto>(product);
            // return Ok(product);
        } 
        
        // GET: api/product/type/5 -- it will get item has product id=5 equal id from table sub id=5
        [HttpGet("SubCategory/{id}")] 
        public async Task<ActionResult<productype>> GetType(int id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var product = await _repo_type.GetByIDAsync(id);
            return Ok(product);
        }
        //Get api/product/allproduct
        [HttpGet("allproduct")]
        public async Task<ActionResult<IReadOnlyList<product>>> GetProducts()
        {
            var p = await _repo_pto.GetListAsync();
            return Ok(_mapper.Map<IReadOnlyList<product>, IReadOnlyList<ProductToReturnDto>>(p));
        }

        // PUT: api/product/5
        //at least insert this in order to update
        //  "Id":1011,
        // "ProductTypeId":2 any number ,
        // "ProductBrandId":1 any number
        [HttpPut ("{id}")]
        public async Task<ActionResult<product>> Putproduct(int id,productModel productModel)
        {
            if (id == null)
            {
                return NotFound();
                
            }
        if(productModel.PictureUrl != null)
            {
                string folder="pro_Add/";
                 productModel.ConvertPictureUrl=  UploadImage(folder,productModel.PictureUrl);
            } 
            if(productModel.picturGallaryFils != null)
                {
                    string folder="pro_Add/";
                    productModel.Gallery=new List<gallaryModel>();
                    foreach (var item in productModel.picturGallaryFils)
                {
                    var gallary=new gallaryModel()
                    {
                        Name=item.Name,
                        Url= UploadImage(folder,item)
                    };
                    productModel.Gallery.Add(gallary);

                }
            }
            _repo_pto.UpdateModel(id,productModel);
            //  await _repo_pto.SaveChanges();
                return Ok();
                }

        // POST: api/product
        [HttpPost]
        //[HttpPost]
        public async Task<ActionResult<product>> Postproduct([FromForm] productModel productModel)
        {
           
            //  public async Task<ActionResult<product>> Postproduct(productModel productModel)
            // {
            if (productModel.PictureUrl != null)
            {
                string folder= "pro_Add/";
                productModel.ConvertPictureUrl=  UploadImage(folder,productModel.PictureUrl);
            } 
            if(productModel.picturGallaryFils != null)
            {
                string folder= "pro_Add/";
                productModel.Gallery=new List<gallaryModel>();
               foreach (var item in productModel.picturGallaryFils)
               {
            var gallary=new gallaryModel()
                  {
                       Name=item.Name,
                    Url= UploadImage(folder,item)
                  };
                 productModel.Gallery.Add(gallary);

               }
            }
                _repo_pto.AddNewproduct(productModel);
               await _repo_pto.SaveChanges();

                return Ok();

            // return CreatedAtAction("Getproduct", new { id = product.Id }, product);
        }

        private string UploadImage(string folderPath, IFormFile file)
            {

            folderPath += Guid.NewGuid().ToString() + "_" + file.FileName;

            string serverFolder = Path.Combine(_webHost.WebRootPath, folderPath);

             file.CopyToAsync(new FileStream(serverFolder, FileMode.Create));

            return "/" + folderPath;
             }

        // DELETE: api/product/5
        [HttpDelete]
        public async Task<ActionResult<product>> Deleteproduct(int id)
        {
            if (id == null)
            {
                return NotFound("sorry not fount product");
            }
            product product = new product();
            product.Id = id;
            _repo_pto.Delete(product);
            _repo_pto.SaveChanges();
            return Ok();
        }
        ////[HttpDelete]
        ////public async Task<ActionResult<product>> Deleteproduct(product product)
        ////{
        ////    if (product.Id == null)
        ////    {
        ////        return NotFound();
        ////    }
        ////   _repo_pto.Delete(product);
        ////   _repo_pto.SaveChanges();
        ////    return Ok();
        ////}

    }
}
