﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Template_Program.Models;
namespace Template_Program.ViewModels
{
    public class CustomerViewModel:Customer
    {
        public string Age { get; set; }
        public string FullName { get; set; }
        public string ListPets { get; set; }
    }
}
