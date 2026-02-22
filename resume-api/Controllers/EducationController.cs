using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using resume_api.Models;

namespace resume_api.Controllers;

[ApiController]
[Route("[controller]")]
public class EducationController : ControllerBase
{
    private readonly AppDbContext _context;

    public EducationController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<IEnumerable<Education>>> PostEducation(IEnumerable<Education> educationList)
    {
        try
        {
            // Iterate through the list and add each Education object to the context
            foreach (var education in educationList)
            {
                _context.Education.Add(education);
            }

            // Save changes to the database
            await _context.SaveChangesAsync();

            return Ok(educationList);  // Return the posted education list

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<List<Education>>> GetEducationByResumeIdAsync(int id)
    {
        if (id == 0)
        {
            return BadRequest("Id is required.");
        }

        var education = await _context.Education.Where(u => u.resume_id == id).ToListAsync();

        if (education == null || !education.Any())
        {
            return NotFound();
        }

        return education;
    }
    [HttpPut("{id}")]
    public async Task<ActionResult<dynamic>> PutEducation(int id, Education education)
    {
        var existingEducation = await _context.Education.FindAsync(id);

        if(existingEducation == null)
        {
            return NotFound();
        }

        existingEducation.program = education.program;
        existingEducation.institution = education.institution;
        existingEducation.description = education.description;
        existingEducation.start_date = education.start_date;
        existingEducation.end_date = education.end_date;
        existingEducation.is_present = education.is_present;
        

        await _context.SaveChangesAsync();

        return Ok(existingEducation);
    }
}
