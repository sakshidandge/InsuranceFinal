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
    public class VehiclesController : ControllerBase
    {
        private readonly IVehicle vehicle;
        private readonly Insc_74052Context context;
        public VehiclesController(IVehicle vehicle, Insc_74052Context context)
        {
            this.vehicle = vehicle;
            this.context = context;
        }

        [HttpGet]

        public async Task<IActionResult> GetAllVehicles()
        {
            var ar = await vehicle.GetAllVehicles();
            if (ar != null)
            {
                return Ok(ar);
            }
            return NotFound();
        }

        [HttpGet("{id}")]

        public async Task<IActionResult> GetById(int id)
        {
            var ar = await vehicle.GetById(id);
            if (ar != null)
            {
                return Ok(ar);
            }
            return NotFound();

        }

        [HttpGet("empid/{empid}")]
       

        public async Task<IActionResult> GetByEmpId(int empid)
        {
            var ar = await vehicle.GetByEmpId(empid);
            if (ar != null)
            {
                return Ok(ar);
            }

            return NotFound();
        }

        [HttpPost]

        public async Task<IActionResult> AddVehicle(Vehicle vehicle1)
        {
            var ar = await vehicle.AddVehicle(vehicle1);
            if (ar > 0)
            {
                return Ok(ar);
            }
            return NotFound();
        }

    }
}
    
