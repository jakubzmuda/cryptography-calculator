import React, { Component } from 'react';
import './App.css';

class App extends Component {


  constructor (props, context) {
    super(props, context);
    this.state = {
      a: '',
      b: ''
    }
  }

  render () {
    return (
      <div className={'container'}>
        <div className="app">
          <h1>Extended Euclid algorithm</h1>
          <div className={'inputs'}>
            <label>first integer</label>
            <input className={'input'} onChange={event => this.setState({a: event.target.value})} value={this.state.a}/>
            <label>second integer</label>
            <input className={'input'} onChange={event => this.setState({b: event.target.value})} value={this.state.b}/>
          </div>
          {this.renderTable()}
        </div>
      </div>
    );
  }

  renderTable () {
    return (
      <table>
        <tr>
          <th>i</th>
          <th>ui</th>
          <th>ui`</th>
          <th>vi</th>
          <th>ai</th>
          <th>bi</th>
          <th>q</th>
          <th>r</th>
        </tr>
        <tr>
          <td>Jill</td>
          <td>Smith</td>
          <td>50</td>
        </tr>
      </table>
    )
  }
}

export default App;
