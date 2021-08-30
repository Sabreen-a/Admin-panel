using System.Collections.Generic;
using System.Threading.Tasks;
using core.Model;
using core.Specific;
namespace core.interfaces
{
    public interface IGenericRepositery<T> where T : baseEntity
    {
         Task<T> GetByIDAsync(int id);
         Task<IReadOnlyList<T>> GetListAsync();
         Task<int> CountAsycTable();

         Task<T> GetSpesific(Ispecific<T> spec);

         Task<IReadOnlyList<T>> GetListAsyncGenric(Ispecific<T> spec);
        Task<int> countAsync(Ispecific<T> spec);
        void AddNewproduct(productModel model);//
        void UpdateModel(int id,productModel model);//
        void Add(T entity);//
        void Update(T entity);//
        void Delete(T entity);//
        
        Task SaveChanges();

    }
}