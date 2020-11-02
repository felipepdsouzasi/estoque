using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using Dapper;
using System.Data;
using Microsoft.Data.Sqlite;
using EstoqueAPI.Models;

namespace EstoqueAPI.Data.Repositories
{
    public class ProductRepository : AbstractRepository<Product>
    {

        public ProductRepository(IConfiguration configuration) : base(configuration) { }

        public override void Add(Product item)
        {
            using (IDbConnection dbConnection = new SqliteConnection(ConnectionString))
            {
                string sQuery = "INSERT INTO Product (nome, quantidade, valorUnitario)"
                                + " VALUES(@nome, @quantidade, @valorUnitario)";
                dbConnection.Open();
                dbConnection.Execute(sQuery, item);
            }
        }
        public override void Remove(int id)
        {
            using (IDbConnection dbConnection = new SqliteConnection(ConnectionString))
            {
                string sQuery = "DELETE FROM Product"
                            + " WHERE Id = @id";
                dbConnection.Open();
                dbConnection.Execute(sQuery, new { id = id });
            }
        }
        public override void Update(Product item)
        {
            using (IDbConnection dbConnection = new SqliteConnection(ConnectionString))
            {
                string sQuery = "UPDATE Product SET nome = @nome,"
                            + " quantidade = @quantidade, valorUnitario= @valorUnitario"
                            + " WHERE id = @id";
                dbConnection.Open();
                dbConnection.Query(sQuery, item);
            }
        }
        public override Product FindByID(int id)
        {
            using (IDbConnection dbConnection = new SqliteConnection(ConnectionString))
            {
                string sQuery = "SELECT  id, nome, quantidade, CAST(valorUnitario AS REAL) AS valorUnitario FROM Product"
                            + " WHERE id = @id";
                dbConnection.Open();
                return dbConnection.Query<Product>(sQuery, new { id = id }).FirstOrDefault();
            }
        }
        public override IEnumerable<Product> FindAll()
        {
            using (IDbConnection dbConnection = new SqliteConnection(ConnectionString))
            {
                dbConnection.Open();
                return dbConnection.Query<Product>("SELECT id, nome, quantidade, CAST(valorUnitario AS REAL) AS valorUnitario FROM Product");
            }
        }

        public override IEnumerable<Product> FindByName(string nome)
        {
            using (IDbConnection dbConnection = new SqliteConnection(ConnectionString))
            {
                string sQuery = "SELECT id, nome, quantidade, CAST(valorUnitario AS REAL) AS valorUnitario FROM Product"
                            + " WHERE nome = @nome";
                dbConnection.Open();
                return dbConnection.Query<Product>(sQuery, new { nome = nome });
            }
        }

    }
}
