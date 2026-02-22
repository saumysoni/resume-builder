using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using resume_api.Models;

namespace resume_api.Controllers;

[ApiController]
[Route("[controller]")]
public class ResumeUserController : ControllerBase
{

    private readonly AppDbContext _context;

    public ResumeUserController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<dynamic>> GetResumeByUserId(int id)
    {
        if (id==0)
        {
            return BadRequest("Id is required.");
        }

        var resume = await _context.Resume.Where(u => u.user_id == id).ToListAsync();

        if (resume == null || !resume.Any())
        {
            return NotFound();
        }

        return resume;
    }
}