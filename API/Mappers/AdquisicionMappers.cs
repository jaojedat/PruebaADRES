using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Models;

namespace API.Mappers
{
    public static class AdquisicionMappers
    {
        public static AdquisicionDto ToAdquisicionDto(this Adquisicion AdquisicionModel)
        {
            return new AdquisicionDto 
            {
                Id = AdquisicionModel.Id,
                Presupuesto = AdquisicionModel.Presupuesto,
                Unidad = AdquisicionModel.Unidad,
                TipoBienServicio = AdquisicionModel.TipoBienServicio,
                Cantidad = AdquisicionModel.Cantidad,
                ValorUnitario = AdquisicionModel.ValorUnitario,
                FechaAdquisicion = AdquisicionModel.FechaAdquisicion,
                Proveedor = AdquisicionModel.Proveedor,
                Documentacion = AdquisicionModel.Documentacion
            };

        }

        public static Adquisicion ToAdquisicionCreateDto(this CreateAdquisicionDto AdquisicionDto)
        {
            return new Adquisicion
            {
                Presupuesto = AdquisicionDto.Presupuesto,
                Unidad = AdquisicionDto.Unidad,
                TipoBienServicio = AdquisicionDto.TipoBienServicio,
                Cantidad = AdquisicionDto.Cantidad,
                ValorUnitario = AdquisicionDto.ValorUnitario,
                FechaAdquisicion = AdquisicionDto.FechaAdquisicion,
                Proveedor = AdquisicionDto.Proveedor,
                Documentacion = AdquisicionDto.Documentacion
            };
        }
    }
}