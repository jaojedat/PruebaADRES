using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class AdquisicionDbContext : DbContext
    {
        public AdquisicionDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions){}

        public DbSet<Adquisicion> Adquisiciones { get; set; }
    }
}