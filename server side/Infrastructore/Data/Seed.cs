using System.Collections.Generic;
using System.Linq;
using core.Model;
using Newtonsoft.Json;
using core.Model.OrderCheckOut;

namespace Infrastructore.Data
{
    public class Seed
    {
        private readonly dataContext context;

        public Seed(dataContext _context)
        {
            context = _context;
        }
        public void SeedPro()
        {
            

                if (!context.productbrands.Any())
                {

                    var proData=System.IO.File.ReadAllText("../Infrastructore/Data/SeedData/brands.json");
                    var pro=JsonConvert.DeserializeObject<List<productbrand>>(proData);
                    foreach (var item in pro)
                    {
                        context.productbrands.Add(item);

                    }
                        context.SaveChanges();
              }
        }
        public void SeedType()
        {
            

                if (!context.productypes.Any())
                {

                    var proData=System.IO.File.ReadAllText("../Infrastructore/Data/SeedData/types.json");
                    var pro=JsonConvert.DeserializeObject<List<productype>>(proData);
                    foreach (var item in pro)
                    {
                        context.productypes.Add(item);

                    }
                        context.SaveChanges();
              }
        }

        public void Seedproduct()
        {
              //if (!context.Products.Any())
              //  {

              //      var proData=System.IO.File.ReadAllText("../Infrastructore/Data/SeedData/products.json");
              //      var pro=JsonConvert.DeserializeObject<List<product>>(proData);
              //      foreach (var item in pro)
              //      {
              //          context.Products.Add(item);

              //      }
              //          context.SaveChanges();
              //}
        } 
        
        public void SeedDelevery()
        {
              if (!context.DeliveryMethods.Any())
                {

                    var proData=System.IO.File.ReadAllText("../Infrastructore/Data/SeedData/delivery.json");
                    var pro=JsonConvert.DeserializeObject<List<DeliveryMethod>>(proData);
                    foreach (var item in pro)
                    {
                        context.DeliveryMethods.Add(item);

                    }
                        context.SaveChanges();
              }
        }
    }
}