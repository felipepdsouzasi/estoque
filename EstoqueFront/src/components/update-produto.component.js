import React, { Component } from "react";
import ProdutoDataService from "../services/produto.service";

export default class Produto extends Component {
  constructor(props) {
    super(props);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeQuantidade = this.onChangeQuantidade.bind(this);
    this.onChangeValorUnitario = this.onChangeValorUnitario.bind(this);
    this.getProduto = this.getProduto.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateProduto = this.updateProduto.bind(this);
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

  onChangeNome(e) {
    const nome = e.target.value;

    this.setState(function(prevState) {
      return {
        produto: {
          ...prevState.produto,
          nome: nome
        }
      };
    });
  }


  onChangeQuantidade(e) {
    const quantidade = Number(e.target.value);
    
    this.setState(prevState => ({
      produto: {
        ...prevState.produto,
        quantidade: quantidade
      }
    }));
  }

  onChangeValorUnitario(e) {
    const valorUnitario = Number(e.target.value);
    
    this.setState(prevState => ({
      produto: {
        ...prevState.produto,
        valorUnitario: valorUnitario
      }
    }));
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

  updatePublished(status) {
    var data = {
      id: this.state.produto.id,
      nome: this.state.produto.nome,
      quantidade: this.state.produto.quantidade,
      published: status
    };

    ProdutoDataService.update(this.state.produto.id, data)
      .then(response => {
        this.setState(prevState => ({
          produto: {
            ...prevState.produto,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateProduto() {
    ProdutoDataService.update(
      this.state.produto.id,
      this.state.produto
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "O Produto foi alterado com sucesso!"
        });
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
                />
              </div>

              
            </form>           

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteProduto}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateProduto}
            >
              Update
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