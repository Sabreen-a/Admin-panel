using System;
using System.Collections.Generic;
using System.Linq.Expressions;


namespace core.Specific
{
    public interface Ispecific<T>
    {
        //  function get (true or false)
     Expression<Func<T,bool>> critira {get;}
    //  function get multy function type include in table 
     List<Expression<Func<T,object>>> Includes {get;}
     
        Expression<Func<T, object>> OrderBy { get; }
        Expression<Func<T, object>> OrderByDescending { get; }

        int Take { get; }
        int Skip { get; }
        bool IsPagingEnabled { get; }

    }
}