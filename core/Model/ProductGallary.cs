using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace core.Model
{
    public class ProductGallary:baseEntity
    {
         public string Name { get; set; }
        public string Url { get; set; }
        public int productId { get; set; }
         [ForeignKey("productId")]
        public virtual product product { get; set; }
    
    }
}
