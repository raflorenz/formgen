import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [carCategory, setCarCategory] = useState('');
  const [carModel, setCarModel] = useState('');

  return (
    <div className="app">
      <h1>Formgen</h1>
      <form>
        <input
          type="text"
          value={name}
          className="form-control"
          placeholder="Name"
          required
          onChange={e => setName(e.target.value)}
        />
        <input
          type="email"
          value={email}
          className="form-control"
          placeholder="E-mail"
          required
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="text"
          value={phone}
          className="form-control"
          placeholder="Phone"
          onChange={e => setPhone(e.target.value)}
        />
        <select
          value={carCategory}
          className="form-control"
          required
          onChange={e => setCarCategory(e.target.value)}
        >
          <option value="">Car Category</option>
          <option value="Small">Small</option>
          <option value="Premium">Premium</option>
          <option value="Van">Van</option>
        </select>
        <select
          value={carModel}
          className="form-control"
          required
          onChange={e => setCarModel(e.target.value)}
        >
          <option value="">Car Model</option>
          <option value="Opel Corsa">Opel Corsa</option>
          <option value="Toyota Yaris">Toyota Yaris</option>
          <option value="Smart for Two">Smart for Two</option>
          <option value="Audi S8">Audi S8</option>
          <option value="Jaguar XJR">Jaguar XJR</option>
          <option value="BMW 750iL">BMW 750iL</option>
          <option value="Volkswagen Touran">Volkswagen Touran</option>
          <option value="Renault Espace">Renault Espace</option>
          <option value="Fiat Talento">Fiat Talento</option>
        </select>
        <button className="form-control">Submit</button>
      </form>
      <div>
        <p>Name: {name}</p>
        <p>E-mail: {email}</p>
        <p>Phone: {phone}</p>
        <p>Car Category: {carCategory}</p>
        <p>Car Model: {carModel}</p>
      </div>
    </div>
  );
}

export default App;
