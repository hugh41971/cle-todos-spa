using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using todos.Models;

namespace todos.Repositories
{
    public class OwnerRepository : Repository<Owner>, IRepository<Owner>
    {
        TodoContext db;

        public OwnerRepository(TodoContext context) : base(context)
        {
            db = context;
        }

    }
}
