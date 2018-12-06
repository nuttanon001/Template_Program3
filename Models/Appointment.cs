using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Template_Program.Models
{
    public class Appointment:BaseModel
    {
        [Key]
        public int AppointmentId { get; set; }
        public DateTime AppointmentDate { get; set; }
        [StringLength(10)]
        public string AppointmentTime { get; set; }
        public AppointmentStatus? AppointmentStatus { get; set; }
        [StringLength(500)]
        public string Description { get; set; }
        [StringLength(500)]
        public string Remark { get; set; }
        //FK
        // Pet
        public int? PetId { get; set; }
        public virtual Pet Pet { get; set; }
    }

    public enum AppointmentStatus
    {
        Wait = 1,
        Complate,
        Cancel
    }
}
