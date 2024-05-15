using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure;

public class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions options) : base(options)
    {
        
    }

    public DbSet<HouseItem> HouseItems {get; set;} = null!;
}
