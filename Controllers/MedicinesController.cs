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

namespace Template_Program.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class MedicinesController : GenericController<Medicines>
    {
        public MedicinesController(IRepository<Medicines> repo,IMapper mapper) 
            : base(repo, mapper) { }

        // POST: api/Medicines/GetScroll
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

                var predicate = PredicateBuilder.False<Medicines>();

                foreach (string temp in filters)
                {
                    string keyword = temp;
                    predicate = predicate.Or(x => x.Name.ToLower().Contains(keyword) ||
                                                 x.Description.ToLower().Contains(keyword) ||
                                                 x.Remark.ToLower().Contains(keyword));
                }
                // Order by
                Func<IQueryable<Medicines>, IOrderedQueryable<Medicines>> order;
                // Order
                switch (Scroll.SortField)
                {
                    case "Name":
                        if (Scroll.SortOrder == -1)
                            order = o => o.OrderByDescending(x => x.Name);
                        else
                            order = o => o.OrderBy(x => x.Name);
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
                        order = o => o.OrderBy(x => x.Name);
                        break;
                }

                var QueryData = await this.repository.GetToListAsync(
                                        selector: selected => selected,  // Selected
                                        predicate: predicate, // Where
                                        orderBy: order, // Order
                                        include: null, // Include
                                        skip: Scroll.Skip ?? 0, // Skip
                                        take: Scroll.Take ?? 10); // Take

                // Get TotalRow
                Scroll.TotalRow = await this.repository.GetLengthWithAsync(predicate: predicate);

                var mapDatas = new List<MedicinesViewModel>();
                foreach (var item in QueryData)
                {
                    var MapItem = this.mapper.Map<Medicines, MedicinesViewModel>(item);
                    mapDatas.Add(MapItem);
                }

                return new JsonResult(new ScrollDataViewModel<MedicinesViewModel>(Scroll, mapDatas), this.DefaultJsonSettings);
            }
            catch (Exception ex)
            {
                message = $"Has error {ex.ToString()}";
            }
            return BadRequest(new { Error = message });
        }
    }
}
