using AutoClaim.AtoModel;
using AutoClaim.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoClaim.Repository
{
     public interface IEmployee
    {
        Task<List<EmployeeAm>> GetAllEmployees();
        Task<EmployeeAm> GetById(int id);

        Task<int> AddEmployee(EmployeeAm employee);

        Task<EmployeeAm> GetByEmail(String email);
        //Task<List<Policy>> GetPolicyByEmp(int id);
        Task<List<int>> GetVehicleid(int id);
        Task<List<Policy>> GetPolicies(int id);
    }
}
