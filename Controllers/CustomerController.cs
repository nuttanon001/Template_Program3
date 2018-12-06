using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Template_Program.Helper;
using Template_Program.Models;
using Template_Program.Services;
using Template_Program.ViewModels;

namespace Template_Program.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class CustomerController : GenericController<Customer>
    {
        private readonly IRepository<Pet> repositoryPet;

        public CustomerController(
            IRepository<Customer> repo,
            IRepository<Pet> repoPet,
          IMapper mapper) : base(repo, mapper) {
            this.repositoryPet = repoPet;
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

                var predicate = PredicateBuilder.False<Customer>();

                foreach (string temp in filters)
                {
                    string keyword = temp;
                    predicate = predicate.Or(x => x.FirstName.ToLower().Contains(keyword) ||
                                                  x.LastName.ToLower().Contains(keyword) ||
                                                  x.PhoneNo.ToLower().Contains(keyword) ||
                                                  x.Remark.ToLower().Contains(keyword) ||
                                                  x.Address.ToLower().Contains(keyword) ||
                                                  x.Address2.ToLower().Contains(keyword));
                }
                // Order by
                Func<IQueryable<Customer>, IOrderedQueryable<Customer>> order;
                // Order
                switch (Scroll.SortField)
                {
                    case "Name":
                        if (Scroll.SortOrder == -1)
                            order = o => o.OrderByDescending(x => x.FirstName).ThenByDescending(e => e.LastName);
                        else
                            order = o => o.OrderBy(x => x.FirstName).ThenBy(e => e.LastName);
                        break;

                    case "PhoneNo":
                        if (Scroll.SortOrder == -1)
                            order = o => o.OrderByDescending(x => x.PhoneNo);
                        else
                            order = o => o.OrderBy(x => x.PhoneNo);
                        break;

                    case "Address":
                        if (Scroll.SortOrder == -1)
                            order = o => o.OrderByDescending(x => x.Address);
                        else
                            order = o => o.OrderBy(x => x.Address);
                        break;

                    default:
                        order = o => o.OrderBy(x => x.FirstName).ThenBy(e => e.LastName);
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

                var mapDatas = new List<CustomerViewModel>();
                foreach (var item in QueryData)
                {
                    var MapItem = this.mapper.Map<Customer, CustomerViewModel>(item);
                    mapDatas.Add(MapItem);
                }

                return new JsonResult(new ScrollDataViewModel<CustomerViewModel>(Scroll, mapDatas), this.DefaultJsonSettings);
            }
            catch (Exception ex)
            {
                message = $"Has error {ex.ToString()}";
            }
            return BadRequest(new { Error = message });
        }

        [HttpPost]
        public override async Task<IActionResult> Create([FromBody] Customer record)
        {
            // Set date for CrateDate Entity
            if (record == null)
                return BadRequest();
            // +7 Hour
            record = this.helper.AddHourMethod(record);

            if (record.GetType().GetProperty("CreateDate") != null)
                record.GetType().GetProperty("CreateDate").SetValue(record, DateTime.Now);

            if (record.Pets != null && record.Pets.Any())
            {
                foreach (var item in record.Pets)
                    item.CreateDate = DateTime.Now;
            }

            if (await this.repository.AddAsync(record) == null)
                return BadRequest();
            return new JsonResult(record, this.DefaultJsonSettings);
        }

        [HttpPut]
        public override async Task<IActionResult> Update(int key, [FromBody] Customer record)
        {
            if (key < 1)
                return BadRequest();
            if (record == null)
                return BadRequest();

            // +7 Hour
            record = this.helper.AddHourMethod(record);

            if (record.Pets != null && record.Pets.Any())
            {
                foreach (var item in record.Pets)
                {
                    if (item.PetId > 0)
                        item.CreateDate = DateTime.Now;
                    else
                        item.ModifyDate = DateTime.Now;
                }
            }

            // Set date for CrateDate Entity
            if (record.GetType().GetProperty("ModifyDate") != null)
                record.GetType().GetProperty("ModifyDate").SetValue(record, DateTime.Now);
            if (await this.repository.UpdateAsync(record, key) == null)
                return BadRequest();

            if (record != null)
            {
                #region Pets
                // filter
                var dbPets = await this.repositoryPet.GetToListAsync(x => x, x => x.CustomerId == key);
                //Remove LiftingHasCheckLists if edit remove it
                foreach (var dbPet in dbPets)
                {
                    if (!record.Pets.Any(x => x.PetId == dbPet.PetId))
                        await this.repositoryPet.DeleteAsync(dbPet.PetId);
                }
                //Update LiftingHasCheckLists or New LiftingHasCheckLists
                foreach (var uPet in record.Pets)
                {
                    if (uPet.PetId > 0)
                        await this.repositoryPet.UpdateAsync(uPet, uPet.PetId);
                    else
                    {
                        uPet.CustomerId = record.CustomerId;
                        await this.repositoryPet.AddAsync(uPet);
                    }
                }
                #endregion
            }

            return new JsonResult(record, this.DefaultJsonSettings);
        }
    }
}