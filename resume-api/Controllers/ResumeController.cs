using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using resume_api.Models;

namespace resume_api.Controllers;

[ApiController]
[Route("[controller]")]
public class ResumeController : ControllerBase
{
    private readonly AppDbContext _context;

    public ResumeController(AppDbContext context)
    {
        _context = context;
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<dynamic>> GetResumeByResumeId(int id)
    {
        if (id==0)
        {
            return BadRequest("Id is required.");
        }

        var resume = await _context.Resume.FindAsync(id);

        if (resume == null)
        {
            return NotFound();
        }

        return resume;
    }

    [HttpGet]
    public async Task<ActionResult<dynamic>> GetResume()
    {
        var resume = await _context.Resume.ToListAsync();

        if (resume == null || !resume.Any())
        {
            return NotFound();
        }

        return Ok(resume);
    }

    [HttpPost]
    public async Task<ActionResult<dynamic>> PostResume(Resume resume)
    {
        try
        {
            _context.Resume.Add(resume);
            await _context.SaveChangesAsync();

            return resume;

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<dynamic>> PutResume(int id, Resume resume)
    {
        var existingResume = await _context.Resume.FindAsync(id);

        if(existingResume == null)
        {
            return NotFound();
        }

        existingResume.full_name = resume.full_name;
        existingResume.contact_no = resume.contact_no;
        existingResume.bio = resume.bio;
        existingResume.description = resume.description;
        existingResume.email = resume.email;
        existingResume.github = resume.github;
        existingResume.linkedin = resume.linkedin;
        existingResume.last_modified = resume.last_modified;
        existingResume.template_id = resume.template_id;
        existingResume.user_id = resume.user_id;

        await _context.SaveChangesAsync();

        return Ok(existingResume);
    }
}
