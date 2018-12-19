using System;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

using Template_Program.Services;
using Template_Program.ViewModels;
using Template_Program.Models;
using Template_Program.Helper;
// 3rd Party
using AutoMapper;

namespace Template_Program.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class PetHaveDiagnosisController : GenericController<PetHaveDiagnosis>
    {
        private readonly IRepository<Diagnoses> repositoryDiagnoses;
        private readonly IRepository<Treatments> repositoryTreatments;
        // GET: api/PetHaveDiagnosis
        public PetHaveDiagnosisController(
            IRepository<PetHaveDiagnosis> repo, 
            IRepository<Diagnoses> repoDiagnoese,
            IRepository<Treatments> repoTreatment,
            IMapper mapper)
            : base(repo, mapper) {
            this.repositoryDiagnoses = repoDiagnoese;
            this.repositoryTreatments = repoTreatment;
        }

        // GET: api/PetHaveDiagnosis/5
        [HttpGet("GetKeyNumber")]
        public override async Task<IActionResult> Get(int key)
        {
            var HasData = await this.repository.GetFirstOrDefaultAsync(
                x => x,x => x.PetHaveDiagnosisId == key,
                null, include: x => x.Include(z => z.Pet.Customer).Include(z => z.Pet.Breed));

            var MapItem = this.mapper.Map<PetHaveDiagnosis, PetHaveDiagnosisViewModel>(HasData);

            return new JsonResult(MapItem, this.DefaultJsonSettings);
        }

        // POST: api/PetHaveDiagnosis/GetScroll
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

                var predicate = PredicateBuilder.False<PetHaveDiagnosis>();

                foreach (string temp in filters)
                {
                    string keyword = temp;
                    predicate = predicate.Or(x => x.Description.ToLower().Contains(keyword) ||
                                                  x.Remark.ToLower().Contains(keyword) ||
                                                  x.Pet.PetName.ToLower().Contains(keyword) ||
                                                  x.Pet.Customer.FirstName.ToLower().Contains(keyword) ||
                                                  x.Pet.Customer.LastName.ToLower().Contains(keyword));
                }

                if (Scroll.WhereId.HasValue)
                    predicate = predicate.And(x => x.PetId == Scroll.WhereId);

                // Order by
                Func<IQueryable<PetHaveDiagnosis>, IOrderedQueryable<PetHaveDiagnosis>> order;
                // Order
                switch (Scroll.SortField)
                {
                    case "CustomerName":
                        if (Scroll.SortOrder == -1)
                            order = o => o.OrderByDescending(x => x.Pet.Customer.FirstName);
                        else
                            order = o => o.OrderBy(x => x.Pet.Customer.FirstName);
                        break;
                    case "PetName":
                        if (Scroll.SortOrder == -1)
                            order = o => o.OrderByDescending(x => x.Pet.PetName);
                        else
                            order = o => o.OrderBy(x => x.Pet.PetName);
                        break;
                    case "DiagnosisDate":
                        if (Scroll.SortOrder == -1)
                            order = o => o.OrderByDescending(x => x.DiagnosisDate);
                        else
                            order = o => o.OrderBy(x => x.DiagnosisDate);
                        break;
                    case "Description":
                        if (Scroll.SortOrder == -1)
                            order = o => o.OrderByDescending(x => x.Description);
                        else
                            order = o => o.OrderBy(x => x.Description);
                        break;
                    case "Remark":
                        if (Scroll.SortOrder == -1)
                            order = o => o.OrderByDescending(x => x.Remark);
                        else
                            order = o => o.OrderBy(x => x.Remark);
                        break;
                    default:
                        order = o => o.OrderByDescending(x => x.DiagnosisDate);
                        break;
                }

                var QueryData = await this.repository.GetToListAsync(
                                        selector: selected => selected,  // Selected
                                        predicate: predicate, // Where
                                        orderBy: order, // Order
                                        include: x => x.Include(z => z.Pet.Customer).Include(z => z.Pet.Breed), // Include
                                        skip: Scroll.Skip ?? 0, // Skip
                                        take: Scroll.Take ?? 50); // Take

                // Get TotalRow
                Scroll.TotalRow = await this.repository.GetLengthWithAsync(predicate: predicate);

                var mapDatas = new List<PetHaveDiagnosisViewModel>();
                foreach (var item in QueryData)
                {
                    var MapItem = this.mapper.Map<PetHaveDiagnosis, PetHaveDiagnosisViewModel>(item);
                    mapDatas.Add(MapItem);
                }

                return new JsonResult(new ScrollDataViewModel<PetHaveDiagnosisViewModel>(Scroll, mapDatas), this.DefaultJsonSettings);
            }
            catch (Exception ex)
            {
                message = $"Has error {ex.ToString()}";
            }
            return BadRequest(new { Error = message });
        }

        // POST: api/PetHaveDiagnosis/
        [HttpPost]
        public override async Task<IActionResult> Create([FromBody] PetHaveDiagnosis record)
        {
            var Message = "Data not been found.";
            try
            {
                // Set date for CrateDate Entity
                if (record == null)
                    return BadRequest();
                // +7 Hour
                record = this.helper.AddHourMethod(record);

                if (record.GetType().GetProperty("CreateDate") != null)
                    record.GetType().GetProperty("CreateDate").SetValue(record, DateTime.Now);

                if (record.Diagnoses != null && record.Diagnoses.Any())
                {
                    foreach (var item in record.Diagnoses)
                    {
                        if (item == null)
                            continue;

                        item.CreateDate = DateTime.Now;
                    }
                }

                if (record.Treatments != null && record.Treatments.Any())
                {
                    foreach (var item in record.Treatments)
                    {
                        if (item == null)
                            continue;
                        item.CreateDate = DateTime.Now;
                    }

                    record.StatusPetHasDiagonsis = StatusPetHasDiagonsis.Complate;
                }

                if (await this.repository.AddAsync(record) == null)
                    return BadRequest();
                return new JsonResult(record, this.DefaultJsonSettings);
            }
            catch(Exception ex)
            {
                Message = $"Has error {ex.ToString()}";
            }

            return BadRequest(new { Message });
            
        }

        // PUT: api/PetHaveDiagnosis/
        [HttpPut]
        public override async Task<IActionResult> Update(int key, [FromBody] PetHaveDiagnosis record)
        {
            if (key < 1)
                return BadRequest();
            if (record == null)
                return BadRequest();

            // +7 Hour
            record = this.helper.AddHourMethod(record);

            if (record.Diagnoses != null && record.Diagnoses.Any())
            {
                foreach (var item in record.Diagnoses)
                {
                    if (item.DiagnosisId > 0)
                        item.CreateDate = DateTime.Now;
                    else
                        item.ModifyDate = DateTime.Now;
                }
            }

            if (record.Treatments != null && record.Treatments.Any())
            {
                foreach (var item in record.Treatments)
                {
                    if (item.TreatmentId < 1)
                        item.CreateDate = DateTime.Now;
                    else
                        item.ModifyDate = DateTime.Now;
                }

                if (record.StatusPetHasDiagonsis != StatusPetHasDiagonsis.Complate)
                    record.StatusPetHasDiagonsis = StatusPetHasDiagonsis.Complate;
            }

            // Set date for CrateDate Entity
            if (record.GetType().GetProperty("ModifyDate") != null)
                record.GetType().GetProperty("ModifyDate").SetValue(record, DateTime.Now);
            if (await this.repository.UpdateAsync(record, key) == null)
                return BadRequest();

            if (record != null)
            {
                #region Diagnoses
                // filter
                var dbDiagnoses = await this.repositoryDiagnoses.GetToListAsync(x => x, x => x.PetHaveDiagnosisId == key);
                //Remove LiftingHasCheckLists if edit remove it
                foreach (var dbDiagnose in dbDiagnoses)
                {
                    if (!record.Diagnoses.Any(x => x.DiagnosisId == dbDiagnose.DiagnosisId))
                        await this.repositoryDiagnoses.DeleteAsync(dbDiagnose.DiagnosisId);
                }
                //Update LiftingHasCheckLists or New LiftingHasCheckLists
                foreach (var uDiagnose in record.Diagnoses)
                {
                    if (uDiagnose.DiagnosisId > 0)
                        await this.repositoryDiagnoses.UpdateAsync(uDiagnose, uDiagnose.DiagnosisId);
                    else
                    {
                        uDiagnose.PetHaveDiagnosisId = record.PetHaveDiagnosisId;
                        await this.repositoryDiagnoses.AddAsync(uDiagnose);
                    }
                }
                #endregion

                #region Treatment
                // filter
                var dbTreatments = await this.repositoryTreatments.GetToListAsync(x => x, x => x.PetHaveDiagnosisId == key);
                //Remove LiftingHasCheckLists if edit remove it
                foreach (var dbTreatment in dbTreatments)
                {
                    if (!record.Treatments.Any(x => x.TreatmentId == dbTreatment.TreatmentId))
                        await this.repositoryTreatments.DeleteAsync(dbTreatment.TreatmentId);
                }
                //Update LiftingHasCheckLists or New LiftingHasCheckLists
                foreach (var uTreatment in record.Treatments)
                {
                    if (uTreatment.TreatmentId > 0)
                        await this.repositoryTreatments.UpdateAsync(uTreatment, uTreatment.TreatmentId);
                    else
                    {
                        uTreatment.PetHaveDiagnosisId = record.PetHaveDiagnosisId;
                        await this.repositoryTreatments.AddAsync(uTreatment);
                    }
                }
                #endregion
            }

            return new JsonResult(record, this.DefaultJsonSettings);
        }

        // POST: api/PetHaceDiagosis/HistoryDiagnosis
        [HttpPost("HistoryDiagnosis")]
        public async Task<IActionResult> HistoryDiagnosis([FromBody] HistoryDiagnosisViewModel history)
        {
            var Message = "";
            try
            {
                if (history != null)
                {
                    var predicate = PredicateBuilder.True<PetHaveDiagnosis>();

                    if (history.PetId.HasValue)
                        predicate = predicate.And(x => x.PetId == history.PetId);

                    if (history.CustomerId.HasValue)
                        predicate = predicate.And(x => x.Pet.CustomerId == history.CustomerId);

                    if (history.SDate.HasValue)
                        predicate = predicate.And(x => x.DiagnosisDate.Date >= history.SDate.Value.Date);

                    if (history.EDate.HasValue)
                        predicate = predicate.And(x => x.DiagnosisDate <= history.EDate.Value.Date);
                    // Order by
                    Func<IQueryable<PetHaveDiagnosis>, IOrderedQueryable<PetHaveDiagnosis>> order;
                    // Order
                    switch (history.SortField)
                    {
                        case "PetName":
                            if (history.SortOrder == -1)
                                order = o => o.OrderByDescending(x => x.Pet.PetName);
                            else
                                order = o => o.OrderBy(x => x.Pet.PetName);
                            break;
                        case "CustomerName":
                            if (history.SortOrder == -1)
                                order = o => o.OrderByDescending(x => x.Pet.Customer.FirstName);
                            else
                                order = o => o.OrderBy(x => x.Pet.Customer.FirstName);
                            break;
                        case "DiagnosisDate":
                            if (history.SortOrder == -1)
                                order = o => o.OrderByDescending(x => x.DiagnosisDate);
                            else
                                order = o => o.OrderBy(x => x.DiagnosisDate);
                            break;
                        case "Description":
                            if (history.SortOrder == -1)
                                order = o => o.OrderByDescending(x => x.Description);
                            else
                                order = o => o.OrderBy(x => x.Description);
                            break;
                        case "Remark":
                            if (history.SortOrder == -1)
                                order = o => o.OrderByDescending(x => x.Remark);
                            else
                                order = o => o.OrderBy(x => x.Remark);
                            break;
                        default:
                            order = o => o.OrderBy(x => x.DiagnosisDate);
                            break;
                    }
                    // Total Row
                    var TotalRow = await this.repository.GetLengthWithAsync(predicate: predicate);
                    // Get Data
                    var HasData = await this.repository.GetToListAsync(
                                    selector:x => x,
                                    predicate:predicate,
                                    orderBy: order,
                                    include:x => x.Include(z => z.Pet.Customer).Include(z => z.Pet.Breed),
                                    skip:history.Skip,
                                    take:history.Take);

                    var MapData = new List<PetHaveDiagnosisViewModel>();
                    foreach (var item in HasData)
                        MapData.Add(this.mapper.Map<PetHaveDiagnosis, PetHaveDiagnosisViewModel>(item));

                    return new JsonResult(new
                    {
                        TotalRow,
                        Data = MapData
                    }, this.DefaultJsonSettings);
                }
            }
            catch(Exception ex)
            {
                Message = $"Has error {ex.ToString()}";
            }

            return BadRequest(new { error = Message });
        }
    }
}

