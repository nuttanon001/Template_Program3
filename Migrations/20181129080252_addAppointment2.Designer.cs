﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Template_Program.Models;

namespace Template_Program.Migrations
{
    [DbContext(typeof(TemplateContext))]
    [Migration("20181129080252_addAppointment2")]
    partial class addAppointment2
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.0-preview3-35497")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Template_Program.Models.Appointment", b =>
                {
                    b.Property<int>("AppointmentId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("AppointmentDate");

                    b.Property<int?>("AppointmentStatus");

                    b.Property<string>("AppointmentTime")
                        .HasMaxLength(10);

                    b.Property<DateTime?>("CreateDate");

                    b.Property<string>("Description")
                        .HasMaxLength(500);

                    b.Property<DateTime?>("ModifyDate");

                    b.Property<int?>("PetId");

                    b.Property<string>("Remark")
                        .HasMaxLength(500);

                    b.HasKey("AppointmentId");

                    b.HasIndex("PetId");

                    b.ToTable("Appointments");
                });

            modelBuilder.Entity("Template_Program.Models.Breed", b =>
                {
                    b.Property<int>("BreedId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("CreateDate");

                    b.Property<string>("Description")
                        .HasMaxLength(250);

                    b.Property<DateTime?>("ModifyDate");

                    b.Property<string>("Name")
                        .HasMaxLength(50);

                    b.HasKey("BreedId");

                    b.HasIndex("Name")
                        .IsUnique()
                        .HasFilter("[Name] IS NOT NULL");

                    b.ToTable("Breed");

                    b.HasData(
                        new
                        {
                            BreedId = 1,
                            CreateDate = new DateTime(2018, 11, 29, 15, 2, 52, 107, DateTimeKind.Local).AddTicks(4338),
                            Description = "สุนัข",
                            Name = "สุนัข"
                        },
                        new
                        {
                            BreedId = 2,
                            CreateDate = new DateTime(2018, 11, 29, 15, 2, 52, 107, DateTimeKind.Local).AddTicks(9060),
                            Description = "แมว",
                            Name = "แมว"
                        },
                        new
                        {
                            BreedId = 3,
                            CreateDate = new DateTime(2018, 11, 29, 15, 2, 52, 107, DateTimeKind.Local).AddTicks(9076),
                            Description = "เต่า",
                            Name = "เต่า"
                        },
                        new
                        {
                            BreedId = 4,
                            CreateDate = new DateTime(2018, 11, 29, 15, 2, 52, 107, DateTimeKind.Local).AddTicks(9076),
                            Description = "กระรอก",
                            Name = "กระรอก"
                        },
                        new
                        {
                            BreedId = 5,
                            CreateDate = new DateTime(2018, 11, 29, 15, 2, 52, 107, DateTimeKind.Local).AddTicks(9076),
                            Description = "กระต่าย",
                            Name = "กระต่าย"
                        });
                });

            modelBuilder.Entity("Template_Program.Models.Customer", b =>
                {
                    b.Property<int>("CustomerId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasMaxLength(250);

                    b.Property<string>("Address2")
                        .HasMaxLength(250);

                    b.Property<DateTime?>("BirthDate");

                    b.Property<DateTime?>("CreateDate");

                    b.Property<string>("FirstName")
                        .HasMaxLength(250);

                    b.Property<string>("Image");

                    b.Property<string>("Infomation")
                        .HasMaxLength(250);

                    b.Property<string>("LastName")
                        .HasMaxLength(250);

                    b.Property<string>("MailAddress")
                        .HasMaxLength(150);

                    b.Property<DateTime?>("ModifyDate");

                    b.Property<string>("PhoneNo")
                        .HasMaxLength(20);

                    b.Property<DateTime>("RegisterDate");

                    b.Property<string>("Remark")
                        .HasMaxLength(250);

                    b.Property<int>("Sex");

                    b.HasKey("CustomerId");

                    b.HasIndex("PhoneNo")
                        .IsUnique()
                        .HasFilter("[PhoneNo] IS NOT NULL");

                    b.ToTable("Customer");
                });

            modelBuilder.Entity("Template_Program.Models.Diagnoses", b =>
                {
                    b.Property<int>("DiagnosisId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("CreateDate");

                    b.Property<string>("Description")
                        .HasMaxLength(250);

                    b.Property<DateTime?>("ModifyDate");

                    b.Property<int?>("PetHaveDiagnosisId");

                    b.Property<string>("Remark")
                        .HasMaxLength(250);

                    b.HasKey("DiagnosisId");

                    b.HasIndex("PetHaveDiagnosisId");

                    b.ToTable("Diagnoses");
                });

            modelBuilder.Entity("Template_Program.Models.Medicines", b =>
                {
                    b.Property<int>("MedicineId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("CreateDate");

                    b.Property<string>("Description")
                        .HasMaxLength(250);

                    b.Property<string>("MedicineClass")
                        .HasMaxLength(250);

                    b.Property<DateTime?>("ModifyDate");

                    b.Property<string>("Name")
                        .HasMaxLength(250);

                    b.Property<string>("Remark")
                        .HasMaxLength(250);

                    b.HasKey("MedicineId");

                    b.ToTable("Medicines");
                });

            modelBuilder.Entity("Template_Program.Models.Pet", b =>
                {
                    b.Property<int>("PetId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("BirthDate");

                    b.Property<int?>("BreedId");

                    b.Property<DateTime?>("CreateDate");

                    b.Property<int?>("CustomerId");

                    b.Property<string>("Image");

                    b.Property<DateTime?>("ModifyDate");

                    b.Property<string>("PetName")
                        .HasMaxLength(250);

                    b.Property<DateTime?>("RegisterDate");

                    b.Property<string>("Remark")
                        .HasMaxLength(250);

                    b.Property<int>("Sex");

                    b.Property<bool?>("Sterilization");

                    b.HasKey("PetId");

                    b.HasIndex("BreedId");

                    b.HasIndex("CustomerId");

                    b.ToTable("Pet");
                });

            modelBuilder.Entity("Template_Program.Models.PetHaveDiagnosis", b =>
                {
                    b.Property<int>("PetHaveDiagnosisId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double?>("BreathingRate");

                    b.Property<DateTime?>("CreateDate");

                    b.Property<string>("Description")
                        .HasMaxLength(250);

                    b.Property<DateTime>("DiagnosisDate");

                    b.Property<double?>("HeartRate");

                    b.Property<bool?>("HeartSound");

                    b.Property<bool?>("Hydration");

                    b.Property<bool?>("LungSound");

                    b.Property<DateTime?>("ModifyDate");

                    b.Property<int?>("MucousMembrane");

                    b.Property<int?>("PetId");

                    b.Property<string>("Remark")
                        .HasMaxLength(250);

                    b.Property<int?>("StatusPetHasDiagonsis");

                    b.Property<double?>("Weight");

                    b.HasKey("PetHaveDiagnosisId");

                    b.HasIndex("PetId");

                    b.ToTable("PetHaveDiagnosis");
                });

            modelBuilder.Entity("Template_Program.Models.Treatments", b =>
                {
                    b.Property<int>("TreatmentId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("CreateDate");

                    b.Property<string>("Description")
                        .HasMaxLength(250);

                    b.Property<int?>("MedicineId");

                    b.Property<DateTime?>("ModifyDate");

                    b.Property<int?>("PetHaveDiagnosisId");

                    b.Property<string>("Remark")
                        .HasMaxLength(250);

                    b.Property<double?>("TotalTime");

                    b.Property<string>("TreatmentRegimen")
                        .HasMaxLength(250);

                    b.Property<string>("Uom");

                    b.Property<double?>("Volumes");

                    b.HasKey("TreatmentId");

                    b.HasIndex("MedicineId");

                    b.HasIndex("PetHaveDiagnosisId");

                    b.ToTable("Treatments");
                });

            modelBuilder.Entity("Template_Program.Models.Appointment", b =>
                {
                    b.HasOne("Template_Program.Models.Pet", "Pet")
                        .WithMany()
                        .HasForeignKey("PetId");
                });

            modelBuilder.Entity("Template_Program.Models.Diagnoses", b =>
                {
                    b.HasOne("Template_Program.Models.PetHaveDiagnosis", "PetHaveDiagnosis")
                        .WithMany("Diagnoses")
                        .HasForeignKey("PetHaveDiagnosisId");
                });

            modelBuilder.Entity("Template_Program.Models.Pet", b =>
                {
                    b.HasOne("Template_Program.Models.Breed", "Breed")
                        .WithMany()
                        .HasForeignKey("BreedId");

                    b.HasOne("Template_Program.Models.Customer", "Customer")
                        .WithMany("Pets")
                        .HasForeignKey("CustomerId");
                });

            modelBuilder.Entity("Template_Program.Models.PetHaveDiagnosis", b =>
                {
                    b.HasOne("Template_Program.Models.Pet", "Pet")
                        .WithMany()
                        .HasForeignKey("PetId");
                });

            modelBuilder.Entity("Template_Program.Models.Treatments", b =>
                {
                    b.HasOne("Template_Program.Models.Medicines", "Medicines")
                        .WithMany()
                        .HasForeignKey("MedicineId");

                    b.HasOne("Template_Program.Models.PetHaveDiagnosis", "PetHaveDiagnosis")
                        .WithMany("Treatments")
                        .HasForeignKey("PetHaveDiagnosisId");
                });
#pragma warning restore 612, 618
        }
    }
}