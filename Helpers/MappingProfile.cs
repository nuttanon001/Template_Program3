using AutoMapper;
using System;
using Template_Program.Models;
using Template_Program.ViewModels;

namespace Template_Program.Helpers
{
    public class MappingProfile : Profile
    {
        public Func<DateTime, string> AgeFunc = bDate =>
        ((DateTime.Today - bDate.Date).TotalDays / 365).ToString("00");

        public MappingProfile()
        {
            #region Breed_Map

            CreateMap<Breed, BreedViewModel>();

            #endregion Breed_Map

            #region Customer

            CreateMap<Customer, CustomerViewModel>()
                .ForMember(x => x.FullName, o => o.MapFrom(s => $"คุณ{s.FirstName} {s.LastName}"))
                .ForMember(x => x.Age, o => o.MapFrom(s => s.BirthDate != null ? AgeFunc(s.BirthDate.Value) : "-"))
                .ForMember(x => x.Pets, o => o.Ignore());

            #endregion Customer

            #region Diagnoses

            CreateMap<Diagnoses, DiagnosesViewModel>()
                .ForMember(x => x.PetHaveDiagnosis, o => o.Ignore());

            #endregion Diagnoses

            #region Medicines

            CreateMap<Medicines, MedicinesViewModel>();

            #endregion Medicines

            #region Pet

            CreateMap<Pet, PetViewModel>()
                .ForMember(x => x.Age, o => o.MapFrom(s => s.BirthDate != null ? AgeFunc(s.BirthDate.Value) : "-"))
                .ForMember(x => x.BreedName, o => o.MapFrom(s => s.Breed != null ? s.Breed.Name : ""))
                .ForMember(x => x.CustomerName, o => o.MapFrom(s => s.Customer != null ? $"คุณ{s.Customer.FirstName} {s.Customer.LastName}" : ""))
                .ForMember(x => x.Breed, o => o.Ignore())
                .ForMember(x => x.Customer, o => o.Ignore());

            #endregion Pet

            #region PetHaveDiagonsis

            CreateMap<PetHaveDiagnosis, PetHaveDiagnosisViewModel>()
                .ForMember(x => x.BreedName, o => o.MapFrom(s => s.Pet != null ? s.Pet.Breed.Name : "-"))
                .ForMember(x => x.PetName, o => o.MapFrom(s => s.Pet != null ? s.Pet.PetName : "-"))
                .ForMember(x => x.CustomerName, o => o.MapFrom(s => s.Pet != null ? s.Pet.Customer.FirstName : "-"))
                .ForMember(x => x.Pet, o => o.Ignore())
                .ForMember(x => x.Diagnoses, o => o.Ignore());

            #endregion PetHaveDiagonsis

            #region Treatments

            CreateMap<Treatments, TreatmentsViewModel>()
                .ForMember(x => x.PetHaveDiagnosis, o => o.Ignore())
                .ForMember(x => x.MedicineName,o => o.MapFrom(s => s.Medicines.Name))
                .ForMember(x => x.Medicines, o => o.Ignore());

            #endregion Treatments

            #region Appointment

            CreateMap<Appointment, AppointmentViewModel>()
                .ForMember(x => x.PetName, o => o.MapFrom(s => s.Pet.PetName))
                .ForMember(x => x.CustomerName, o => o.MapFrom(s => s.Pet.Customer.FirstName))
                .ForMember(x => x.Communicate, o => 
                    o.MapFrom(s => $"Tel:{s.Pet.Customer.PhoneNo} | อื่นๆ:{s.Pet.Customer.MailAddress}"))
                .ForMember(x => x.Pet, o => o.Ignore());

            #endregion
        }
    }
}