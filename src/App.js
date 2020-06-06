import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1>Formgen</h1>
      <form>
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          required
        />
        <input
          type="email"
          className="form-control"
          placeholder="E-mail"
          required
        />
        <input
          type="text"
          className="form-control"
          placeholder="Phone"
        />
        <select
          className="form-control"
          required
        >
          <option>Car Category</option>
          <option value="small">Small</option>
          <option value="premium">Premium</option>
          <option value="van">Van</option>
        </select>
        <select
          className="form-control"
          required
        >
          <option>Car Model</option>
          <option value="opel-corsa">Opel Corsa</option>
          <option value="toyota-yaris">Toyota Yaris</option>
          <option value="smart-for-two">Smart for Two</option>
          <option value="audi-s8">Audi S8</option>
          <option value="jaguar-xjr">Jaguar XJR</option>
          <option value="bmw-750il">BMW 750iL</option>
          <option value="volkswagen-touran">Volkswagen Touran</option>
          <option value="renault-espace">Renault Espace</option>
          <option value="fiat-talento">Fiat Talento</option>
        </select>
        <button className="form-control">Submit</button>
      </form>
    </div>
  );
}

export default App;
