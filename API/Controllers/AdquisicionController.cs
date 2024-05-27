using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dtos;
using API.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/adquisicion")]
    [ApiController]
    public class AdquisicionController : ControllerBase
    {
        private readonly AdquisicionDbContext _context;
        public AdquisicionController(AdquisicionDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
           var adquisicion = _context.Adquisiciones.ToList()
                .Select(s => s.ToAdquisicionDto());
                
           return Ok(adquisicion); 
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var adquisicion = _context.Adquisiciones.Find(id);

            if (adquisicion == null)
            {
                return NotFound();
            }

            return Ok(adquisicion.ToAdquisicionDto());
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateAdquisicionDto AdquisicionDto)
        {
            var adquisicionModel = AdquisicionDto.ToAdquisicionCreateDto();
            _context.Adquisiciones.Add(adquisicionModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = adquisicionModel.Id }, adquisicionModel.ToAdquisicionDto());
        }
    }
}