using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AutoClaim.Models
{
    public partial class Insc_74052Context : DbContext
    {
        public Insc_74052Context()
        {
        }

        public Insc_74052Context(DbContextOptions<Insc_74052Context> options)
            : base(options)
        {
        }

        public virtual DbSet<Claim> Claim { get; set; }
        public virtual DbSet<Employee> Employee { get; set; }
        public virtual DbSet<Incident> Incident { get; set; }
        public virtual DbSet<Policy> Policy { get; set; }
        public virtual DbSet<Vehicle> Vehicle { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
               // optionsBuilder.UseSqlServer("Server=10.3.117.39;Database=Insc_74052;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Claim>(entity =>
            {
                entity.ToTable("claim");

                entity.Property(e => e.Claimid).HasColumnName("claimid");

                entity.Property(e => e.Approvedamt).HasColumnName("approvedamt");

                entity.Property(e => e.Claimamt).HasColumnName("claimamt");

                entity.Property(e => e.Claimstatus)
                    .HasColumnName("claimstatus")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('pending')");

                entity.Property(e => e.Empid).HasColumnName("empid");

                entity.Property(e => e.Policyid).HasColumnName("policyid");

                entity.Property(e => e.Remarks)
                    .HasColumnName("remarks")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.HasOne(d => d.Emp)
                    .WithMany(p => p.Claim)
                    .HasForeignKey(d => d.Empid)
                    .HasConstraintName("FK__claim__empid__6477ECF3");

                entity.HasOne(d => d.Policy)
                    .WithMany(p => p.Claim)
                    .HasForeignKey(d => d.Policyid)
                    .HasConstraintName("FK__claim__policyid__6383C8BA");
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.Empid);

                entity.ToTable("employee");

                entity.Property(e => e.Empid).HasColumnName("empid");

                entity.Property(e => e.Address)
                    .HasColumnName("address")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Age).HasColumnName("age");

                entity.Property(e => e.AlternateMobile).HasColumnName("alternateMobile");

                entity.Property(e => e.Designation)
                    .HasColumnName("designation")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Mobno).HasColumnName("mobno");

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .HasColumnName("password")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Incident>(entity =>
            {
                entity.ToTable("incident");

                entity.Property(e => e.Incidentid).HasColumnName("incidentid");

                entity.Property(e => e.Fircopy)
                    .HasColumnName("FIRcopy")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Inctype)
                    .HasColumnName("inctype")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Location)
                    .HasColumnName("location")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Reason)
                    .HasColumnName("reason")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Vehicleid).HasColumnName("vehicleid");

                entity.HasOne(d => d.Vehicle)
                    .WithMany(p => p.Incident)
                    .HasForeignKey(d => d.Vehicleid)
                    .HasConstraintName("FK__incident__vehicl__60A75C0F");
            });

            modelBuilder.Entity<Policy>(entity =>
            {
                entity.ToTable("policy");

                entity.Property(e => e.Policyid).HasColumnName("policyid");

                entity.Property(e => e.Documentssrc)
                    .HasColumnName("documentssrc")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Enddate)
                    .HasColumnName("enddate")
                    .HasColumnType("datetime");

                entity.Property(e => e.History)
                    .HasColumnName("history")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Idv).HasColumnName("idv");

                entity.Property(e => e.Policydate)
                    .HasColumnName("policydate")
                    .HasColumnType("datetime");

                entity.Property(e => e.Policytype)
                    .HasColumnName("policytype")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Premium).HasColumnName("premium");

                entity.Property(e => e.Startdate)
                    .HasColumnName("startdate")
                    .HasColumnType("datetime");

                entity.Property(e => e.VehicleId).HasColumnName("vehicleId");

                entity.HasOne(d => d.Vehicle)
                    .WithMany(p => p.Policy)
                    .HasForeignKey(d => d.VehicleId)
                    .HasConstraintName("FK__policy__vehicleI__5DCAEF64");
            });

            modelBuilder.Entity<Vehicle>(entity =>
            {
                entity.ToTable("vehicle");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Empid).HasColumnName("empid");

                entity.Property(e => e.Modelname)
                    .HasColumnName("modelname")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Regdate)
                    .HasColumnName("regdate")
                    .HasColumnType("datetime");

                entity.Property(e => e.Regno).HasColumnName("regno");

                entity.Property(e => e.Serialno).HasColumnName("serialno");

                entity.Property(e => e.Vehiclecost).HasColumnName("vehiclecost");

                entity.Property(e => e.Vehicleno)
                    .HasColumnName("vehicleno")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Vehicletype)
                    .HasColumnName("vehicletype")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Emp)
                    .WithMany(p => p.Vehicle)
                    .HasForeignKey(d => d.Empid)
                    .HasConstraintName("FK__vehicle__empid__5AEE82B9");
            });
        }
    }
}
