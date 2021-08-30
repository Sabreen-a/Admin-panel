using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace core.Specific
{
    public class BaseSpecific<T> : Ispecific<T>
    {
       public Expression<Func<T,bool>> critira {get;}

        public List<Expression<Func<T,object>>> Includes {get;}= 
        new List<Expression<Func<T,object>>>();

    public BaseSpecific(){}

      public BaseSpecific(Expression<Func<T,bool>> critira)
      {
          this.critira=critira;
      }

       protected  void AddInclude(Expression<Func<T, object>> includeExpression)
    {
        Includes.Add(includeExpression);
    }

    
       public  Expression<Func<T, object>> OrderBy { get;private set; }
       public Expression<Func<T, object>> OrderByDescending { get;private set; }
    
    protected  void AddOrder(Expression<Func<T, object>> orderExpression)
    {
        OrderBy=orderExpression;
    }
    protected  void AddOrderDeseneding(Expression<Func<T, object>> orderDescendingExpression)
    {
        OrderByDescending=orderDescendingExpression;
    }

        
        //pagination
       public  int Take { get;private set; }
       public  int Skip { get;private set; }
       public  bool IsPagingEnabled { get;private set; }

    protected void ApplyPagging(int skip,int take)
    {
        Take=take;
        Skip=skip;
        IsPagingEnabled=true;
    }   

    }
}