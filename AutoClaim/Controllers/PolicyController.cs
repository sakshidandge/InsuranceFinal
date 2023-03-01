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
    public class PolicyController : ControllerBase
    {
        private readonly IPolicy policy;
        private readonly Insc_74052Context context;
        private readonly EmployeeRepo emprepo;
        public PolicyController(IPolicy policy, Insc_74052Context context)
        {
            this.policy = policy;
            this.context = context;
        }

        [HttpGet("vehicleid/{vid}")]

        public async Task<IActionResult> GetByVehicleId(int vid)
        {
            var ar = await policy.GetByVehicleId(vid);
            if (ar != null)
            {
                return Ok(ar);
            }
            return NotFound();
        }

        [HttpGet]

        public async Task<IActionResult> GetAllPolicy(string searchBy)
        {
            var ar = await policy.GetAllPolicy(searchBy);
            if (ar != null)
            {
                return Ok(ar);
            }
            return NotFound();
        }

        [HttpGet("{id}")]

        public async Task<IActionResult> GetById(int id)
        {
            var ar = await policy.GetById(id);
            if (ar != null)
            {
                return Ok(ar);
            }
            return NotFound();
        }

        [HttpPut("updatepolicyid/{policyid}")]

        public async Task<IActionResult> UpdatePolicy(int policyid , Policy p)
        {
            var res = await policy.UpdatePolicy(policyid, p);
            if(res != null)
            {
                return Ok(res);
            }

            return NotFound();
        }

      /* [HttpGet("getpolicy/{id}")]

        public async Task<IActionResult> GetPolicies(int id )
        {
            var ar =context.Vehicle.Where(x => x.Empid == id).ToList();
            List<Policy> result = new List<Policy>();
            foreach(var i in ar)
            {
                Policy temp =  context.Policy.Where(x => x.VehicleId == i.Id).FirstOrDefault();
                result.Add(temp);
            }
            return Ok(ar);
        }*/
        
       [HttpPost("add-policy")]
       public async Task<IActionResult> AddPolicy([FromForm] Policy policy1)
        {
              policy1.Documentssrc = await policy.SaveFileAsync(policy1.File);
                var ar = await policy.AddPolicy(policy1);
                 if (ar > 0)
                { 
                   return Ok(ar);
                 }
                 
            

            return BadRequest();
            //var ar = await policy.AddPolicy(policy1);
            // if (ar > 0)
            //{
            //   return Ok(ar);
            // }
            // return NotFound();
        }
        
    }


}
