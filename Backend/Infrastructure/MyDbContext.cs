using Backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure;

public class MyDbContext(DbContextOptions options) : IdentityDbContext<AppUser>(options)
{
    /*
        To query and save instances of HouseItem
    */
    public DbSet<HouseItem> HouseItems { get; set; } = null!;

}
