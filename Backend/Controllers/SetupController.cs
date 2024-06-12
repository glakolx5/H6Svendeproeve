using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SetupController(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager) : ControllerBase
{
    private readonly UserManager<AppUser> _userManager = userManager;
    private readonly RoleManager<IdentityRole> _roleManager = roleManager;

    /*
        Getting all roles
    */
    [HttpGet("GetAllRoles")]
    public IActionResult GetAllRoles()
    {
        var roles = _roleManager.Roles.ToList();
        return Ok(roles);
    }

    /*
        Create a Role
    */
    [HttpPost("CreateRole")]
    public async Task<IActionResult> CreateRole(string name)
    {
        var roleExist = await _roleManager.RoleExistsAsync(name);

        if (!roleExist)
        {
            var roleResult = await _roleManager.CreateAsync(new IdentityRole(name));
            if (roleResult.Succeeded)
            {
                return Ok(new { result = $"The role {name} has been added successfully" });
            }
            else
            {
                return BadRequest(new { error = $"The role {name} has not been added" });
            }
        }
        return BadRequest(new { error = "Role already exists" });
    }

    /*
        Getting all users
    */
    [HttpGet("GetAllUsers")]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _userManager.Users.ToListAsync();

        return Ok(users);
    }
    
    /*
        Adding User to a role
    */
    [HttpPost("AddUserToRole")]
    public async Task<IActionResult> AddUserToRole(string email, string roleName)
    {
        var user = await _userManager.FindByEmailAsync(email);

        if (user == null)
        {
            return BadRequest(new { error = "User does not exist" });
        }

        var roleExist = await _roleManager.RoleExistsAsync(roleName);

        if (!roleExist)
        {
            return BadRequest(new { error = "Role does not exist" });
        }

        var result = await _userManager.AddToRoleAsync(user, roleName);

        if (result.Succeeded)
        {
            return Ok(new
            {
                result = "Success, user has beed added to the role"
            });

        }
        else
        {
            return BadRequest(new { error = "User was not able to added to role" });
        }

    }

    /*
        Getting all user with roles
    */
    [HttpGet("GetUserRoles")]
    public async Task<IActionResult> GetUserRoles(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);

        if (user == null)
        {
            return BadRequest(new { error = "User does not exist" });
        }
        var roles = await _userManager.GetRolesAsync(user);
        return Ok(roles);
    }
    
}
