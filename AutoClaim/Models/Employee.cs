using System;
using System.Collections.Generic;

namespace AutoClaim.Models
{
    public partial class Employee
    {
        public Employee()
        {
            Claim = new HashSet<Claim>();
            Vehicle = new HashSet<Vehicle>();
        }

        public int Empid { get; set; }
        public string Password { get; set; }
        public string Designation { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int? Mobno { get; set; }
        public int? AlternateMobile { get; set; }
        public int? Age { get; set; }
        public string Address { get; set; }

        public ICollection<Claim> Claim { get; set; }
        public ICollection<Vehicle> Vehicle { get; set; }
    }
}
