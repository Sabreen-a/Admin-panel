using System.Linq;
using core.Specific;
using Microsoft.EntityFrameworkCore;
using core.Model;

namespace Infrastructore.Data
{
    
       
    public class SpecificationEvaluator<TEntity> where TEntity : baseEntity
    {
        public static IQueryable<TEntity> GetQuery(IQueryable<TEntity> inputQuery, Ispecific<TEntity> spec)
        {
            var query = inputQuery;// IQueryable<product> inputQuery

            if (spec.critira != null)
            {
                query = query.Where(spec.critira);//p=>p.productTypeID == id
            }
            if (spec.OrderBy != null)
            {
                query = query.OrderBy(spec.OrderBy);//orderby(o=>o.type\or\id)
            } 
            if (spec.OrderByDescending != null)
            {
                query = query.OrderByDescending(spec.OrderByDescending);//orderby(o=>o.type\or\id)
            }
            

            if (spec.IsPagingEnabled)
            {
                query = query.Skip(spec.Skip).Take(spec.Take);
            }


           
            query = spec.Includes.Aggregate(query, (current, include) => current.Include(include));

            return query;
        }
    }
    }
