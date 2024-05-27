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

        [HttpPut]
        [Route("{id}")]
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateAdquisicionDto updateDto)
        {
            var adquisicionModel = _context.Adquisiciones.FirstOrDefault(x => x.Id == id);

            if(adquisicionModel == null)
            {
                return NotFound();
            }

            adquisicionModel.Presupuesto = updateDto.Presupuesto;
            adquisicionModel.Unidad = updateDto.Unidad;
            adquisicionModel.TipoBienServicio = updateDto.TipoBienServicio;
            adquisicionModel.Cantidad = updateDto.Cantidad;
            adquisicionModel.ValorUnitario = updateDto.ValorUnitario;
            adquisicionModel.FechaAdquisicion = updateDto.FechaAdquisicion;
            adquisicionModel.Proveedor = updateDto.Proveedor;
            adquisicionModel.Documentacion = updateDto.Documentacion;

            _context.SaveChanges();

            return Ok(adquisicionModel.ToAdquisicionDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete([FromBody] int id)
        {
            var adquisicionModel = _context.Adquisiciones.FirstOrDefault(x => x.Id == id);

            if(adquisicionModel == null)
            {
                return NotFound();
            }

            _context.Adquisiciones.Remove(adquisicionModel);

            _context.SaveChanges();

            return NoContent();
        }
    }
}