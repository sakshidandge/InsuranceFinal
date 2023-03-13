using AutoClaim.AtoModel;
using AutoClaim.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoClaim.Repository
{
     public interface IClaim
    {
        Task<List<ClaimAm>> GetAllClaim();
        Task<ClaimAm> GetById(int id);
        Task<int> AddClaim(Claim claim);
        Task<Claim> UpdateClaim( int claimid,Claim claim);
        Task<List<Claim>> GetClaimsBystatus(string status);
    }
}
