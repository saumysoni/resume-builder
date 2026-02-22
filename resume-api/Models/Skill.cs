using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace resume_api.Models;

[Table("Skill")]
public class Skill
{
    [Key]
    public int skill_id { get; set; }
    public int resume_id { get; set; }

    [Required]
    public required string skill_name { get; set; }

    [ForeignKey("resume_id")]
    public Resume? Resume { get; set; }
}
