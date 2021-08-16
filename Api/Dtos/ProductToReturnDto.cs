using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using core.Model;
using Microsoft.AspNetCore.Http;


namespace Api.Dtos
{
    public class ProductToReturnDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Double Price { get; set; }
        public string PictureUrl { get; set; }
        public Double rating { get; set; }
        public double Qount { get; set; }
        public double priceBuy_one { get; set; }
        public double priceBuyOrgnal_all { get; set; }
        public double price_Sall_one { get; set; }
        public double price_Sall_all { get; set; }
        public double earn_Money { get; set; }
        public DateTime Date_attach { get; set; }
        public DateTime Date_Experied { get; set; }
        public string comment { get; set; }
        public string ProductType { get; set; }
        public string ProductBrand { get; set; }
        // [ForeignKey("productype")]
        
        // public int ProductTypeId { get; set; }

        // public virtual productype productype { get; set; }
        // [ForeignKey("productbrand")]
        
        // public int ProductBrandId { get; set; }

        // public virtual productbrand productbrand { get; set; } 

        // public virtual ICollection<ProductGallary> productGallary { get; set; }

    }
}