import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import addProduto from "./components/add-produto.component";
import produto from "./components/update-produto.component";
import produtoList  from "./components/list-produto.component"
import deleteProduto from "./components/delete-produto.component"

class App extends Component{
  render(){
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/products" className="navbar-brand">
            Estoque
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/products"} className="nav-link">
                Lista de Produtos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Adicionar Produtos
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/products"]} component={produtoList} />
            <Route exact path="/add" component={addProduto} />
            <Route exact path="/products/:id" component={produto} />
            <Route exact path="/products/delete/:id" component={deleteProduto} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
