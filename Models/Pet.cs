using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Template_Program.Models
{
    public class Pet:BaseModel
    {
        [Key]
        public int PetId { get; set; }
        [StringLength(250)]
        public string PetName { get; set; }
        public string Image { get; set; }
        public PetSex Sex { get; set; }
        public bool? Sterilization { get; set; }
        [StringLength(250)]
        public string Remark { get; set; }
        public DateTime? BirthDate { get; set; }
        public DateTime? RegisterDate { get; set; }
        // Relation
        public int? CustomerId { get; set; }
        public virtual Customer Customer { get; set; }
        public int? BreedId { get; set; }
        public virtual Breed Breed { get; set; }
    }

  
    public enum PetSex
    {
        Male = 1,
        Female,
        MaleSterile,
        FemaleSterile
    }
}
