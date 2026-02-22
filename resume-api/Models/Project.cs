using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace resume_api.Models;

[Table("Project")]
public class Project
{
    [Key]
    public int project_id { get; set; }
    public int resume_id { get; set; }

    [Required]
    public required string project_name { get; set; }
    public string? description { get; set; }
    
    [ForeignKey("resume_id")]
    public Resume? Resume { get; set; }

}
