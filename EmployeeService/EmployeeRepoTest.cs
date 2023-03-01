using AutoClaim.Models;
using AutoClaim.Repository;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System.Collections.Generic;

namespace Tests
{
    public class EmployeeRepoTest

    {
        private static DbContextOptions<Insc_74052Context> dbContextOptions = new DbContextOptionsBuilder<Insc_74052Context>()
           .UseInMemoryDatabase(databaseName: "Insurance_74052Service")
            .Options;

        Insc_74052Context context;

        [OneTimeSetUp]
        public void Setup()
        {
            context = new Insc_74052Context(dbContextOptions);
            context.Database.EnsureCreated();

            SeedDatabase();
            EmployeeRepo employeeRepo;
            IMapper mapper;

            employeeRepo = new EmployeeRepo(context,mapper);

        }
       

        [OneTimeTearDown]
        public void CleaUp()
        {
            context.Database.EnsureDeleted();
        }

        private void SeedDatabase()
        {
            var employee = new List<Employee>
            {
                new Employee()
                {
                    Empid=1,
                    Password="employee@123",
                    Name="employee",
                    Email="employee@gmail.com",
                    AlternateMobile=674673,
                    Address="pune",
                    Mobno=6673543,
                    Age=23,
                    Designation="employee"
                },

                new Employee()
                {
                    Empid=2,
                    Password="employee1@gmail.com",
                    Name="employee1",
                    Email="employee1@gmail.com",
                    AlternateMobile=90878,
                    Mobno=78767,
                    Age=34,
                    Designation="employee",
                    Address="mumbai"

                },

             
        };
            context.Employee.AddRange(employee);

            var vehicle = new List<Vehicle>
            {
                new Vehicle ()
                {
                    Id = 1,
                    Vehiclecost = 345666,
                    Vehicleno="ar-900",
                    Vehicletype="2-wheeler",
                    Modelname="maruti",
                    Regno=34545,
                    Serialno=23433,
                    Empid=1
       
                }
            };

            context.Vehicle.AddRange(vehicle);
            context.SaveChanges();


            }
    }
}