using AutoClaim.AtoModel;
using AutoClaim.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AutoClaim.Repository
{
     public interface IPolicy
    {
        Task<List<Policy>> GetAllPolicy(string searchBy);

        Task<PolicyAm> GetById(int id);
        Task<List<Policy>> GetByVehicleId(int vid);
        Task<int> AddPolicy(Policy policy);
      
        Task<string> SaveFileAsync(IFormFile File);

        Task<Policy> UpdatePolicy(int policyid, Policy policy);

        
    }
}
