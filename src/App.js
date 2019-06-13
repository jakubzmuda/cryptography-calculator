import React, { Component } from 'react';
import './App.css';

class App extends Component {


  constructor (props, context) {
    super(props, context);
    this.state = {
      a: '3',
      b: '2'
    }
  }

  render () {
    return (
      <div className={'container'}>
        <div className="app">
          <h1>Extended Euclid algorithm</h1>
          <div className={'inputs'}>
            <label>first integer</label>
            <input className={'input'} onChange={event => this.setState({ a: event.target.value })} value={this.state.a} />
            <label>second integer</label>
            <input className={'input'} onChange={event => this.setState({ b: event.target.value })} value={this.state.b} />
          </div>
          {this.renderTable()}
        </div>
      </div>
    );
  }

  renderTable () {
    const rows = this.calculateRows();

    if (!this.allLegit()) {
      return <label className={'validation-error'}>bad arguments</label>
    }

    return (
      <table>
        <thead>
        <tr>
          <th>i</th>
          <th>ui</th>
          <th>ui`</th>
          <th>vi</th>
          <th>vi`</th>
          <th>ai</th>
          <th>bi</th>
          <th>q</th>
          <th>r</th>
        </tr>
        </thead>
        <tbody>
        {rows.map(row => this.renderRow(row))}
        </tbody>
      </table>
    )
  }

  renderRow (row) {
    return (
      <tr key={row.i}>
        <td>{row.i}</td>
        <td>{row.u}</td>
        <td>{row.uPrim}</td>
        <td>{row.v}</td>
        <td>{row.vPrim}</td>
        <td>{row.a}</td>
        <td>{row.b}</td>
        <td>{row.q}</td>
        <td>{row.r}</td>
      </tr>
    );
  }

  allLegit () {
    const a = Number(this.state.a);
    const b = Number(this.state.b);

    return (!isNaN(a) && !isNaN(b)) && (a > 0 && b > 0)
  }

  calculateRows () {
    const firstInteger = Number(this.state.a);
    const secondInteger = Number(this.state.b);

    const i = 0;
    const a = Math.max(firstInteger, secondInteger);
    const b = Math.min(firstInteger, secondInteger);
    const q = Math.floor(a / b);
    const r = a % b;
    const v = 1;
    const vPrim = 0;
    const u = 0;
    const uPrim = 1;

    const firstRow = {
      i,
      a,
      b,
      q,
      r,
      v,
      vPrim,
      u,
      uPrim
    };

    return [firstRow];
  }
}

export default App;
