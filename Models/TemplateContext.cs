using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Template_Program.Models
{
    public class TemplateContext:DbContext
    {
        public TemplateContext(DbContextOptions<TemplateContext> options)
            : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Breed>().ToTable("Breed")
                .HasIndex(b => b.Name).IsUnique();
            modelBuilder.Entity<Breed>().HasData(
                new { BreedId = 1, Name = "สุนัข", Description = "สุนัข", CreateDate = DateTime.Now },
                new { BreedId = 2, Name = "แมว", Description = "แมว", CreateDate = DateTime.Now },
                new { BreedId = 3, Name = "เต่า", Description = "เต่า", CreateDate = DateTime.Now },
                new { BreedId = 4, Name = "กระรอก", Description = "กระรอก", CreateDate = DateTime.Now },
                new { BreedId = 5, Name = "กระต่าย", Description = "กระต่าย", CreateDate = DateTime.Now });

            modelBuilder.Entity<Customer>().ToTable("Customer")
                .HasIndex(i => i.PhoneNo).IsUnique();
            modelBuilder.Entity<Diagnoses>().ToTable("Diagnoses");
            modelBuilder.Entity<Medicines>().ToTable("Medicines");
            modelBuilder.Entity<Pet>().ToTable("Pet");
            modelBuilder.Entity<PetHaveDiagnosis>().ToTable("PetHaveDiagnosis");
            modelBuilder.Entity<Treatments>().ToTable("Treatments");
        }

        // Dbset
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Breed> Breeds { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Diagnoses> Diagnoses { get; set; }
        public DbSet<Medicines> Medicines { get; set; }
        public DbSet<Pet> Pets { get; set; }
        public DbSet<PetHaveDiagnosis> PetHaveDiagnosis { get; set; }
        public DbSet<Treatments> Treatments { get; set; }
    }
}
