using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoClaim.Models;
using AutoClaim.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AutoClaim.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClaimController : ControllerBase
    {
        private readonly IClaim claim;
        private readonly Insc_74052Context context;
        public ClaimController(IClaim claim, Insc_74052Context context)
        {
            this.claim = claim;
            this.context = context;
        }

        [HttpGet("ClaimsByStatus/{status}")]
        public async Task<IActionResult> GetClaimsByStatus(string status)
        {

            return  Ok(await claim.GetClaimsBystatus(status));
        }
        [HttpGet]
        public async Task<IActionResult> GetAllClaim()
        {
            var ar = await claim.GetAllClaim();
            if (ar != null)
            {
                return Ok(ar);
            }
            return NotFound();
        }

        [HttpGet("{id}")]

        public async Task<IActionResult> GetById(int id)
        {
            var ar = await claim.GetById(id);
            if (ar != null)
            {
                return Ok(ar);
            }
            return NotFound();
        }

        [HttpPost]

        public async Task<IActionResult> AddClaim(Claim cl)
        {
            var ar = await claim.AddClaim(cl);
            if (ar > 0)
            {
                return Ok(ar);
            }
            return NotFound();
        }


        [HttpPut("{claimid}")]
        public async Task<IActionResult> UpdateClaim(int claimid, Claim c)
        {
            var res = await claim.UpdateClaim(claimid, c);
            if (res != null)
            {
                return Ok(res);
            }

            return NotFound();

        }

    }
} 
