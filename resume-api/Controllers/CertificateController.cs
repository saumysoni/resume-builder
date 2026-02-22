using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using resume_api.Models;

namespace resume_api.Controllers;

[ApiController]
[Route("[controller]")]
public class CertificateController : ControllerBase
{
    private readonly AppDbContext _context;

    public CertificateController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<IEnumerable<Certificate>>> PostCertificate(IEnumerable<Certificate> certificateList)
    {
        try
        {
            // Iterate through the list and add each Certificate object to the context
            foreach (var certificate in certificateList)
            {
                _context.Certificate.Add(certificate);
            }

            // Save changes to the database
            await _context.SaveChangesAsync();

            return Ok(certificateList);  // Return the posted education list

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<dynamic>> GetCertificateByResumeId(int id)
    {
        if (id==0)
        {
            return BadRequest("Id is required.");
        }

        var certificate = await _context.Certificate.Where(u => u.resume_id == id).ToListAsync();

        if (certificate == null)
        {
            return NotFound();
        }

        return certificate;
    }
}