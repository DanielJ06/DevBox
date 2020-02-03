import React, { Component } from 'react';
import api from '../../services/api'

import './styles.css';

export default class Main extends Component {
  state = {
    newBox: '',
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const res = await api.post('boxes', {
      title: this.state.newBox
    });

    this.props.history.push(`/box/${res.data._id}`)
  }

  handleInputChange = (e) => {
    this.setState({ newBox: e.target.value })
  }
  
  render() {
    return (
        <div id="main-container">
            <h3><a href="/box">Suas boxes</a></h3>
            <form onSubmit={this.handleSubmit}>
                <input 
                  placeholder="Criar um diretório" 
                  value={this.state.newBox} 
                  onChange={this.handleInputChange}
                />
                <button type="submit">Criar</button>
            </form>
        </div>
    )
  }
}
