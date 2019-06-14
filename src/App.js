import React, { Component } from 'react';
import './App.css';
import _ from 'lodash'

class App extends Component {


  constructor(props, context) {
    super(props, context);
    this.state = {
      a: '3',
      b: '2',
      base: '12',
      power: '33',
      modulo: '67'
    }
  }

  render() {
    return (
      <div className={'container'}>
        <div className="app">
          {this.renderEuclid()}
          {this.renderModularMultiplication()}
        </div>
      </div>
    );
  }

  renderEuclid() {
    return (
      <div className="panel">
        <h1>Extended Euclid algorithm</h1>
        <div className={'inputs'}>
          <label>first integer</label>
          <input className={'input'} onChange={event => this.setState({ a: event.target.value })} value={this.state.a} />
          <label>second integer</label>
          <input className={'input'} onChange={event => this.setState({ b: event.target.value })} value={this.state.b} />
        </div>
        {this.renderEuclidTable()}
      </div>
    )
  }

  renderModularMultiplication() {
    return (
      <div className="panel">
        <h1>Modular exponentiation</h1>
        <div className={'inputs'}>
          <label>base</label>
          <input className={'input'} onChange={event => this.setState({ base: event.target.value })} value={this.state.base} />
          <label>power</label>
          <input className={'input'} onChange={event => this.setState({ power: event.target.value })} value={this.state.power} />
          <label>modulo</label>
          <input className={'input'} onChange={event => this.setState({ modulo: event.target.value })} value={this.state.modulo} />
        </div>
        {this.renderModularMultiplicationTable()}
      </div>
    )
  }

  renderModularMultiplicationTable() {
    const rows = this.calculateExponentiationRows();

    return (
      <table>
        <thead>
        <tr>
          <th>i</th>
          <th>xi</th>
          <th>ai</th>
          <th>ti</th>
        </tr>
        </thead>
        <tbody>
        {rows.map(row => this.renderExponentiationRow(row, row.i === rows.length - 1))}
        </tbody>
      </table>
    )
  }

  renderEuclidTable() {
    const rows = this.calculateEuclidRows();

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
        {rows.map(row => this.renderEuclidRow(row))}
        </tbody>
      </table>
    )
  }

  renderEuclidRow(row) {
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

  renderExponentiationRow(row, isLast) {
    return (
      <tr key={row.i}>
        <td>{!isLast && row.i}</td>
        <td className={isLast ? 'enhanced' : ''}>{row.x}</td>
        <td>{!isLast && row.a}</td>
        <td>{!isLast && row.t}</td>
      </tr>
    );
  }

  allLegit() {
    const a = Number(this.state.a);
    const b = Number(this.state.b);

    return (!isNaN(a) && !isNaN(b)) && (a > 0 && b > 0)
  }

  calculateEuclidRows() {
    const firstInteger = Number(this.state.a);
    const secondInteger = Number(this.state.b);

    const a = Math.max(firstInteger, secondInteger);
    const b = Math.min(firstInteger, secondInteger);

    const firstRow = {
      i: 0,
      a: a,
      b: b,
      q: Math.floor(a / b),
      r: a % b,
      v: 1,
      vPrim: 0,
      u: 0,
      uPrim: 1
    };

    const rows = [firstRow];

    while (_.last(rows).r > 0) {
      const previousRow = _.last(rows);


      const newA = previousRow.b;
      const newB = previousRow.r;
      const nextRow = {
        i: previousRow.i + 1,
        a: newA,
        b: newB,
        q: Math.floor(newA / newB),
        r: newA % newB,
        v: previousRow.vPrim - (previousRow.q * previousRow.v),
        vPrim: previousRow.v,
        u: previousRow.uPrim - (previousRow.q * previousRow.u),
        uPrim: previousRow.u
      };

      rows.push(nextRow);
    }

    return rows;
  }

  calculateExponentiationRows() {
    const base = Number(this.state.base);
    const power = Number(this.state.power);
    const modulo = Number(this.state.modulo);

    const lsbBinaryPower = this.decimalToBinary(power).reverse();

    const firstRow = {
      i: 0,
      x: 1,
      a: base,
      t: lsbBinaryPower[0],
    };

    const rows = [firstRow];

    for (let i = 0; i < lsbBinaryPower.length; i++) {
      const previousRow = _.last(rows);

      const newI = previousRow.i + 1;
      const newX = previousRow.t === 1 ? ((previousRow.x * previousRow.a) % modulo) : previousRow.x;
      const newA = (previousRow.a * previousRow.a) % modulo;
      const nextRow = {
        i: newI,
        x: newX,
        a: newA,
        t: lsbBinaryPower[newI],
      };

      rows.push(nextRow);
    }

    return rows;
  }

  decimalToBinary(dec) {
    const asString = (dec >>> 0).toString(2);
    const asBinary = [];

    for (let i = 0; i < asString.length; i++) {
      asBinary.push(Number(asString.charAt(i)))
    }
    return asBinary;
  }
}

export default App;
