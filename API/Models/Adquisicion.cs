using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Adquisicion
    {
        public int Id { get; set;}

        [Required]
        public decimal Presupuesto { get; set;}
        [Required]
        public string Unidad { get; set;}
        [Required]
        public string TipoBienServicio { get; set; }
        [Required]
        public int Cantidad { get; set; }
        [Required]
        public decimal ValorUnitario { get; set; }
        public decimal ValorTotal => Cantidad * ValorUnitario;
        [Required]
        public DateTime FechaAdquisicion { get; set; }
        [Required]
        public string Proveedor { get; set; }
        [Required]
        public string Documentacion { get; set; }
       
    }
}