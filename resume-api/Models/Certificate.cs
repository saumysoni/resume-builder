using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace resume_api.Models;

[Table("Certificate")]
public class Certificate
{
    [Key]
    public int certi_id { get; set; }
    public int resume_id { get; set; }

    [Required]
    public required string certi_name { get; set; }
    [Required]
    public required DateTime start_date { get; set; }
    public DateTime? end_date { get; set; }

    [Required]
    public required bool is_present { get; set; }
    public string? description { get; set; }

    [ForeignKey("resume_id")]
    public Resume? Resume { get; set; }

}
