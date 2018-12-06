using System;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

using Template_Program.Models;
using Template_Program.Services;
using Template_Program.ViewModels;

using AutoMapper;
using Template_Program.Helper;
using System.Globalization;
using System.Dynamic;

namespace Template_Program.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : GenericController<Appointment>
    {
        private readonly IRepository<Pet> repositoryPet;

        // GET: api/Appointment
        public AppointmentController(
            IRepository<Appointment> repo,
            IRepository<Pet> repoPet,
            IMapper mapper):base(repo,mapper)
        {
            this.repositoryPet = repoPet;
        }

        // GET: api/Appointment/GetKeyNumber/5
        [HttpGet("GetKeyNumber")]
        public override async Task<IActionResult> Get(int key)
        {
            var HasData = await this.repository.GetFirstOrDefaultAsync(
                x => x, x => x.AppointmentId == key,
                null, x => x.Include(z => z.Pet.Customer));

            if (HasData != null)
            {
                var MapItem = this.mapper.Map<Appointment, AppointmentViewModel>(HasData);
                return new JsonResult(MapItem, this.DefaultJsonSettings);
            }
            else
                return NoContent();
        }

        // POST: api/Appointment/GetScroll
        [HttpPost("GetScroll")]
        public async Task<IActionResult> GetScroll([FromBody] ScrollViewModel Scroll)
        {
            var message = "Data not been found.";

            try
            {
                if (Scroll == null)
                    return BadRequest();
                // Filter
                var filters = string.IsNullOrEmpty(Scroll.Filter) ? new string[] { "" }
                                    : Scroll.Filter.Split(null);

                var predicate = PredicateBuilder.False<Appointment>();

                foreach (string temp in filters)
                {
                    string keyword = temp;
                    predicate = predicate.Or(x => x.Remark.ToLower().Contains(keyword) ||
                                                  x.Description.ToLower().Contains(keyword) ||
                                                  x.Pet.Customer.PhoneNo.ToLower().Contains(keyword) ||
                                                  x.Pet.Customer.MailAddress.ToLower().Contains(keyword) ||
                                                  x.Pet.PetName.ToLower().Contains(keyword) ||
                                                  x.Pet.Customer.FirstName.ToLower().Contains(keyword));
                }

                if (Scroll.WhereId.HasValue)
                    predicate = predicate.And(x => x.PetId == Scroll.WhereId);

                // Order by
                Func<IQueryable<Appointment>, IOrderedQueryable<Appointment>> order;
                // Order
                switch (Scroll.SortField)
                {
                    case "PetName":
                        if (Scroll.SortOrder == -1)
                            order = o => o.OrderByDescending(x => x.Pet.PetName);
                        else
                            order = o => o.OrderBy(x => x.Pet.PetName);
                        break;
                    case "CustomerName":
                        if (Scroll.SortOrder == -1)
                            order = o => o.OrderByDescending(x => x.Pet.Customer.FirstName);
                        else
                            order = o => o.OrderBy(x => x.Pet.Customer.FirstName);
                        break;
                    case "Communicate":
                        if (Scroll.SortOrder == -1)
                            order = o => o.OrderByDescending(x => x.Pet.Customer.PhoneNo);
                        else
                            order = o => o.OrderBy(x => x.Pet.Customer.PhoneNo);
                        break;
                    case "AppointmentDate":
                        if (Scroll.SortOrder == -1)
                            order = o => o.OrderByDescending(x => x.AppointmentDate);
                        else
                            order = o => o.OrderBy(x => x.AppointmentDate);
                        break;
                    case "Description":
                        if (Scroll.SortOrder == -1)
                            order = o => o.OrderByDescending(x => x.Description);
                        else
                            order = o => o.OrderBy(x => x.Description);
                        break;
                    default:
                        order = o => o.OrderBy(x => x.AppointmentDate);
                        break;
                }

                var QueryData = await this.repository.GetToListAsync(
                                        selector: selected => selected,  // Selected
                                        predicate: predicate, // Where
                                        orderBy: order, // Order
                                        include: x => x.Include(z => z.Pet.Customer), // Include
                                        skip: Scroll.Skip ?? 0, // Skip
                                        take: Scroll.Take ?? 10); // Take

                // Get TotalRow
                Scroll.TotalRow = await this.repository.GetLengthWithAsync(predicate: predicate);

                var mapDatas = new List<AppointmentViewModel>();
                foreach (var item in QueryData)
                {
                    var MapItem = this.mapper.Map<Appointment, AppointmentViewModel>(item);
                    mapDatas.Add(MapItem);
                }

                return new JsonResult(new ScrollDataViewModel<AppointmentViewModel>(Scroll, mapDatas), this.DefaultJsonSettings);
            }
            catch (Exception ex)
            {
                message = $"Has error {ex.ToString()}";
            }
            return BadRequest(new { Error = message });
        }

        [HttpPost]
        public override async Task<IActionResult> Create([FromBody] Appointment record)
        {
            // Set date for CrateDate Entity
            if (record == null)
                return BadRequest();
            // +7 Hour
            record = this.helper.AddHourMethod(record);

            if (!string.IsNullOrEmpty(record.AppointmentTime) && record.AppointmentDate != null)
            {
                if (DateTime.TryParseExact(record.AppointmentTime, "HH:mm", CultureInfo.InvariantCulture,
                                              DateTimeStyles.None, out DateTime dt))
                    record.AppointmentDate = new DateTime(record.AppointmentDate.Year, record.AppointmentDate.Month, record.AppointmentDate.Day,
                                                    dt.Hour, dt.Minute, 0);
            }

            if (record.GetType().GetProperty("CreateDate") != null)
                record.GetType().GetProperty("CreateDate").SetValue(record, DateTime.Now);
            if (await this.repository.AddAsync(record) == null)
                return BadRequest();
            return new JsonResult(record, this.DefaultJsonSettings);
        }

        [HttpPut]
        public override async Task<IActionResult> Update(int key, [FromBody] Appointment record)
        {
            if (key < 1)
                return BadRequest();
            if (record == null)
                return BadRequest();

            // +7 Hour
            record = this.helper.AddHourMethod(record);
            if (!string.IsNullOrEmpty(record.AppointmentTime) && record.AppointmentDate != null)
            {
                if (DateTime.TryParseExact(record.AppointmentTime, "HH:mm", CultureInfo.InvariantCulture,
                                              DateTimeStyles.None, out DateTime dt))
                    record.AppointmentDate = new DateTime(record.AppointmentDate.Year, record.AppointmentDate.Month, record.AppointmentDate.Day,
                                                    dt.Hour, dt.Minute, 0);
            }
            // Set date for CrateDate Entity
            if (record.GetType().GetProperty("ModifyDate") != null)
                record.GetType().GetProperty("ModifyDate").SetValue(record, DateTime.Now);
            if (await this.repository.UpdateAsync(record, key) == null)
                return BadRequest();
            return new JsonResult(record, this.DefaultJsonSettings);
        }

        // POST: api/Appointment/Schedule
        [HttpPost("GetSchedule")]
        public async Task<IActionResult> GetSchedule([FromBody] OptionScheduleViewModel Schedule)
        {
            var Message = "Data not been found.";

            try
            {
                if (Schedule != null)
                {
                    int TotalRow;
                    var predicate = PredicateBuilder.False<Appointment>();
                    // Filter
                    var filters = string.IsNullOrEmpty(Schedule.Filter) ? new string[] { "" }
                                        : Schedule.Filter.ToLower().Split(null);
                    foreach (var keyword in filters)
                    {
                        string temp = keyword;
                        predicate = predicate.Or(x => x.Description.ToLower().Contains(temp) ||
                                                    x.Remark.ToLower().Contains(temp) ||
                                                    x.Pet.PetName.ToLower().Contains(temp) ||
                                                    x.Pet.Customer.FirstName.ToLower().Contains(temp) ||
                                                    x.Pet.Customer.PhoneNo.ToLower().Contains(temp) ||
                                                    x.Pet.Customer.MailAddress.ToLower().Contains(temp));
                    }

                    if (Schedule.Status.HasValue)
                        predicate = predicate.And(x => x.AppointmentStatus == Schedule.Status);
                    else 
                        predicate = predicate.And(x => x.AppointmentStatus == AppointmentStatus.Wait);

                    if (Schedule.SDate.HasValue)
                        predicate = predicate.And(x => x.AppointmentDate.Date >= Schedule.SDate.Value.Date);

                    if (Schedule.EDate.HasValue)
                        predicate = predicate.And(x => x.AppointmentDate.Date <= Schedule.EDate.Value.Date);

                    TotalRow = await this.repository.GetLengthWithAsync(predicate);

                    var HasData = await this.repository.GetToListAsync(
                        selector: x => x,
                        predicate: predicate,
                        include: x => x.Include(z => z.Pet.Customer),
                        skip: null,
                        take: null,
                        orderBy: x => x.OrderByDescending(z => z.AppointmentDate));

                    if (HasData.Any())
                    {
                        var schedule = new List<ScheduleViewModel>();

                        foreach (var item in HasData)
                        {
                            schedule.Add(new ScheduleViewModel {
                                title = $"คุณ{item.Pet.Customer.FirstName} ({item.Pet.PetName}) | {item.Description}",
                                start = item.AppointmentDate,
                                id = item.AppointmentId
                            });
                        }

                        return new JsonResult(schedule, this.DefaultJsonSettings);
                    }
                    else
                        return NoContent();
                }
            }
            catch (Exception ex)
            {
                Message = $"Has error {ex.ToString()}";
            }

            return BadRequest(new { error = Message });
        }
    }
}
