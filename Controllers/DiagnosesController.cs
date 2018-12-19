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
    public class DiagnosesController : GenericController<Diagnoses>
    {
        public DiagnosesController(IRepository<Diagnoses> repo,
          IMapper mapper) : base(repo, mapper) { }

        // GET : api/Pet/GetByMaster
        [HttpGet("GetByMaster")]
        public async Task<IActionResult> GetByMaster(int key)
        {
            if (key > 0)
            {
                var ListEntities = await this.repository.GetToListAsync(
                    x => x, x => x.PetHaveDiagnosisId == key);
                if (ListEntities.Any())
                {
                    var mapDatas = new List<DiagnosesViewModel>();
                    foreach (var item in ListEntities)
                    {
                        var MapItem = this.mapper.Map<Diagnoses, DiagnosesViewModel>(item);
                        mapDatas.Add(MapItem);
                    }
                    return new JsonResult(mapDatas, this.DefaultJsonSettings);
                }
            }
            return BadRequest(new { Error = "Key not been found." });
        }
        // POST: api/Customer/GetScroll
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

                var predicate = PredicateBuilder.False<Diagnoses>();

                foreach (string temp in filters)
                {
                    string keyword = temp;
                    predicate = predicate.Or(x => x.Description.ToLower().Contains(keyword) ||
                                                  x.Remark.ToLower().Contains(keyword));
                }
                // Order by
                Func<IQueryable<Diagnoses>, IOrderedQueryable<Diagnoses>> order;
                // Order
                switch (Scroll.SortField)
                {
                    case "Remark":
                        if (Scroll.SortOrder == -1)
                            order = o => o.OrderByDescending(x => x.Remark);
                        else
                            order = o => o.OrderBy(x => x.Remark);
                        break;
                    case "Description":
                        if (Scroll.SortOrder == -1)
                            order = o => o.OrderByDescending(x => x.Description);
                        else
                            order = o => o.OrderBy(x => x.Description);
                        break;
                    default:
                        order = o => o.OrderBy(x => x.Description);
                        break;
                }

                var QueryData = await this.repository.GetToListAsync(
                                        selector: selected => selected,  // Selected
                                        predicate: predicate, // Where
                                        orderBy: order, // Order
                                        include: null, // Include
                                        skip: Scroll.Skip ?? 0, // Skip
                                        take: Scroll.Take ?? 50); // Take

                // Get TotalRow
                Scroll.TotalRow = await this.repository.GetLengthWithAsync(predicate: predicate);

                var mapDatas = new List<DiagnosesViewModel>();
                foreach (var item in QueryData)
                {
                    var MapItem = this.mapper.Map<Diagnoses, DiagnosesViewModel>(item);
                    mapDatas.Add(MapItem);
                }

                return new JsonResult(new ScrollDataViewModel<DiagnosesViewModel>(Scroll, mapDatas), this.DefaultJsonSettings);
            }
            catch (Exception ex)
            {
                message = $"Has error {ex.ToString()}";
            }
            return BadRequest(new { Error = message });
        }
    }
}
