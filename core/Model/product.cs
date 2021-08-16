using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace core.Model
{
    public class product:baseEntity
    {
       public string Name { get; set; }
        public string Description { get; set; }
        public Double Price { get; set; }
        public string PictureUrl { get; set; }
        public Double rating { get; set; }
        public double Qount { get; set; }
        public double priceBuy_one { get; set; }//انا اللي هيبعة  للعميل
        public double priceBuyOrgnal_all { get; set; }//السعر ككل جملة
        public double price_Sall_one { get; set; }//اشتريت الواحد بكام جملة
        public double price_Sall_all { get; set; }//هبيع المنتجات كلهم بالمكسب بكام
        public double earn_Money { get; set; }// الكسمب ككل من البيع كل المنتجات
        public DateTime Date_attach { get; set; }
        public DateTime Date_Experied { get; set; }
        public string comment { get; set; }

        

        [ForeignKey("productype")]
        
        public int ProductTypeId { get; set; }

        public virtual productype productype { get; set; }
        [ForeignKey("productbrand")]
        
        public int ProductBrandId { get; set; }

        public virtual productbrand productbrand { get; set; }

        public virtual ICollection<ProductGallary> productGallary { get; set; }
       
    }

   
}