using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
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
           var adquisicion = _context.Adquisiciones.ToList();
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

            return Ok(adquisicion);
        }
    }
}