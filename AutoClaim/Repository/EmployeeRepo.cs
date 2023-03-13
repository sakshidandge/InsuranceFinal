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
    public class EmployeeRepo : IEmployee
    {
        private readonly Insc_74052Context contextFile;
        private readonly IMapper _mapper;

        public EmployeeRepo(Insc_74052Context contextFile ,IMapper mapper)
        {
            this.contextFile = contextFile;
            this._mapper = mapper;
        }
        public async Task<List<EmployeeAm>> GetAllEmployees()
        {
            var ar = await contextFile.Employee.ToListAsync();
            var data = _mapper.Map<List<EmployeeAm>>(ar);
            return  data;
           
            
        }

        public async Task<EmployeeAm> GetById(int id)
        {
            var ar = await contextFile.Employee.Where(x => x.Empid == id).FirstOrDefaultAsync();
            var data = _mapper.Map<EmployeeAm>(ar);
            return data;

        }

        public async Task<EmployeeAm> GetByEmail(string email)
        {
            var ar = await contextFile.Employee.Where(x => x.Email == email).FirstOrDefaultAsync();
            var data = _mapper.Map<EmployeeAm>(ar);
            return data;

        }

        public async Task<int> AddEmployee(EmployeeAm employee)
        {
            var data = _mapper.Map<Employee>(employee);
            contextFile.Employee.Add(data);
            int res = await contextFile.SaveChangesAsync();
            if (res > 0)
            {
                return 1;
            }
            return 0;
        }
    

         public async Task<List<Policy>> GetPolicyByEmp(int id)
         {

             List<Policy> policy1 = new List<Policy>();
             var ar = await contextFile.Vehicle.Where(x => x.Empid == id).ToListAsync();
             foreach(var a in ar)
             {

                 Policy Temppolicy =await contextFile.Policy.Where(x => x.VehicleId == a.Id).FirstOrDefaultAsync();
                 policy1.Add(Temppolicy);
             }
             return policy1; 

         }

        public async Task<List<int>> GetVehicleid(int id)
        {
            List<int> VehicleId = new List<int>();
            var ar = await contextFile.Vehicle.Where(x => x.Empid == id).ToListAsync();
            foreach (var a in ar)
            {
                VehicleId.Add(a.Id);
            }
            return VehicleId;
        }

            public async Task<List<Policy>> GetPolicies(int id)
        {
            List<Policy> Policy1 = new List<Policy>();
            List<int> vid = new List<int>();
            vid = await GetVehicleid(id);
            foreach(int i in vid)
            {
                Policy temp =  await contextFile.Policy.Where(x => x.VehicleId == i).FirstOrDefaultAsync();
                Policy1.Add(temp);
            }

            return Policy1;
        }

       


        }
    }

    