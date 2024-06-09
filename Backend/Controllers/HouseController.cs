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

    [HttpGet("search/{town}")]
    public async Task<IEnumerable<HouseItem>> Search(string town)
    {
        IQueryable<HouseItem> query = _context.HouseItems;

        if (!string.IsNullOrEmpty(town))
        {
            query = query.Where(e => e.Town.Contains(town));
        }

        return await query.ToListAsync();
    }


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

    [HttpPut("{id}")]
    public async Task<IActionResult> PutHouseItem(Guid id, HouseItemDTO houseItemDTO)
    {
        if (id != houseItemDTO.Id)
        {
            return BadRequest();
        }
        var houseIte = await _context.HouseItems.FindAsync(id);

        if (houseIte == null)
        {
            return NotFound();
        }
        houseIte.Town = houseItemDTO.Town;
        houseIte.Price = houseItemDTO.Price;
        houseIte.ImageSrc = houseItemDTO.ImageSrc;
        houseIte.DateFrom = houseItemDTO.DateFrom;
        houseIte.DateTo = houseItemDTO.DateTo;
        houseIte.IsComplete = houseItemDTO.IsComplete;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException) when (!HouseItemExist(id))
        {
            return NotFound();
        }
        return NoContent();

    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteHouseItem(Guid id)
    {
        var houseItem = await _context.HouseItems.FindAsync(id);
        if (houseItem == null)
        {
            return NotFound();
        }
        _context.HouseItems.Remove(houseItem);
        await _context.SaveChangesAsync();

        return NoContent();

    }

    //DELETE house


    private bool HouseItemExist(Guid id)
    {
        return _context.HouseItems.Any(e => e.Id == id);
    }

    private static HouseItemDTO HouseToDTO(HouseItem houseItem) => new()
    {
        Id = houseItem.Id,
        Town = houseItem.Town,
        Price = houseItem.Price,
        ImageSrc = houseItem.ImageSrc,
        DateFrom = houseItem.DateFrom,
        DateTo = houseItem.DateTo,
        IsComplete = houseItem.IsComplete
    };
}


