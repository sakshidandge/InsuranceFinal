using AutoClaim.AtoModel;
using AutoClaim.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoClaim.Repository
{
    public interface IVehicle
    {
        Task<List<VehicleAm>> GetAllVehicles();
        Task<VehicleAm> GetById(int id);

        Task<List<Vehicle>> GetByEmpId(int empid);
        
        Task<int> AddVehicle(Vehicle vehicle);
    }
}
