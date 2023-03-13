using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoClaim.AtoModel;
using AutoClaim.Models;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace AutoClaim.Repository
{
    public class IncidentRepo : IIncident
    {
        private readonly Insc_74052Context contextFile;
        private readonly IHostingEnvironment _hostEnvironment;
        private readonly IMapper _mapper;


        public IncidentRepo(Insc_74052Context contextFile, IHostingEnvironment hostingEnvironment,IMapper mapper)
        {
            this.contextFile = contextFile;
            this._hostEnvironment = hostingEnvironment;
            this._mapper = mapper;
        }

        public async Task<int> AddIncident(Incident incident)
        {
            var _Incident = new Incident
            {

                Location = incident.Location,
                Fircopy = incident.Fircopy,
                Reason = incident.Reason,
                Vehicleid = incident.Vehicleid,
                Inctype = incident.Inctype

            };

            contextFile.Incident.Add(_Incident);
            int res = await contextFile.SaveChangesAsync();
            if (res > 0)
            {
                return 1;
            }
            return 0;
        
    }

        public async Task<List<IncidentAm>> GetAllIncidents()
        {
            var ar = await contextFile.Incident.ToListAsync();
            var data = _mapper.Map<List<IncidentAm>>(ar);
            return data;
        }

        public async Task<IncidentAm> GetById(int id)
        {
            var ar = await contextFile.Incident.Where(x => x.Incidentid == id).FirstOrDefaultAsync();
            var data = _mapper.Map<IncidentAm>(ar);
            return data;
        }

        public async Task<Incident> GetIncidentByVehicleId(int id)
        {
            var ar = contextFile.Incident.Where(x => x.Vehicleid == id).FirstOrDefaultAsync();
            return await ar;
        }

        public async Task<string> SaveFileAsync(IFormFile File)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(File.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(File.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Document", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await File.CopyToAsync(fileStream);
            }
            return imageName;
        }


    }
}
