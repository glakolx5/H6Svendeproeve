using Backend.Infrastructure;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
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

    [HttpGet("{Id}")]
    public async Task<ActionResult<HouseItem>> GetHouseItem(Guid Id)
    {
        var houseItem = await _context.HouseItems.FindAsync(Id);
        if (houseItem == null)
        {
            return NotFound();

        }
        else
        {
            return houseItem;
        }
    }

    //POST house
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<HouseItem>> PostHouseAsync(HouseItem item)
    {
        _context.HouseItems.Add(item);
        await _context.SaveChangesAsync();

        return Ok();
    }
    //PUT/Update house

    //DELETE house
}
