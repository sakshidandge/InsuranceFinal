using AutoClaim.AtoModel;
using AutoClaim.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoClaim.Repository
{
    public class VehicleRepo:IVehicle
    {
        private readonly Insc_74052Context contextFile;
        private readonly IMapper _mapper;
        public VehicleRepo(Insc_74052Context contextFile,IMapper mapper)
        {
            this.contextFile = contextFile;
            this._mapper = mapper;
        }

        public async Task<int> AddVehicle(Vehicle vehicle)
        {
            contextFile.Vehicle.Add(vehicle);
            int res = await contextFile.SaveChangesAsync();
            if (res > 0)
            {
                return 1;
            }
            return 0;
        }

        public async Task<List<VehicleAm>> GetAllVehicles()
        {
            var ar = await contextFile.Vehicle.ToListAsync();
            var data = _mapper.Map<List<VehicleAm>>(ar);
            return data;
        }

      

        public async Task<VehicleAm> GetById(int id)
        {
            var ar = await contextFile.Vehicle.Where(x => x.Id == id).FirstOrDefaultAsync();
            var data = _mapper.Map<VehicleAm>(ar);
            return data;
        }

        public async Task<List<Vehicle>> GetByEmpId(int empid)
        {
            var arr = await contextFile.Vehicle.Where(x => x.Empid == empid).Select(x=> new Vehicle
            {
                Id =x.Id,
                Vehicleno =x.Vehicleno,
                Modelname = x.Modelname,
                Serialno =x.Serialno,
                Regdate = x.Regdate,
                Regno = x.Regno,
                Vehicletype =x.Vehicletype,
                Empid =x.Empid,
                Vehiclecost =x.Vehiclecost,
                Policy = x.Policy
            }).ToListAsync();
            return arr;
    
        }
    }
}
