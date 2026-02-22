using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace resume_api.Models;

[Table("Education")]
public class Education
{
    [Key]
    public int education_id { get; set; }
    public int resume_id { get; set; }
    
    [Required]
    public required string program { get; set; }
    
    [Required]
    public required string institution { get; set; }

    [Required]
    public required string description { get; set; }
    
    [Required]
    public required DateTime start_date { get; set; }
    public DateTime? end_date { get; set; }

    [Required]
    public required bool is_present { get; set; }

    [ForeignKey("resume_id")]
    public Resume? Resume { get; set; }

}
