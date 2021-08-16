using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using core.Model;
using Microsoft.AspNetCore.Http;
namespace Api.Dtos
{
    public class productGallaryReturnDtos
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public int productId { get; set; }
    }
}