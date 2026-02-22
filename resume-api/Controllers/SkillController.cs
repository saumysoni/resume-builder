using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using resume_api.Models;

namespace resume_api.Controllers;

[ApiController]
[Route("[controller]")]
public class SkillController : ControllerBase
{
    private readonly AppDbContext _context;

    public SkillController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<IEnumerable<Skill>>> PostSkill(IEnumerable<Skill> skillList)
    {
        try
        {
            // Iterate through the list and add each Skill object to the context
            foreach (var skill in skillList)
            {
                _context.Skill.Add(skill);
            }

            // Save changes to the database
            await _context.SaveChangesAsync();

            return Ok(skillList);  // Return the posted education list

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<dynamic>> GetSkillByResumeId(int id)
    {
        if (id==0)
        {
            return BadRequest("Id is required.");
        }

        var skill = await _context.Skill.Where(u => u.resume_id == id).ToListAsync();

        if (skill == null || !skill.Any())
        {
            return NotFound();
        }

        return skill;
    }
    [HttpPut("{id}")]
    public async Task<ActionResult<dynamic>> PutSkill(int id, Skill skill)
    {
        var existingSkill = await _context.Skill.FindAsync(id);

        if(existingSkill == null)
        {
            return NotFound();
        }
        
        existingSkill.skill_name = skill.skill_name;

        await _context.SaveChangesAsync();

        return Ok(existingSkill);
    }
}