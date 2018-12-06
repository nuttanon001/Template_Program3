using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Template_Program.Models;
namespace Template_Program.ViewModels
{
    public class PetHaveDiagnosisViewModel:PetHaveDiagnosis
    {
        public string PetName { get; set; }
        public string CustomerName { get; set; }
        public string BreedName { get; set; }
    }
}
