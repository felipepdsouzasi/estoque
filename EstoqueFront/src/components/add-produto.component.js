import React, { Component } from "react";
import ProdutoDataService from "../services/produto.service";

export default class AddProduto extends Component {
  constructor(props) {
    super(props);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeQuantidade = this.onChangeQuantidade.bind(this);
    this.onChangeValorUnitario = this.onChangeValorUnitario.bind(this);
    this.saveProduto = this.saveProduto.bind(this);
    this.newProduto = this.newProduto.bind(this);

    this.state = {
      id: null,
      nome: "",
      quantidade: 0, 
      valorUnitario: 0.0
    };
  }

  onChangeNome(e) {
    this.setState({
      nome: e.target.value
    });
  }

  onChangeQuantidade(e) {
    this.setState({
      quantidade: Number(e.target.value)
    });
  }

  onChangeValorUnitario(e) {
    this.setState({
      valorUnitario: Number(e.target.value).toFixed(1)
    });
  }

  saveProduto() {
    var data = {
      nome: this.state.nome,
      quantidade: Number(this.state.quantidade),
      valorUnitario: Number(this.state.valorUnitario)
    };

    ProdutoDataService.create(data)
      .then(response => {
        this.setState({
          nome: response.data.nome,
          quantidade: response.data.quantidade,
          valorUnitario: response.data.valorUnitario,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newProduto() {
    this.setState({
      nome: "",
      quantidade: 0,
      valorUnitario: 0.0,

      submitted: false
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newProduto}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  required
                  value={this.state.nome}
                  onChange={this.onChangeNome}
                  name="nome"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="quantidade">Quantidade</label>
                <input
                  type="number"
                  className="form-control"
                  id="quantidade"
                  required
                  value={this.state.quantidade}
                  onChange={this.onChangeQuantidade}
                  name="quantidade"
                />
              </div>

              <div className="form-group">
                <label htmlFor="valorUnitario">ValorUnitatio</label>
                <input
                  type="number"
                  className="form-control"
                  id="valorUnitario"
                  required
                  value={this.state.valorUnitario}
                  onChange={this.onChangeValorUnitario}
                  name="valorUnitario"
                />
              </div>
  
              <button onClick={this.saveProduto} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
    }
  }
