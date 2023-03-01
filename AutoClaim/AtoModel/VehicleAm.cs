using AutoClaim.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoClaim.AtoModel
{
    public class VehicleAm
    {
        public int Id { get; set; }
        public string Vehicleno { get; set; }
        public string Modelname { get; set; }
        public int? Serialno { get; set; }
        public int? Regno { get; set; }
        public string Vehicletype { get; set; }
        public int? Empid { get; set; }
        public int? Vehiclecost { get; set; }
        public DateTime? Regdate { get; set; }

        public Employee Emp { get; set; }
        public ICollection<Incident> Incident { get; set; }
        public ICollection<Policy> Policy { get; set; }
    }
}
