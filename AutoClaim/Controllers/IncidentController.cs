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
    public class IncidentController : ControllerBase
    {
        private readonly IIncident incident;
        private readonly Insc_74052Context context;
        public IncidentController(IIncident incident, Insc_74052Context context)
        {
            this.incident = incident;
            this.context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllIncidents()
        {
            var ar = await incident.GetAllIncidents();
            if (ar != null)
            {
                return Ok(ar);
            }
            return NotFound();
        }


        [HttpGet("{id}")]

        public async Task<IActionResult> GetById(int id)
        {
            var ar = await incident.GetById(id);
            if (ar != null)
            {
                return Ok(ar);
            }
            return NotFound();
        }

        [HttpGet("vehicleid/{id}")]

        public async Task<IActionResult> GetByVehicleId(int id)
        {
            var ar = await incident.GetIncidentByVehicleId(id);
            if (ar != null)
            {
                return Ok(ar);
            }
            return NotFound();
        }

        [HttpPost("add-incident")]

        public async Task<IActionResult> AddIncident([FromForm] Incident incident1)
        {
            incident1.Fircopy = await incident.SaveFileAsync(incident1.File);
                  var ar = await incident.AddIncident(incident1);
            if (ar > 0)
            {
                return Ok(ar);
            }
          return BadRequest();
        }
}
}

