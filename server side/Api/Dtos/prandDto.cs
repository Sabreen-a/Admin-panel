using System.Collections.Generic;

namespace Api.Dtos
{
    public class prandDto<T> where T:class
    {
      
        public prandDto(int total,IReadOnlyList<T> data) 
        {
            // this.Id = id;
            this.Total = total;
            Data=data;
        }
            // public int Id { get; set; }
         public int Total { get; set; }
        public IReadOnlyList<T> Data { get; set; }


    }
}