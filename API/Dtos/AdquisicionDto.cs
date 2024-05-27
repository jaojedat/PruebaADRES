using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class AdquisicionDto
    {
        public int Id { get; set; }
        public decimal Presupuesto { get; set;}
        public string Unidad { get; set;}
        public string TipoBienServicio { get; set; }
        public int Cantidad { get; set; }
        public decimal ValorUnitario { get; set; }
        public DateTime FechaAdquisicion { get; set; }
        public string Proveedor { get; set; }
        public string Documentacion { get; set; }
    }
}