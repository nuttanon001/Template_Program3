using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Template_Program.Models;

namespace Template_Program.ViewModels
{
    public class OptionScheduleViewModel
    {
        public string Filter { get; set; }
        public int? Skip { get; set; }
        public int? Take { get; set; }
        public DateTime? SDate { get; set; }
        public DateTime? EDate { get; set; }
        public AppointmentStatus? Status { get; set; }
    }
}
