using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoClaim.Models
{
    public partial class Policy
    {
        public Policy()
        {
            Claim = new HashSet<Claim>();
        }

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
