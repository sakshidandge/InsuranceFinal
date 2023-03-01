using AutoClaim.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AutoClaim.AtoModel
{
    public class IncidentAm
    {
        public int Incidentid { get; set; }
        public int? Vehicleid { get; set; }
        public string Location { get; set; }
        public string Reason { get; set; }
        public string Inctype { get; set; }
        public string Fircopy { get; set; }

        [NotMapped]
        public IFormFile File { get; set; }
        public Vehicle Vehicle { get; set; }
    }
}
