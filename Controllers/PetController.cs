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
    public class PetController : GenericController<Pet>
    {
        // GET: api/Pet
        public PetController(IRepository<Pet> repo, IMapper mapper)
           : base(repo, mapper) { }

        // GET: api/Pet/GetKeyNumber/5
        [HttpGet("GetKeyNumber")]
        public override async Task<IActionResult> Get(int key)
        {
            var HasData = await this.repository.GetFirstOrDefaultAsync(
                x => x,x => x.PetId == key,
                null,x => x.Include(z => z.Breed).Include(z => z.Customer));

            if (HasData != null)
            {
                var MapItem = this.mapper.Map<Pet, PetViewModel>(HasData);
                return new JsonResult(MapItem, this.DefaultJsonSettings);
            }
            else
                return NoContent();
        }

        // GET : api/Pet/GetByMaster
        [HttpGet("GetByMaster")]
        public async Task<IActionResult> GetByMaster(int key)
        {
            if (key > 0)
            {
                var ListEntities = await this.repository.GetToListAsync(
                    x => x,x => x.CustomerId == key,
                    null,x => x.Include(z => z.Breed));
                if (ListEntities.Any())
                {
                    var mapDatas = new List<PetViewModel>();
                    foreach (var item in ListEntities)
                    {
                        var MapItem = this.mapper.Map<Pet, PetViewModel>(item);
                        mapDatas.Add(MapItem);
                    }
                    return new JsonResult(mapDatas, this.DefaultJsonSettings);
                }
            }
            return BadRequest(new { Error = "Key not been found." });
        }

        // POST: api/Pet/GetScroll
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

                var predicate = PredicateBuilder.False<Pet>();

                foreach (string temp in filters)
                {
                    string keyword = temp;
                    predicate = predicate.Or(x => x.Breed.Name.ToLower().Contains(keyword) ||
                                                  x.PetName.ToLower().Contains(keyword) ||
                                                  x.Remark.ToLower().Contains(keyword) ||
                                                  x.Customer.FirstName.ToLower().Contains(keyword));
                }
                // Order by
                Func<IQueryable<Pet>, IOrderedQueryable<Pet>> order;
                // Order
                switch (Scroll.SortField)
                {
                    case "PetName":
                        if (Scroll.SortOrder == -1)
                            order = o => o.OrderByDescending(x => x.PetName);
                        else
                            order = o => o.OrderBy(x => x.PetName);
                        break;
                    case "CustomerName":
                        if (Scroll.SortOrder == -1)
                            order = o => o.OrderByDescending(x => x.Customer.FirstName);
                        else
                            order = o => o.OrderBy(x => x.Customer.FirstName);
                        break;
                    case "Breed":
                        if (Scroll.SortOrder == -1)
                            order = o => o.OrderByDescending(x => x.Breed.Name);
                        else
                            order = o => o.OrderBy(x => x.Breed.Name);
                        break;
                    case "Remark":
                        if (Scroll.SortOrder == -1)
                            order = o => o.OrderByDescending(x => x.Remark);
                        else
                            order = o => o.OrderBy(x => x.Remark);
                        break;
                    default:
                        order = o => o.OrderBy(x => x.PetName);
                        break;
                }

                var QueryData = await this.repository.GetToListAsync(
                                        selector: selected => selected,  // Selected
                                        predicate: predicate, // Where
                                        orderBy: order, // Order
                                        include: x => x.Include(z => z.Customer).Include(z => z.Breed), // Include
                                        skip: Scroll.Skip ?? 0, // Skip
                                        take: Scroll.Take ?? 50); // Take

                // Get TotalRow
                Scroll.TotalRow = await this.repository.GetLengthWithAsync(predicate: predicate);

                var mapDatas = new List<PetViewModel>();
                foreach (var item in QueryData)
                {
                    var MapItem = this.mapper.Map<Pet, PetViewModel>(item);
                    mapDatas.Add(MapItem);
                }

                return new JsonResult(new ScrollDataViewModel<PetViewModel>(Scroll, mapDatas), this.DefaultJsonSettings);
            }
            catch (Exception ex)
            {
                message = $"Has error {ex.ToString()}";
            }
            return BadRequest(new { Error = message });
        }

    }
}
