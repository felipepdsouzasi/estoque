using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EstoqueAPI.Models
{
    public class Product
    {
        [Key]
        public int id { get; set; }

        public string nome { get; set; }

        public int quantidade { get; set; }

        public decimal valorUnitario { get; set; }

    }
}
