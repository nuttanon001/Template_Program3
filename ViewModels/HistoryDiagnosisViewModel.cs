using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Template_Program.ViewModels
{
    public class HistoryDiagnosisViewModel
    {
        public int? PetId { get; set; }
        public int? CustomerId { get; set; }
        public DateTime? SDate { get; set; }
        public DateTime? EDate { get; set; }
        public int? Skip { get; set; }
        public int? Take { get; set; }
        public string SortField { get; set; }
        public int? SortOrder { get; set; }
        public int? TotalRow { get; set; }
    }
}
