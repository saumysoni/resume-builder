using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace resume_api.Models;

[Table("Experience")]
public class Experience
{
    [Key]
    public int exp_id { get; set; }
    public int resume_id { get; set; }
    [Required]
    public required string company { get; set; }
    [Required]
    public required string position { get; set; }
    [Required]
    public required DateTime start_date { get; set; }
    public DateTime? end_date { get; set; }
    
    [Required]
    public required bool is_present { get; set; }
    public string? description {get; set;}

    [ForeignKey("resume_id")]
    public Resume? Resume { get; set; }

}
