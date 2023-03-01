using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoClaim.AtoModel;
using AutoClaim.Models;
using AutoClaim.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AutoClaim.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployee emp;
        private readonly Insc_74052Context context;
        public EmployeesController(IEmployee emp, Insc_74052Context context)
        {
            this.emp = emp;
            this.context = context;
        }

        [HttpGet]

        public async Task<IActionResult> GetAllEmployees()
        {
            var ar = await emp.GetAllEmployees();
            if (ar != null)
            {
                return Ok(ar);
            }
            return NotFound();
        }

        [HttpGet("{id}")]

        public async Task<IActionResult> GetById(int id)
        {
            var ar = await emp.GetById(id);
            if (ar != null)
            {
                return Ok(ar);
            }
            return NotFound();
        }

        [HttpGet("email/{email}")]

        public async Task<IActionResult> GetByEmail(string email)
        {
            var ar = await emp.GetByEmail(email);
            if (ar != null)
            {
                return Ok(ar);
            }
            return NotFound();
        }


        [HttpPost]
        public async Task<IActionResult> AddNewEmployee(EmployeeAm employee)
        {
            var ar = await emp.AddEmployee(employee);
            if (ar > 0)
            {
                return Ok(ar);
            }
            return NotFound();
        }
    }
}

/*[HttpGet("Demo/{id}")]
        public async Task<IActionResult> ViewPolicyByEmp(int id)
        {
            var ar =await emp.GetPolicyByEmp(id);
                
            return Ok(ar);
        }*/


   
