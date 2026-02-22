using System.Runtime.ConstrainedExecution;
using Microsoft.EntityFrameworkCore;

namespace resume_api.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> User { get; set; } = null!;
    public DbSet<Resume> Resume { get; set; } = null!;
    public DbSet<Project> Project { get; set; } = null!;
    public DbSet<Education> Education { get; set; } = null!;
    public DbSet<Skill> Skill { get; set; } = null!;
    public DbSet<Experience> Experience { get; set; } = null!;
    public DbSet<Certificate> Certificate { get; set; } = null!;
}