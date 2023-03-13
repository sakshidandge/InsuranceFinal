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
    public class PolicyRepo : IPolicy
    {
        private readonly Insc_74052Context contextFile;
        private readonly IHostingEnvironment _hostEnvironment;
        private readonly IMapper _mapper;


        public PolicyRepo(Insc_74052Context _contextFile, IHostingEnvironment hostEnvironment, IMapper mapper)
        {
              this.contextFile = _contextFile;
            this._hostEnvironment = hostEnvironment;
            this._mapper = mapper;
        }

        public async Task<int> AddPolicy(Policy policy)
        {
           
            
                contextFile.Policy.Add(new Policy {
                    VehicleId = policy.VehicleId,
                    Policydate = policy.Policydate,
                    Startdate=policy.Startdate,
                   Enddate=policy.Enddate,
                   Policytype=policy.Policytype,
                   Documentssrc=policy.Documentssrc,
                   Idv=policy.Idv,
                   Premium=policy.Premium,
                   History=policy.History



                });

                int res = await contextFile.SaveChangesAsync();
                if (res > 0)
                {
                    return 1;
                }
                return 0;
            }

        public async Task<List<Policy>> GetAllPolicy(string searchBy)
        {
            //var ar = contextFile.Policy.ToListAsync();
            List<Policy> ar = null;
            if (searchBy == "" || searchBy == null)
            {
                ar = await contextFile.Policy.ToListAsync();
            }
            else
            {
                ar = await contextFile.Policy.Where(x => x.Policydate.ToString().Contains(searchBy)).ToListAsync();
            }

            return ar;
            //return await ar;
            
        }

        public async Task<PolicyAm> GetById(int id)
        {
            var ar = await contextFile.Policy.Where(x => x.Policyid == id).FirstOrDefaultAsync();
            var data = _mapper.Map<PolicyAm>(ar);
            return  data;
        }

        public async Task<List<Policy>> GetByVehicleId(int vid)
        {
           
               var  ar = await contextFile.Policy.Where(x => x.VehicleId == vid).ToListAsync();
           
            return  ar;
                
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

        public async Task<Policy> UpdatePolicy(int policyid, Policy policy)
        {
            // throw new NotImplementedException();
            var res = await contextFile.Policy.Where(x => x.Policyid == policyid).FirstOrDefaultAsync();
            if (res != null)
            {
                res.Idv = policy.Idv;
                res.Premium = policy.Premium;

                int data = await contextFile.SaveChangesAsync();
                if (data > 0)
                {
                    return res;
                }
                return null;

            }
            return null;
        }
    }
    }




