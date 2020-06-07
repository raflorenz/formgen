import React, { useState } from 'react';
import cars from './cars';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [models, setModels] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  const changeCategory = e => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);
    setModels(selectedCategory ? cars.find(car => car.category === selectedCategory).models : []);
  };

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
          value={selectedCategory}
          className="form-control"
          required
          onChange={changeCategory}
        >
          <option value="">Car Category</option>
          {cars.map(car => <option key={car.id} value={car.category}>{car.category}</option>)}
        </select>
        <select
          value={selectedModel}
          className="form-control"
          required
          onChange={e => setSelectedModel(e.target.value)}
        >
          <option value="">Car Model</option>
          {models.map(model => <option key={model} value={model}>{model}</option>)}
        </select>
        <button className="form-control">Submit</button>
      </form>
      <div>
        <p>Name: {name}</p>
        <p>E-mail: {email}</p>
        <p>Phone: {phone}</p>
        <p>Car Category: {selectedCategory}</p>
        <p>Car Model: {selectedModel}</p>
      </div>
    </div>
  );
}

export default App;
