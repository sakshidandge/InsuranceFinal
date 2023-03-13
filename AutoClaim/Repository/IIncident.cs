using AutoClaim.AtoModel;
using AutoClaim.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoClaim.Repository
{
    public interface IIncident
    {
        Task<List<IncidentAm>> GetAllIncidents();
        Task<IncidentAm> GetById(int id);
        Task<Incident> GetIncidentByVehicleId(int id);
        Task<int> AddIncident(Incident incident);
        Task<string> SaveFileAsync(IFormFile File);
    }
}
