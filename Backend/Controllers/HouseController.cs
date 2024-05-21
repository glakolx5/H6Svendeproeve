using Backend.Infrastructure;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HouseController(MyDbContext context) : ControllerBase
{
    private readonly MyDbContext _context = context;

    //Get all houses
    [HttpGet]
    public async Task<ActionResult<IEnumerable<HouseItem>>> GetHousesAsync()
    {
        return await _context.HouseItems.ToListAsync();
    }

    //GET house

    //POST house
    [HttpPost]
    public async Task<ActionResult<HouseItem>> PostHouseAsync(HouseItem item)
    {
        _context.HouseItems.Add(item);
        await _context.SaveChangesAsync();

        return Ok();
    }
    //PUT/Update house

    //DELETE house
}
