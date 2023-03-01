using AutoClaim.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoClaim.AtoModel
{
    public class ClaimAm
    {
        public int Claimid { get; set; }
        public int? Policyid { get; set; }
        public int? Empid { get; set; }
        public int? Claimamt { get; set; }
        public int? Approvedamt { get; set; }
        public string Claimstatus { get; set; }
        public string Remarks { get; set; }

        public Employee Emp { get; set; }
        public Policy Policy { get; set; }
    }
}
