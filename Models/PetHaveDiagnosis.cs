using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Template_Program.Models
{
    public class PetHaveDiagnosis : BaseModel
    {
        [Key]
        public int PetHaveDiagnosisId { get; set; }
        [StringLength(250)]
        public string Description { get; set; }
        [StringLength(250)]
        public string Remark { get; set; }
        public DateTime DiagnosisDate { get; set; }
        public double? Weight { get; set; }
        public double? BreathingRate { get; set; }
        public double? HeartRate { get; set; }
        public MucousMembrane? MucousMembrane { get; set; }
        public bool? HeartSound { get; set; }
        public bool? LungSound { get; set; }
        public bool? Hydration { get; set; }
        public double? Temperature { get; set; }
        public StatusPetHasDiagonsis? StatusPetHasDiagonsis { get; set; }
        //Relation
        public int? PetId { get; set; }
        public virtual Pet Pet { get; set; }
        public virtual ICollection<Diagnoses> Diagnoses { get; set; } = new List<Diagnoses>();
        public virtual ICollection<Treatments> Treatments { get; set; } = new List<Treatments>();
    }

    public enum MucousMembrane
    {
        VeryDarkRedGums = 1,
        PinkAndMoistGums,
        WhiteOrPaleGums,
        BlueCyanosisGums,
        YellowJaundiceGums,
        Petechia,
    }

    public enum StatusPetHasDiagonsis
    {
        Diagnosis = 1,
        Treatment,
        Complate,
        Cancel,
        Pause
    }
}
