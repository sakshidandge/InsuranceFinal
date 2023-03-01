using AutoClaim.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AutoClaim.AtoModel
{
    public class PolicyAm
    {
        public int Policyid { get; set; }
        public int? VehicleId { get; set; }
        public string Policytype { get; set; }
        public DateTime? Startdate { get; set; }
        public DateTime? Enddate { get; set; }
        public DateTime? Policydate { get; set; }
        public string History { get; set; }
        public string Documentssrc { get; set; }
        public int? Idv { get; set; }
        public int? Premium { get; set; }

        public Vehicle Vehicle { get; set; }
        [NotMapped]
        public IFormFile File { get; set; }
        public ICollection<Claim> Claim { get; set; }
    }
}

