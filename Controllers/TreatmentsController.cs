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
using AutoMapper;
using Template_Program.Helper;

namespace Template_Program.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class TreatmentsController : GenericController<Treatments>
    {
        public TreatmentsController(IRepository<Treatments> repo, IMapper mapper)
            : base(repo, mapper) { }

        // GET : api/Treatments/GetByMaster
        [HttpGet("GetByMaster")]
        public async Task<IActionResult> GetByMaster(int key)
        {
            if (key > 0)
            {
                var ListEntities = await this.repository.GetToListAsync(
                    x => x, x => x.PetHaveDiagnosisId == key,
                    null,x => x.Include(z => z.Medicines));
                if (ListEntities.Any())
                {
                    var mapDatas = new List<TreatmentsViewModel>();
                    foreach (var item in ListEntities)
                    {
                        var MapItem = this.mapper.Map<Treatments, TreatmentsViewModel>(item);
                        mapDatas.Add(MapItem);
                    }
                    return new JsonResult(mapDatas, this.DefaultJsonSettings);
                }
            }
            return NoContent();
        }

        // POST: api/Treatments/GetScroll
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

                var predicate = PredicateBuilder.False<Treatments>();

                foreach (string temp in filters)
                {
                    string keyword = temp;
                    predicate = predicate.Or(x => x.TreatmentRegimen.ToLower().Contains(keyword) ||
                                                 x.Medicines.Name.ToLower().Contains(keyword) ||
                                                 x.Description.ToLower().Contains(keyword) ||
                                                 x.Remark.ToLower().Contains(keyword));
                }
                // Order by
                Func<IQueryable<Treatments>, IOrderedQueryable<Treatments>> order;
                // Order
                switch (Scroll.SortField)
                {
                    case "TreatmentRegimen":
                        if (Scroll.SortOrder == -1)
                            order = o => o.OrderByDescending(x => x.TreatmentRegimen);
                        else
                            order = o => o.OrderBy(x => x.TreatmentRegimen);
                        break;
                    case "Description":
                        if (Scroll.SortOrder == -1)
                            order = o => o.OrderByDescending(x => x.Description);
                        else
                            order = o => o.OrderBy(x => x.Description);
                        break;
                    case "Medicines":
                        if (Scroll.SortOrder == -1)
                            order = o => o.OrderByDescending(x => x.Medicines.Name);
                        else
                            order = o => o.OrderBy(x => x.Medicines.Name);
                        break;
                    case "Remark":
                        if (Scroll.SortOrder == -1)
                            order = o => o.OrderByDescending(x => x.Remark);
                        else
                            order = o => o.OrderBy(x => x.Remark);
                        break;
                    default:
                        order = o => o.OrderBy(x => x.Medicines.Name);
                        break;
                }

                var QueryData = await this.repository.GetToListAsync(
                                        selector: selected => selected,  // Selected
                                        predicate: predicate, // Where
                                        orderBy: order, // Order
                                        include: x => x.Include(z => z.Medicines), // Include
                                        skip: Scroll.Skip ?? 0, // Skip
                                        take: Scroll.Take ?? 10); // Take

                // Get TotalRow
                Scroll.TotalRow = await this.repository.GetLengthWithAsync(predicate: predicate);

                var mapDatas = new List<TreatmentsViewModel>();
                foreach (var item in QueryData)
                {
                    var MapItem = this.mapper.Map<Treatments, TreatmentsViewModel>(item);
                    mapDatas.Add(MapItem);
                }

                return new JsonResult(new ScrollDataViewModel<TreatmentsViewModel>(Scroll, mapDatas), this.DefaultJsonSettings);
            }
            catch (Exception ex)
            {
                message = $"Has error {ex.ToString()}";
            }
            return BadRequest(new { Error = message });
        }
    }
}
