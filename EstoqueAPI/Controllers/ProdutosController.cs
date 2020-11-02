using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EstoqueAPI.Data;
using EstoqueAPI.Models;
using EstoqueAPI.Data.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Cors;

namespace EstoqueAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutosController : ControllerBase
    {
        private readonly ProductRepository productRepository;

        public ProdutosController(IConfiguration configuration)
        {
            productRepository = new ProductRepository(configuration);
        }

        // GET: api/Produtos
        [HttpGet]
        [EnableCors]
        public ActionResult<IEnumerable<Product>> GetProduto([FromQuery(Name = "nome")] string nome)
        {
            if (nome != null && nome != "") {
               return productRepository.FindByName(nome).ToList();
            }
            else
            {
                return productRepository.FindAll().ToList();
            }            
        }

        // GET: api/Produtos/5
        [HttpGet("{id}")]
        public ActionResult<Product> GetProduto(int id)
        {
            var produto = productRepository.FindByID(id);

            if (produto == null)
            {
                return NotFound();
            }

            return produto;
        }

        // PUT: api/Produtos/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public ActionResult<Product> PutProduto(int id, Product produto)
        {
            if (id != produto.id)
            {
                return BadRequest();
            }

            produto.id = id;
            productRepository.Update(produto);

            return produto;
        }

        // POST: api/Produtos
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public ActionResult<Product> PostProduto(Product produto)
        {
            productRepository.Add(produto);

            return produto;
        }

        // DELETE: api/Produtos/5
        [HttpDelete("{id}")]
        public ActionResult<Product> DeleteProduto(int id)
        {
            var produto = productRepository.FindByID(id);
            if (produto == null)
            {
                return NotFound();
            }
            productRepository.Remove(id);

            return NoContent();
        }
    }
}
