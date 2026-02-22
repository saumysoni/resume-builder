using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using resume_api.Models;

namespace resume_api.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly AppDbContext _context;

    public UserController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<dynamic>> GetUser()
    {
        var users = await _context.User.ToListAsync();

        if (users == null || users.Count == 0)
        {
            return NotFound("No items found.");
        }

        return users;
    }

    [HttpGet("{email}")]
    public async Task<ActionResult<dynamic>> GetUserByEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
        {
            return BadRequest("Email is required.");
        }

        var users = await _context.User.Where(u => u.email == email).ToListAsync();

        if (users == null || !users.Any())
        {
            return NotFound();
        }

        return users;
    }

    [HttpPost]
    public async Task<ActionResult<dynamic>> PostUser(User user)
    {
        try
        {
            _context.User.Add(user);
            await _context.SaveChangesAsync();

            return user;

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
