using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace resume_api.Models;

[Table("User")]
public class User
{
    [Key]
    public int user_id { get; set; }
    [Required]
    public required string fname { get; set; }
    [Required]
    public required string lname { get; set; }
    public string? contactno { get; set; }
    [Required]
    public required string email { get; set; }
    [Required]
    public required string password { get; set; }
    [Required]
    public required bool isPremium { get; set; }

}
