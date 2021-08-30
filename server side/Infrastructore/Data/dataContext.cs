using System.Reflection;
using core.Model;
using core.Model.OrderCheckOut;
using Microsoft.EntityFrameworkCore;

namespace Infrastructore.Data
{
    public class dataContext:DbContext
    {
        public dataContext(DbContextOptions<dataContext> options):base(options)
        {
        }
        public virtual DbSet<product> Products { get; set; }
        public virtual DbSet<productbrand> productbrands { get; set; }
        public virtual DbSet<productype> productypes { get; set; }
        public virtual DbSet<ProductGallary> ProductGallarys { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<DeliveryMethod> DeliveryMethods { get; set; }
  protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        if (!options.IsConfigured)
        {
            options.UseSqlServer("A FALLBACK CONNECTION STRING");
        }
    }
    
       
        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
        //     base.OnModelCreating(modelBuilder);   
        //     // modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        // }
    }
}