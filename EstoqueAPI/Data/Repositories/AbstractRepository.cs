﻿using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;

namespace EstoqueAPI.Data.Repositories
{
    public abstract class AbstractRepository<T>
    {

        private string _connectionString;
        protected string ConnectionString => _connectionString;

        public AbstractRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetValue<string>("DBInfo:ConnectionString");

            EstoqueAPI.Db.Seed.CreateDb(configuration);
        }

        public abstract void Add(T item);
        public abstract void Remove(int id);
        public abstract void Update(T item);
        public abstract T FindByID(int id);
        public abstract IEnumerable<T> FindAll();
        public abstract IEnumerable<T> FindByName(string nome);


    }
}
