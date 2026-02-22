using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using resume_api.Models;

namespace resume_api.Controllers;

[ApiController]
[Route("[controller]")]
public class ProjectController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProjectController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<IEnumerable<Project>>> PostProject(IEnumerable<Project> projectList)
    {
        try
        {
            // Iterate through the list and add each Project object to the context
            foreach (var project in projectList)
            {
                _context.Project.Add(project);
            }

            // Save changes to the database
            await _context.SaveChangesAsync();

            return Ok(projectList);  // Return the posted education list

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<dynamic>> GetProjectByResumeId(int id)
    {
        if (id==0)
        {
            return BadRequest("Id is required.");
        }

        var project = await _context.Project.Where(u => u.resume_id == id).ToListAsync();

        if (project == null || !project.Any())
        {
            return NotFound();
        }

        return project;
    }
    [HttpPut("{id}")]
    public async Task<ActionResult<dynamic>> PutProject(int id, Project project)
    {
        var existingProject = await _context.Project.FindAsync(id);

        if(existingProject == null)
        {
            return NotFound();
        }

        existingProject.project_name = project.project_name;
        existingProject.description = project.description;
        

        await _context.SaveChangesAsync();

        return Ok(existingProject);
    }
}