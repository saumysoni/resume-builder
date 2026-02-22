using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace resume_api.Models;

[Table("Resume")]
public class Resume
{
    [Key]
    public int resume_id { get; set; }
    public int user_id { get; set; }

    [Required]
    public int template_id {get;set;}

    [Required]
    public required string full_name { get; set; }
    [Required]
    public required string contact_no { get; set; }

    [Required]
    public required string email { get; set; }
    
    public string? github {get;set;}
    public string? linkedin {get;set;}
    public string? bio {get;set;}
    public string? description {get;set;}

    [Required]
    public required DateTime last_modified { get; set; }

    [ForeignKey("user_id")]
    public User? User { get; set; }



     // [Required]
    // public required List<Education> Education { get; set; }

    // [Required]
    // public required List<Experience> Experience { get; set; }

    // [Required]
    // public required List<Project> Projects { get; set; }

    // [Required]
    // public required List<Skill> Skills { get; set; }

    // [Required]
    // public required List<Certificate> Certificate { get; set; }

}
