using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using resume_api.Models;

namespace resume_api.Controllers;

[ApiController]
[Route("[controller]")]
public class ExperienceController : ControllerBase
{
    private readonly AppDbContext _context;

    public ExperienceController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<IEnumerable<Experience>>> PostExperience(IEnumerable<Experience> experienceList)
    {
        try
        {
            foreach (var experience in experienceList)
            {
                _context.Experience.Add(experience);
            }

            await _context.SaveChangesAsync();

            return Ok(experienceList);  

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<dynamic>> GetExperienceByResumeId(int id)
    {
        if (id==0)
        {
            return BadRequest("Id is required.");
        }

        var experience = await _context.Experience.Where(u => u.resume_id == id).ToListAsync();

        if (experience == null || !experience.Any())
        {
            return NotFound();
        }

        return experience;
    }
    [HttpPut("{id}")]
    public async Task<ActionResult<dynamic>> PutExperience(int id, Experience experience)
    {
        var existingExperience = await _context.Experience.FindAsync(id);

        if(existingExperience == null)
        {
            return NotFound();
        }

        existingExperience.company = experience.company;
        existingExperience.position = experience.position;
        existingExperience.description = experience.description;
        existingExperience.start_date = experience.start_date;
        existingExperience.end_date = experience.end_date;
        existingExperience.is_present = experience.is_present;
        

        await _context.SaveChangesAsync();

        return Ok(existingExperience);
    }
}