import React, { Component } from "react";
import ProdutoDataService from "../services/produto.service";

export default class Produto extends Component {
  constructor(props) {
    super(props);
    this.getProduto = this.getProduto.bind(this);
    this.deleteProduto = this.deleteProduto.bind(this);  

    this.state = {
      produto: {
        id: null,
        nome: "",
        quantidade: "",
        valorUnitario: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getProduto(this.props.match.params.id);
  }

  getProduto(id) {
    ProdutoDataService.get(id)
      .then(response => {
        this.setState({
          produto: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteProduto() {    
    ProdutoDataService.delete(this.state.produto.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/products')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { produto } = this.state;

    return (
      <div>
        {produto ? (
          <div className="edit-form">
            <h4>Produto</h4>
            <form>
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  value={produto.nome}
                  onChange={this.onChangeNome}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantidade">Quantidade</label>
                <input
                  type="number"
                  className="form-control"
                  id="quantidade"
                  value={produto.quantidade}
                  onChange={this.onChangeQuantidade}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantidade">Valor Unitario</label>
                <input
                  type="number"
                  className="form-control"
                  id="valorUnitario"
                  value={produto.valorUnitario}
                  onChange={this.onChangeValorUnitario}
                  disabled
                />
              </div>

              
            </form>      
            <div>
            <label>Deseja deletar esse produto?</label>
            </div>     
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteProduto}
            >
              Deletar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Produto...</p>
          </div>
        )}
      </div>
    );
  }
}