using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoClaim.AtoModel;
using AutoClaim.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AutoClaim.Repository
{
    public class ClaimRepo : IClaim

    {

        private readonly Insc_74052Context contextFile;
        private readonly IMapper _mapper;

        public ClaimRepo(Insc_74052Context contextFile , IMapper mapper)
        {
            this.contextFile = contextFile;
            this._mapper = mapper;
        }

        public async Task<int> AddClaim(Claim claim)
        {
            contextFile.Claim.Add(claim);
            int res = await contextFile.SaveChangesAsync();
            if (res > 0)
            {
                return 1;
            }
            return 0;
        }

        public async Task<List<ClaimAm>> GetAllClaim()
        {
            var ar = await contextFile.Claim.ToListAsync();
            var data = _mapper.Map <List<ClaimAm>>(ar);
            return data;
        }

        public async Task<ClaimAm> GetById(int id)
        {
            var ar = await contextFile.Claim.Where(x => x.Claimid == id).FirstOrDefaultAsync();
            var data = _mapper.Map<ClaimAm>(ar);
            return data;
        }

        public async Task<List<Claim>> GetClaimsBystatus(string status)
        {
            return await contextFile.Claim.Where(x => x.Claimstatus == status).ToListAsync();
        }

        public async Task<Claim> UpdateClaim(int claimid , Claim claim)
        {
            var res = await contextFile.Claim.Where(x => x.Claimid == claimid).FirstOrDefaultAsync();
            if (res != null)
            {
                res.Claimstatus = claim.Claimstatus;
                res.Approvedamt = claim.Approvedamt;
                res.Remarks = claim.Remarks;

                int data = await contextFile.SaveChangesAsync();
                if (data > 0)
                {
                    return res;
                }
                return null;
           
            }
            return null;
        }
    }
}
