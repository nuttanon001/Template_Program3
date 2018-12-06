using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Template_Program.ViewModels
{
    public class ScheduleViewModel
    {
        public string title { get; set; }
        public int? id { get; set; }
        public DateTime? start { get; set; }
        public DateTime? end { get; set; }
    }
}
